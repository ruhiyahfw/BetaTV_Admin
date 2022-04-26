import { useEffect, useState } from 'react';
import Trash from './svg-icons/trash';
import { toast } from 'react-toastify';
import Loading from './svg-icons/loading';
import Pen from './svg-icons/pen';
import EditVideoPopup from './EditVideoPopup';
import AddVideoPopUp from './AddVideoPopup';

const UserList = () => {
	const [videos, setVideos] = useState(null);
	const [itemCount, setItemCount] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [videoDisplay, setVideoDisplay] = useState(null);
	const [idEditVideo, setIdEditVideo] = useState(2);
	const [showEditvideo, setShowEditVideo] = useState(false);
	const [showAddvideo, setShowAddVideo] = useState(false);

 	const deleteVideo = async (video, idx) => {
		const ok = window.confirm('Anda yakin akan menghapus video "' + video.title + '"');
		if (!ok) {
			return;
		}

		const temp = [...videoDisplay];
		temp[idx].loading = true;
		setVideoDisplay(temp);
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/Video/${video.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					toast.success('Video berhasil dihapus');
					setVideos((prev) => {
						if (prev !== null) {
							return prev.filter((vid) => vid.id !== video.id);
						}
					});
				} else {
					toast.error('Gagal menghapus video');
					const temp = [...videoDisplay];
					temp[idx].loading = true;
					setVideoDisplay(temp);
				}
			})
			.catch((err) => {
				toast.error('Something wrong!');
				const temp = [...videoDisplay];
				temp[idx].loading = true;
				setVideoDisplay(temp);
			});
	}; 

	const getAllvideo = async () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/Video/`, {
			headers: {
				Authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.success) {
					setVideos(result.data.videos);
					return;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getCategoryVideo = (video) => {
		let categories = [];

		if(video.categories.length > 0) {
			video.categories.map(category => categories.push(category.label));
			return categories.join(", ");
		} else return "";
	};

	useEffect(() => {
		getAllvideo();
	}, []);

	useEffect(() => {
		// Update video to display to admin
		const idxStart = itemCount * (pageNumber - 1);

		setVideoDisplay(videos ? videos.slice(idxStart, idxStart + itemCount) : null);
	}, [videos, itemCount, pageNumber]);

	const updatePageNumber = (delta) => {
		let temp = pageNumber + delta;
		if (temp < 1) {
			temp = 1;
		}

		if (temp > Math.ceil(videos.length / itemCount)) {
			temp = Math.ceil(videos.length / itemCount);
		}
		setPageNumber(temp);
	};

	const handleCountOptions = (count) => {
		setItemCount(parseInt(count));
		setPageNumber(1);
	};

	if (videoDisplay == null) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='pb-10'>
			<EditVideoPopup idvideo={idEditVideo} isShow={showEditvideo} onClick={() => setShowEditVideo(false)}/>
			<AddVideoPopUp isShow={showAddvideo} onClick={() => setShowAddVideo(false)}/>
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
						<p>item dari total {videos.length}</p>
					</div>
					<div className="flex gap-6">
						<p>
							Halaman {pageNumber} dari {Math.ceil(videos.length / itemCount)}
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
			<div className="relative mb-4 px-8 pt-4 pb-8 overflow-x-auto shadow-md sm:rounded-lg bg-buletinLightGray">
				<table className="w-full text-sm text-left text-black table-fixed">
					<thead className="text-xs border-b-2 border-black uppercase text-center">
						<tr>
							<th scope="col" className="w-10">
								No
							</th>
							<th scope="col" className="w-2/12">
								ID Youtube Video 
							</th>
							<th scope="col" className="w-auto">
								Judul
							</th>
							<th scope="col" className="w-1/4">
								Kategori
							</th>
							<th scope="col" className="w-1/12">
								URL
							</th>
							<th scope="col" className="w-1/12">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
 						{videoDisplay.map((video, idx) => (
								<tr key={video.id} className="border-b border-gray-400 hover:bg-gray-300 text-center text-black">
									<td>{idx + 1}</td>
									<td>{video.youtubeVideoId}</td>
									<td className='truncate text-left'>{video.title}</td>
									<td className='truncate'> { getCategoryVideo(video)} </td>
									<td className='underline text-violet-500'><a href={video.url} target="_blank"> lihat video</a></td>
									<td className="flex justify-center space-x-3 py-3">
										<button 
											disabled={video.loading} 
											onClick={() => {
												setShowEditVideo(true);
												setIdEditVideo(video.id);
											}}
										>
											{video.loading ? <Loading className="fill-orange-400" /> : <Pen className="fill-buletinBlue" />}
										</button>
										<button disabled={video.loading} onClick={() => deleteVideo(video, idx)}>
											{video.loading ? <Loading className="fill-orange-400" /> : <Trash className="fill-buletinBlue" />}
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<button 
				className='h-8 w-48 rounded-xl shadow-md bg-buletinBlue text-white font-medium'
				onClick={() => setShowAddVideo(true)}
			>
				+ Tambah video
			</button>
		</div>
	);
};

export default UserList;
