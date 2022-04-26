import React, { useState } from 'react';
import Logout from './logout';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const [showLogout, setShowLogout] = useState(false);
	const [user, setUser] = useState(null);

	const meQuery = async () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/admin/me`, {
			headers: {
				Authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					setUser(result.data.user);
					return;
				}
				window.sessionStorage.removeItem('token');
				navigate('/admin');
			})
			.catch((err) => {
				window.sessionStorage.removeItem('token');
				navigate('/admin');
			});
	};
	useEffect(() => {
		meQuery();
	}, []);

	return (
		<div className="h-20 w-full px-12 bg-buletinBlue flex justify-between items-center">
      <Link to={'/admin/user'}>
			  <h1 className="text-white font-semibold text-4xl">Beta.TV</h1>
      </Link>
			<div className="w-[500px] flex justify-between items-center">
				<Link to="/admin/user">
					<span className="text-white font-medium text-2xl">User</span>
				</Link>
				<Link to="/admin/video">
					<span className="text-white font-medium text-2xl">Video</span>
				</Link>
				<Link to="/admin/kategori">
					<span className="text-white font-medium text-2xl">Kategori</span>
				</Link>
				<button
					onClick={() => {
						setShowLogout(true);
					}}
					className="flex flex-col items-center"
				>
					{user && <span className="text-orange-400 font-medium text-xl">{user.username}</span>}
					<span className="text-white font-medium text-sm">Logout</span>
				</button>
			</div>
			<Logout isShow={showLogout} onClick={() => setShowLogout(false)} />
		</div>
	);
}
export default Navbar;
