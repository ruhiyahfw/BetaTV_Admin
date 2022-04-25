import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllUser from '../components/allUser';
import DeleteUser from '../components/deleteUser';
import Navbar from '../components/navbar';
import UserList from '../components/UserList';

function UserPanel() {
	return (
		<div>
			<div className="w-full px-12 mt-8 mb-6 flex flex-col">
				<h1 className="mb-6 text-4xl text-buletinDarkBlue font-medium"> Users </h1>
				<UserList />
			</div>
		</div>
	);
}

export default UserPanel;
