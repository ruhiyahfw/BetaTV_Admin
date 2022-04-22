import DownloadInfo from "../components/download-info";

export default function HomePage() {
    const phoneImg = require("../assets/img/phone-app.png");

	return (
        <div className="bg-gradient-to-b from-indigo-500 h-screen w-full flex justify-center">
            <div className="w-4/6 flex justify-center" >
                <div className="w-3/5 flex justify-center items-center flex-col">
                    <h1 className="text-6xl mb-5">Selamat datang di Beta.TV</h1>
                    <h1 className="text-2xl mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur culpa libero ex neque incidunt, autem ea distinctio vero iste, aperiam quo omnis ullam dolorum impedit qui! Quo qui dicta hic.</h1>
                    <DownloadInfo />
                </div>
                <div className="w-3/4 flex justify-center items-center">
                    <img className="h-[700px]" src={phoneImg} alt="App" />
                </div>
            </div>
        </div>
	);
}
