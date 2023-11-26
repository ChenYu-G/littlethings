import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SigninValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const SigninForm = () => {
	const navigate = useNavigate()
	const { toast } = useToast()
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccountMutation()

	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof SigninValidation>) {
		try {
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
					src='/public/assets/images/logo_transparent.png'
					alt='logo'
					className='invert-white'
					width={300}
				/>
				<h2 className='h3-bold md:h2-bold pt-4 sm:pt-6'>
					Log in to your account
				</h2>
				<p className='text-light-3 small-medium md:base-regular mt-2 mb-2'>
					Welcome to Lithings, please enter your detail{' '}
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full mt-4'
				>
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
						{isUserLoading ? (
							<div className='flex-center gap-2'>
								<Loader /> Loading...
							</div>
						) : (
							'Sign in '
						)}
					</Button>
					<p className='text-small-regular text-light-2 text-center mt-2'>
						Don't have an account?
						<Link
							to={'/sign-up'}
							className='text-primary-500 text-small-semibold ml-1'
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	)
}

export default SigninForm
