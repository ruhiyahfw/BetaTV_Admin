import { useEffect, useState } from 'react';
import Trash from './svg-icons/trash';
import { toast } from 'react-toastify';
import Loading from './svg-icons/loading';

const UserList = () => {
	const [users, setUsers] = useState(null);
	const [itemCount, setItemCount] = useState(5);
	const [pageNumber, setPageNumber] = useState(1);
	const [userDisplay, setUserDisplay] = useState(null);

	const deleteUser = async (user, idx) => {
		const ok = window.confirm('Anda yakin akan menghapus akun ' + user.name);
		if (!ok) {
			return;
		}

		const temp = [...userDisplay];
		temp[idx].loading = true;
		setUserDisplay(temp);
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					toast.success('Akun berhasil dihapus');
					setUsers((prev) => {
						if (prev != null) {
							return prev.filter((usr) => usr.id != user.id);
						}
					});
				} else {
					toast.error('Gagal menghapus akun');
					const temp = [...userDisplay];
					temp[idx].loading = true;
					setUserDisplay(temp);
				}
			})
			.catch((err) => {
				toast.error('Something wrong!');
				const temp = [...userDisplay];
				temp[idx].loading = true;
				setUserDisplay(temp);
			});
	};

	const getAllUser = async () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/`, {
			headers: {
				Authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					setUsers(result.data.users);
					return;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getAllUser();
	}, []);

	useEffect(() => {
		// Update user to display to admin
		const idxStart = itemCount * (pageNumber - 1);

		setUserDisplay(users ? users.slice(idxStart, idxStart + itemCount) : null);
	}, [users, itemCount, pageNumber]);

	const updatePageNumber = (delta) => {
		let temp = pageNumber + delta;
		if (temp < 1) {
			temp = 1;
		}

		if (temp > Math.ceil(users.length / itemCount)) {
			temp = Math.ceil(users.length / itemCount);
		}
		setPageNumber(temp);
	};

	const handleCountOptions = (count) => {
		setItemCount(parseInt(count));
		setPageNumber(1);
	};

	if (userDisplay == null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<div className="px-4 py-1 mb-4 flex justify-between shadow-md bg-buletinLightGray sm:rounded-lg text-black items-center">
				<div className="flex gap-2">
					<p>Tampilkan</p>
					<select onChange={(e) => handleCountOptions(e.target.value)} name="itemCountOptions" id="itemCountOptions">
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="40">40</option>
						<option value="75">75</option>
						<option value="100">100</option>
					</select>
					<p>item dari total {users.length}</p>
				</div>
				<div className="flex gap-6">
					<p>
						Halaman {pageNumber} dari {Math.ceil(users.length / itemCount)}
					</p>
					<button className="font-bold" onClick={() => updatePageNumber(-1)}>
						{'<'}
					</button>
					<button className="font-bold" onClick={() => updatePageNumber(1)}>
						{'>'}
					</button>
				</div>
			</div>
			<div className="relative px-8 pt-4 pb-8 overflow-x-auto shadow-md sm:rounded-lg bg-buletinLightGray">
				<table className="w-full text-sm text-left text-black">
					<thead className="text-xs border-b-2 border-black uppercase text-center">
						<tr>
							<th scope="col" className="px-2 py-3">
								No
							</th>
							<th scope="col" className="px-6 py-3">
								Username
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							<th scope="col" className="px-6 py-3">
								Confirmed
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{userDisplay.map((user, idx) => (
							<tr key={user.id} className="border-b border-gray-400 hover:bg-buletinLightGray text-center text-black">
								<td className="px-2 py-4">{idx + 1}</td>
								<td className="px-6 py-4">{user.username}</td>
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.email}</td>
								<td className="px-6 py-4">{user.isConfirmed ? 'True' : 'False'}</td>
								<td className="px-6 py-4 flex justify-center">
									<button disabled={user.loading} onClick={() => deleteUser(user, idx)}>
										{user.loading ? <Loading className="fill-orange-400" /> : <Trash className="fill-buletinBlue" />}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserList;
