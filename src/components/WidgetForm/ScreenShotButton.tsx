import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import Loading from "./Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
} 

export default function ScreenshotButton({screenshot,
     onScreenshotTook}:ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

   async function handleTakeScreenShot() {
        setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!); //tira um print
    const base64image = canvas.toDataURL('image/png');  // converte print pra png no formato base64 que é em formato de texto e representa uma imagem

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
    }

    if(screenshot) {
        return(
        <button
            type="button"
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => onScreenshotTook(null)}
            style={{
            backgroundImage: `url(${screenshot})`,
            backgroundPosition: 'right bottom',
            backgroundSize: 180,
        }} //exibe imagem do print no botão 
        >
                <Trash weight="fill"/>
        </button>
        )
    }

    return (
        <button
        type="button"
        onClick={handleTakeScreenShot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offfset-zinc-900 focus:ring-brand-500"
        >
            { isTakingScreenshot ? <Loading/>: <Camera className="w-6 h-6"/> }
        </button>
    )
}

