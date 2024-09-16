import { Link } from 'react-router-dom'
const Navbar = () => {
	return (
		<header>
			<div>
				<Link to="/">
					home
				</Link>
			</div>
		</header>
	)
}

export default Navbar;