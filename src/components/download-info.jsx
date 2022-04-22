export default function DownloadInfo(){

    const playImg = require('../assets/img/google-play.png');
    const appStoreImg = require('../assets/img/app-store.png');

    return (
        <div className="flex justify-center flex-col items-center">
            <p className="text-2xl font-medium mb-3">Downlod sekarang</p>
            <div className="flex gap-5">
                <a href="https://play.google.com/store">
                    <img className="h-[45px]" src={playImg} alt="Google Play Store Logo" />
                </a>
                <a href="https://www.apple.com/id/app-store/">
                    <img className="h-[45px]" src={appStoreImg} alt="App Store Logo" />
                </a>
            </div>
        </div>
    );
}