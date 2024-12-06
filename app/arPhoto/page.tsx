"use client";
import Image from "next/image";
import NavBar from "../features/common/Navbar/Navbar";
import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
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
        "/images/charactors/girl/normal.png",
        "/images/charactors/girl/normalWithOp.png",
        "/images/charactors/girl/puku.png",
        "/images/charactors/girl/winkWithOp.png",
        "/images/charactors/girl/winkWithCl.png"
    ];
    const brotherBirdImageList : string[] = [
        "/images/charactors/brotherBird/normal.png",
        "/images/charactors/brotherBird/cool.png",
        "/images/charactors/brotherBird/shiny.png"
    ];
    const sisterBirdImageList : string[] = [
        "/images/charactors/sisterBird/open.png",
        "/images/charactors/sisterBird/close.png",
        "/images/charactors/sisterBird/shock.png",
        "/images/charactors/sisterBird/smile.png"
    ];
    const battleGodImageList : string[] = [
        "/images/charactors/battleGod/normal.PNG",
        "/images/charactors/battleGod/normalOura.PNG",
        "/images/charactors/battleGod/normalFull.PNG",
        "/images/charactors/battleGod/normalRock.PNG",
        "/images/charactors/battleGod/smile.PNG",
        "/images/charactors/battleGod/smileOura.PNG",
        "/images/charactors/battleGod/smileFull.PNG",
        "/images/charactors/battleGod/smileRock.PNG",
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
                    video: { facingMode: "environment" ,width:deviceSize.width,height:deviceSize.height} // 外カメラを指定
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                // エラーハンドリング: 外カメラが利用できない場合、内カメラを使用
                if ((err as Error).name === "OverconstrainedError") {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: { facingMode: "user" } // 内カメラを指定
                        });
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                    } catch (innerErr) {
                        console.error("Error accessing camera: ", innerErr);
                    }
                }
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
    const setCharaImage = (charaImageLink: string,setImageLink:Dispatch<SetStateAction<string | null>>) => {
        setImageLink(charaImageLink);
    }

    const handleCapture = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                // カメラ映像をキャンバスに描画
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
                // 各キャラクター画像を描画
                const drawCharacter = (imageSrc: string | null, x: number, y: number, width: number, height: number) => {
                    if (!imageSrc) return;
    
                    const img = new window.Image();
                    img.src = `../../public${imageSrc}`;
                    img.onload = () => {
                        context.drawImage(img, x, y, width, height);
                    };
                };
    
                const characterSize = 100; // キャラクター画像のサイズ
                const centerX = canvas.width / 2 - characterSize / 2;
                const centerY = canvas.height / 2 - characterSize / 2;
    
                // 各キャラクターをキャンバスに描画
                drawCharacter(currentBroImage, centerX - 150, centerY, characterSize, characterSize);
                drawCharacter(currentSisImage, centerX + 150, centerY, characterSize, characterSize);
                drawCharacter(currentGirlImage, centerX, centerY - 150, characterSize, characterSize);
                drawCharacter(currentGodImage, centerX, centerY + 150, characterSize, characterSize);
    
                // 最後にキャンバスを画像として保存
                const dataUrl = canvas.toDataURL("image/png");
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
                <div className="editingMenu fixed bottom-0 left-0 right-0 p-4 flex flex-col justify-center space-x-4">
                    {/* キャラクター設定UIをここに追加 */}
                    <div className="charactorSettingUI flex">
                        {brotherBirdImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} height={70} onClick={()=>setCharaImage(image,setCurrentBroImage)} />
                        ))}
                        {sisterBirdImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} height={70} onClick={()=>setCharaImage(image,setCurrentSisImage)} />
                        ))}
                        {girlImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} height={70} onClick={()=>setCharaImage(image,setCurrentGirlImage)} />
                        ))}
                        {battleGodImageList.map((image,index)=>(
                            <Image alt="" key={index} src={image} width={deviceSize.width/7} height={70} onClick={()=>setCharaImage(image,setCurrentGodImage)} />
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