import { FaSignInAlt, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
function Header({ user }) {
	console.log("----------------------From Header user props : ", user);
	return (
		<header className="header">
			<div className="logo">
				<a href="/"> GoalSetter</a>
			</div>

			<ul>
				{user ? (
					<>
						{" "}
						<li>
							<a href="/logout">
								<BiLogOut /> Logout
							</a>
						</li>
						<li>
							<a href="/profile">
								<img src={user.avatar} />,,,, {user.name}
							</a>
						</li>
					</>
				) : (
					<>
						{" "}
						<li>
							<a href="/login">
								<FaSignInAlt /> Login
							</a>
						</li>
						<li>
							<a href="/register">
								<FaUser /> Register
							</a>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;
