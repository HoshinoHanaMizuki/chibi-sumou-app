"use client";
import Image from "next/image";
import NavBar from "../features/common/Navbar/Navbar";
import { useRef,useEffect,useState } from "react";
export default function ArPhoto() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentGirlImage,setCurrentGirlImage] = useState<string | null>(null);
    const [currentBroImage,setCurrentBroImage] = useState<string | null>(null);
    const [currentSisImage,setCurrentSisImage] = useState<string | null>(null);
    const [currentGodImage,setCurrentGodImage] = useState<string | null>(null);
    const [deviceSize,setDeviceSize] = useState<{width:number,height:number}>({width:0,height:0});
    // キャラクター画像のリスト
    const girlImageList : string[] = [
        "/images/girl/normal.png",
        "/images/girl/normalWithOp.png",
        "/images/girl/puku.png",
        "/images/girl/winkWithOp.png",
        "/images/girl/winkWithCl.png"
    ];
    const brotherBirdImageList : string[] = [
        "/images/brotherBird/normal.png",
        "/images/brotherBird/cool.png",
        "/images/brotherBird/shiny.png"
    ];
    const sisterBirdImageList : string[] = [
        "/images/sisterBird/open.png",
        "/images/sisterBird/close.png",
        "/images/sisterBird/shock.png",
        "/images/sisterBird/smile.png"
    ];
    const battleGodImageList : string[] = [
        "/images/battleGod/normal.PNG",
        "/images/battleGod/normalOura.PNG",
        "/images/battleGod/normalFull.PNG",
        "/images/battleGod/normalRock.PNG",
        "/images/battleGod/smile.PNG",
        "/images/battleGod/smileOura.PNG",
        "/images/battleGod/smileFull.PNG",
        "/images/battleGod/smileRock.PNG",
    ];

    useEffect(()=>{
        setDeviceSize({width:window.innerWidth,height:window.innerHeight});
        if(!canvasRef.current) {
            throw new Error("canvasRef is not defined");
        }
        if(!videoRef.current) {
            throw new Error("videoRef is not defined");
        }

        // スマホのカメラを起動する関数
        const startCamera = async () => {
            try {
                // カメラを起動してこれをcanvasに描画するため取得
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: {exact:"environment" }}
                 });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        }
        startCamera();

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("context is not defined");
        }

        const drawFrame = () => {
            if (videoRef.current) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(drawFrame);
        };

        drawFrame();

    },[]);
    const setCharaImage = (charaImageLink: string,setImageLink:any) => {
        setImageLink(charaImageLink);
    }

    const handleCapture = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                alert(`撮影された画像のデータURL: ${dataUrl}`);
            }
        }
    };
    // 開かれた瞬間にカメラを起動。　カメラの映像はcanvasに描画される　常に更新。　
    // canvas内にはキャラクター画像も配置。　撮影ボタンでスクリーンショットを撮り保存。
    return (
        <>
            <div className="allContainer relative">
                <NavBar />
                {/* スマホの縦、横サイズのキャンバスを作成 */}
                <video ref={videoRef} autoPlay={true} playsInline={true} muted={true} style={{ display: "none" }} />
                <canvas ref={canvasRef} width={deviceSize.width} height={deviceSize.height} />
                <div className="editingMenu fixed bottom-0 left-0 right-0 p-4 flex flex-row justify-center space-x-4">
                    {/* キャラクター設定UIをここに追加 */}
                    <div className="charactorSettingUI">
                        {brotherBirdImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} onClick={()=>setCharaImage(image,setCurrentBroImage)} />
                        ))}
                        {sisterBirdImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} onClick={()=>setCharaImage(image,setCurrentSisImage)} />
                        ))}
                        {girlImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} onClick={()=>setCharaImage(image,setCurrentGirlImage)} />
                        ))}
                        {battleGodImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} onClick={()=>setCharaImage(image,setCurrentGodImage)} />
                        ))}
                    </div>
                    キャラクター設定UI
                    <button onClick={handleCapture} className="px-4 py-2 bg-blue-500 text-white rounded">
                        撮影
                    </button>
                </div>
            </div>
        </>
    );
}