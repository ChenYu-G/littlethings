import { bottombarLinks } from '@/constants'
import { useLocation, Link } from 'react-router-dom'

const Bottombar = () => {
	const { pathname } = useLocation()
	return (
		<section className='bottom-bar'>
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route
				return (
					<Link
						to={link.route}
						key={link.label}
						className={`${
							isActive && 'bg-primary-500 rounded-[10px]'
						} flex-center flex-col gap-1 p-2 transition`}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							width={26}
							height={26}
							className={`group-hover:invert-white  ${
								isActive && 'invert-white'
							}`}
						/>
						<p
							className={`small-regular text-dark-1  ${
								isActive && 'text-white'
							}`}
						>
							{link.label}
						</p>
					</Link>
				)
			})}
		</section>
	)
}

export default Bottombar
