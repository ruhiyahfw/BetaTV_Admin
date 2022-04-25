import { useEffect, useState } from 'react';
import Trash from './svg-icons/trash';
import { toast } from 'react-toastify';
import Loading from './svg-icons/loading';

const UserList = () => {
	const [users, setUsers] = useState(null);
	const [itemCount, setItemCount] = useState(10);
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
						if (prev !== null) {
							return prev.filter((usr) => usr.id !== user.id);
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
		<div className='pb-10'>
			<div className="mb-4 flex justify-between shadow-md bg-buletinLightGray sm:rounded-lg text-black">
				<div className="px-4 py-1 w-full items-center flex justify-between">
					<div className="flex gap-2">
						<p>Tampilkan</p>
						<select onChange={(e) => handleCountOptions(e.target.value)} name="itemCountOptions" id="itemCountOptions" value={itemCount}>
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
					</div>
				</div>
				<div className="flex shadow-md rounded-lg">
					<button className="active:bg-buletinDarkBlue text-white border-r-[1px] font-bold bg-buletinBlue w-[50px] rounded-tl-lg rounded-bl-lg" onClick={() => updatePageNumber(-1)}>
						{'<'}
					</button>
					<button className="active:bg-buletinDarkBlue text-white font-bold bg-buletinBlue w-[50px] rounded-tr-lg rounded-br-lg" onClick={() => updatePageNumber(1)}>
						{'>'}
					</button>
				</div>
			</div>
			<div className="relative px-8 pt-4 pb-8 overflow-x-auto shadow-md sm:rounded-lg bg-buletinLightGray">
				<table className="w-full text-sm text-left text-black table-fixed">
					<thead className="text-xs border-b-2 border-black uppercase text-center">
						<tr>
							<th scope="col" className="w-10">
								No
							</th>
							<th scope="col" className="w-2/12">
								Username
							</th>
							<th scope="col" className="w-auto">
								Name
							</th>
							<th scope="col" className="w-1/4">
								Email
							</th>
							<th scope="col" className="w-1/12">
								Confirmed
							</th>
							<th scope="col" className="w-1/12">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{userDisplay.map((user, idx) => (
							<tr key={user.id} className="border-b border-gray-400 hover:bg-gray-300 text-center text-black">
								<td>{idx + 1}</td>
								<td>{user.username}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.isConfirmed ? 'True' : 'False'}</td>
								<td className="flex justify-center py-3">
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
