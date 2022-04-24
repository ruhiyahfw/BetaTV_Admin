import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

	async function clickLogin(e) {
		e.preventDefault();

		const loginData = {
			username: username,
			password: password
		}

		try {
			const login = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/admin/login`, loginData);
			if(login.data.data.user.level === 0) {
				window.sessionStorage.setItem('token', login.data.data.token);
			} else {
				throw "not an admin";
			}
			navigate('/admin/user');
		} catch (error) {
			console.error(error)
		} 
		setusername('');
		setpassword('');  
	}

	return (
    <div className="w-screen h-full flex">
      <div className="w-1/2 h-screen py-24 bg-buletinBlue flex flex-col items-center justify-between">
				<img
					className="w-80 h-80 object-contain"
					src={require("../icons/login_logo.png")}
				/>
        <div className="flex flex-col items-center justify-around">
          <h1 className="text-9xl text-white font-medium mb-7">Beta.TV</h1>
          <span className="text-6xl text-white font-medium">Admin</span>
        </div>
      </div>	
      <form className="w-1/2 h-screen py-24 bg-white flex flex-col items-center justify-between">
				<h1 className="text-7xl font-semibold text-buletinDarkBlue"> Login </h1>
				<div className="h-80 flex flex-col items-center justify-around">
					<div className="w-[680px]">
						<span className="text-4xl text-black"> Username </span>
						<input
							type="text"
							id="username-input"
							className="w-full h-16 px-4 border-2 border-buletinBlue rounded-3xl text-3xl"
							placeholder=""
							value={username}
							onChange={(e) => setusername(e.target.value)}
						/>
					</div>
					<div className="w-[680px]">
						<span className="text-4xl text-black"> Password </span>
						<input
							type="password"
							id="password-input"
							className="w-full h-16 px-4 border-2 border-buletinBlue rounded-3xl text-3xl"
							placeholder=""
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
					</div>
				</div>
				<button 
					className="w-60 h-16 text-white text-3xl font-medium rounded-full bg-buletinDarkBlue"
					onClick={e => clickLogin(e)}
				> 
					Login 
				</button>
			</form>
    </div>
  );
}

export default Login;
