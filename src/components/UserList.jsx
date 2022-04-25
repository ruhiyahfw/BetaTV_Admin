import { useEffect, useState } from 'react';
import Trash from './svg-icons/trash';
import { toast } from 'react-toastify';
import Loading from './svg-icons/loading';


const UserList = () => {
	const [users, setUsers] = useState(null);

	const deleteUser = async (user, idx) => {
		const ok = window.confirm('Anda yakin akan menghapus akun ' + user.name);
    if (!ok){
      return;
    }
    
    const temp = [...users];
    temp[idx].loading = true;
    setUsers(temp);
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        }
      }
    )
    .then(result => result.json())
    .then(result => {
      if (result.success){
        toast.success("Akun berhasil dihapus");
        setUsers(prev => {
          if (prev != null){
            return prev.filter(usr => usr.id != user.id);
          }
        })
      }
      else{
        toast.error("Gagal menghapus akun");
        const temp = [...users];
        temp[idx].loading = false;
        setUsers(temp); 
      }
    })
    .catch(err => {
      toast.error("Something wrong!");
      const temp = [...users];
      temp[idx].loading = false;
      setUsers(temp); 
    })
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
				console.log(err)
			});
	};

	useEffect(() => {
		getAllUser();
	}, []);

	if (users == null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    	<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-white uppercase bg-buletinBlue text-center">
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
					{users.map((user, idx) => (
						<tr key={user.id} className="bg-white border-b hover:bg-buletinLightGray text-center text-black">
              <td className="px-2 py-4">{idx+1}</td>
							<td className="px-6 py-4">{user.username}</td>
							<td className="px-6 py-4">{user.name}</td>
							<td className="px-6 py-4">{user.email}</td>
							<td className="px-6 py-4">{user.isConfirmed ? 'True' : 'False'}</td>
							<td className="px-6 py-4 flex justify-center">
								<button disabled={user.loading} onClick={() => deleteUser(user, idx)}>
                  {
                    user.loading? 
                    <Loading className="fill-orange-400" /> : 
                    <Trash className="fill-buletinBlue" />
                  }
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
