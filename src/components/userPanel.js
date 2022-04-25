import React from 'react';
import UserList from './UserList'

function UserPanel({me}) {
	return (
		<div>
			<div className="w-full px-12 mt-8 mb-6 flex flex-col">
				<h1 className="mb-6 text-4xl text-buletinDarkBlue font-medium"> Users </h1>
				<UserList me={me} />
			</div>
		</div>
	);
}

export default UserPanel;
