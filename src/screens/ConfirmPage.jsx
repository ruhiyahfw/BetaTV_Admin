import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DownloadInfo from '../components/download-info';

export default function ConfirmPage() {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	const token = params.token;

	const sendToken = async () => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/confirm/` + token, { method: 'POST' })
			.then((result) => result.json())
			.then((result) => {
				setLoading(false);
				if (result.success) {
					setSuccess(true);
				} else {
					setSuccess(false);
				}
			})
			.catch(() => {
				setSuccess(false);
			});
	};

	const handleTryAgainButton = () => {
		sendToken();
	};

	useEffect(() => {
		sendToken();
	}, []);

	if (loading) {
		return (
			<div className="w-full gap-6 flex justify-center mt-20 flex-col items-center">
				<h1 className="text-center text-4xl font-semibold text-orange-400">Mohon tunggu sebentar...</h1>
			</div>
		);
	}

	if (success) {
		return (
			<div className="w-full gap-6 flex justify-center mt-20 flex-col items-center">
				<h1 className="text-center text-4xl font-semibold text-green-600">Selamat! Akun anda berhasil diaktifkan.</h1>
				<h1 className="text-center text-2xl font-semibold mb-60">Silahkan login melalui aplikasi Beta.TV</h1>
                <DownloadInfo />
			</div>
		);
	}

	return (
		<div className="w-full gap-6 flex justify-center mt-20 flex-col items-center">
			<h1 className="text-center text-4xl font-semibold text-red-400">Terjadi kesalahan, Aktivasi akun gagal.</h1>
			<button onClick={handleTryAgainButton} className="btn w-[200px] bg-green-400 border-none shadow-xl hover:bg-green-600 text-lg mt-10 text-black">
				Coba Lagi
			</button>
		</div>
	);
}
