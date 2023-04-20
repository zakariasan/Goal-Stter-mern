import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillIdcard } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Login({user, setUser}) {
	const [users, setUsers] = useState("");
	const [login, setLogin] = useState({ name: "", password: "" });

  const history = useNavigate();
	const logIN = (event) => {
		event.preventDefault();
		axios
			.post("/api/login", {
				...login,
			})
			.then((res) => { 
				setUser(res.data)
				console.log('login res ---> her ')
				console.log(res.data)
				history('/');

				//setUser(!user)
			})
			.catch((err) => console.log(err));

		console.log("log in front -- back");
	};

	useEffect(() => {
		axios
			.get("/api/user")
			.then((res) => {
				console.log(res);
				setUsers(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	const ElemUsers = users
		? users.map((a) => {
				return (
					<li key={a._id}  >
						<div >
						<img src={a.avatar} alt={a.name} />
						<span> {a.name} </span>
						 </div>
						 <div>{a.createdAt?a.createdAt.split('T')[0]:''}</div>
					</li>
				);
		  })
		: "tok";
	return (
		<>
			<h1>
				<AiFillIdcard /> Login
			</h1>
			<section className="form">
				<form onSubmit={logIN}>
					<div className="form-group">
						<label htmlFor="userName">UserName</label>
						<input
							required
							placeholder="email or user name"
							type="text"
							name="name"
							value={login.name}
							onChange={(e) =>
								setLogin((val) => ({
									...val,
									[e.target.name]: e.target.value,
								}))
							}
						/>

						<label htmlFor="password">Password</label>

						<input
							type="password"
							name="password"
							placeholder="Password"
							className="password"
							required
							onChange={(e) =>
								setLogin((val) => ({
									...val,
									[e.target.name]: e.target.value,
								}))
							}
						/>
					</div>

					<div className="form-group">
						<button className="btn btn-block" type="submit">
							Login
						</button>
					</div>
				</form>
			</section>
			<section>
				<h1>Users List : Welcome ,Back all users : </h1>
				
				<ul  className="users" >
					<li><span>User Name</span> <span>Period</span></li>
					{ElemUsers}</ul>
			</section>
		</>
	);
}
export default Login;
