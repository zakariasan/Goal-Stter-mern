import React, { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
function Register() {
	const [register, setRegister] = useState({ name: "", password: "" });

  const history = useNavigate();
	const reg = (e) => {
		e.preventDefault();
		axios
			.post("/api/register", {
				...register,
			})
			.then((res) =>{ 
				history('/')
				console.log(res)
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>
				<IoPersonAddOutline /> Register
			</h1>
			<section className="form">
				<form onSubmit={reg}>
					<div className="form-group">
						<label htmlFor="userName">UserName</label>
						<input
							required
							placeholder="UserName"
							type="text"
							name="name"
							value={register.name}
							onChange={(e) =>
								setRegister((val) => ({
									...val,
									[e.target.name]: e.target.value,
								}))
							}
						/>

						<label htmlFor="password">Password</label>

						<input
							type="password"
							name="password"
							value={register.password}
							placeholder="Password"
							className="password"
							required
							onChange={(e) =>
								setRegister((val) => ({
									...val,
									[e.target.name]: e.target.value,
								}))
							}
						/>
					</div>

					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
}
export default Register;
