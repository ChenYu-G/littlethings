import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignupValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import {
	useCreateUserAccountMutation,
	useSignInAccountMutation,
} from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const SignupForm = () => {
	const navigate = useNavigate()
	const { toast } = useToast()
	const { checkAuthUser } = useUserContext()
	const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
		useCreateUserAccountMutation()
	const { mutateAsync: signInAccount } = useSignInAccountMutation()

	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		try {
			const newUser = await createUserAccount(values)
			if (!newUser) {
				toast({
					title: 'Sign up failed, please try again ',
				})
				return
			}
			const session = await signInAccount({
				email: values.email,
				password: values.password,
			})
			if (!session) {
				toast({ title: 'Sign in failed, please try again' })
				navigate('/sign-in')
				return
			}
			const isLoggedIn = await checkAuthUser()
			if (isLoggedIn) {
				form.reset()
				navigate('/')
			} else {
				toast({ title: 'Sign up failed, please try again.' })
			}
			return
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col mb-16'>
				<img
					src='/assets/images/logo2.png'
					alt='logo'
					className='invert-white'
					width={300}
				/>
				<h2 className='h3-bold md:h2-bold pt-4 sm:pt-6'>
					Create a new account
				</h2>
				<p className='text-light-3 small-medium md:base-regular mt-2 mb:2'>
					To use Lithings, please enter your details
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full mt-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type='text' className='shad-input' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type='text' className='shad-input' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										className='shad-input'
										placeholder='abc@example.com'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' className='shad-input' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='shad-button_primary' type='submit'>
						{isCreatingUser ? (
							<div className='flex-center gap-2'>
								<Loader /> Loading...
							</div>
						) : (
							'Sign up'
						)}
					</Button>
					<p className='text-small-regular text-light-2 text-center mt-2'>
						Already have an account?
						<Link
							to={'/sign-in'}
							className='text-primary-500 text-small-semibold ml-1'
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	)
}

export default SignupForm
