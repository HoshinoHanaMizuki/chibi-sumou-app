"use client";
// import Image from "next/image";
import NavBar from "../features/common/Navbar/Navbar";
import { useRef, useEffect, useState} from "react";
export default function ArPhoto() {
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    // const [currentGirlImage,setCurrentGirlImage] = useState<string | null>(null);
    // const [currentBroImage,setCurrentBroImage] = useState<string | null>(null);
    // const [currentSisImage,setCurrentSisImage] = useState<string | null>(null);
    // const [currentGodImage,setCurrentGodImage] = useState<string | null>(null);
    const [deviceSize,setDeviceSize] = useState<{width:number,height:number}>({width:0,height:0});
    // キャラクター画像のリスト
    // const girlImageList : string[] = [
    //     "/images/charactors/girl/normal.png",
    //     "/images/charactors/girl/normalWithOp.png",
    //     "/images/charactors/girl/puku.png",
    //     "/images/charactors/girl/winkWithOp.png",
    //     "/images/charactors/girl/winkWithCl.png"
    // ];
    // const brotherBirdImageList : string[] = [
    //     "/images/charactors/brotherBird/normal.png",
    //     "/images/charactors/brotherBird/cool.png",
    //     "/images/charactors/brotherBird/shiny.png"
    // ];
    // const sisterBirdImageList : string[] = [
    //     "/images/charactors/sisterBird/open.png",
    //     "/images/charactors/sisterBird/close.png",
    //     "/images/charactors/sisterBird/shock.png",
    //     "/images/charactors/sisterBird/smile.png"
    // ];
    // const battleGodImageList : string[] = [
    //     "/images/charactors/battleGod/normal.PNG",
    //     "/images/charactors/battleGod/normalOura.PNG",
    //     "/images/charactors/battleGod/normalFull.PNG",
    //     "/images/charactors/battleGod/normalRock.PNG",
    //     "/images/charactors/battleGod/smile.PNG",
    //     "/images/charactors/battleGod/smileOura.PNG",
    //     "/images/charactors/battleGod/smileFull.PNG",
    //     "/images/charactors/battleGod/smileRock.PNG",
    // ];

    useEffect(()=>{
        setDeviceSize({width:window.innerWidth,height:window.innerHeight});
        if(!videoRef.current) {
            throw new Error("videoRef is not defined");
        }

        // スマホのカメラを起動する関数
        const startCamera = async () => {
            try {
                // カメラを起動してこれをcanvasに描画するため取得
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment"} // 外カメラを指定
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                alert("カメラが起動しました");
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        }
        startCamera();
    },[]);

    return (
        <>
            <div className="allContainer relative">
                <NavBar />
                {/* スマホの縦、横サイズのキャンバスを作成 */}
                <video ref={videoRef} autoPlay={true} playsInline={true} muted={true} />
            </div>
        </>
    );
}