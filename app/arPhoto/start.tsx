"use client";
// import Image from "next/image";
import NavBar from "../features/common/Navbar/Navbar";
import { useRef, useEffect, useState } from "react";
// import Image from "next/image";

export default function ArPhoto() {
    const canvasRef_video = useRef<HTMLCanvasElement>(null);
    const canvasRef_sisterBird = useRef<HTMLCanvasElement>(null);
    const canvasRef_brotherBird = useRef<HTMLCanvasElement>(null);
    const canvasRef_girl = useRef<HTMLCanvasElement>(null);
    const canvasRef_god = useRef<HTMLCanvasElement>(null);
    const canvasRef_combine = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [deviceSize, setDeviceSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [currentGirlImage,setCurrentGirlImage] = useState<string | null>(null);
    const [currentGirlPositonXY,setCurrentGirlPositonXY] = useState<{x:number,y:number}>({x:0,y:0});
    const [currentBrotherBirdImage,setCurrentBrotherBirdImage] = useState<string | null>(null);
    const [currentSisterBirdImage,setCurrentSisterBirdImage] = useState<string | null>(null);
    const [currentGodImage,setCurrentGodImage] = useState<string | null>(null);
    const [isEditingMenuVisible, setIsEditingMenuVisible] = useState<boolean>(true);
    const [selectedCanvas, setSelectedCanvas] = useState<HTMLCanvasElement | null>(null);

    const sisterBirdImageList: string[] = [
        "/images/charactors/sisterBird/open.png",
        "/images/charactors/sisterBird/close.png",
        "/images/charactors/sisterBird/shock.png",
        "/images/charactors/sisterBird/smile.png"
    ];
    const brotherBirdImageList: string[] = [
        "/images/charactors/brotherBird/normal.png",
        "/images/charactors/brotherBird/cool.png",
        "/images/charactors/brotherBird/shiny.png"
    ];
    const girlImageList: string[] = [
        "/images/charactors/girl/normal.png",
        "/images/charactors/girl/normalWithOp.png",
        "/images/charactors/girl/puku.png",
        "/images/charactors/girl/winkWithOp.png",
        "/images/charactors/girl/winkWithCl.png"
    ];
    const battleGodImageList: string[] = [
        "/images/charactors/battleGod/normal.PNG",
        "/images/charactors/battleGod/normalOura.PNG",
        "/images/charactors/battleGod/normalFull.PNG",
        "/images/charactors/battleGod/normalRock.PNG",
        "/images/charactors/battleGod/smile.PNG",
        "/images/charactors/battleGod/smileOura.PNG",
        "/images/charactors/battleGod/smileFull.PNG",
        "/images/charactors/battleGod/smileRock.PNG"
    ];

    useEffect(() => {
        setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
        if (!videoRef.current) {
            throw new Error("videoRef is not defined");
        }
        if (!canvasRef_video.current) {
            throw new Error("canvasRef_video is not defined");
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
                // alert("カメラが起動しました");
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        }
        startCamera();

        const canvas_video = canvasRef_video.current;
        const context_video = canvas_video?.getContext("2d");

        const canvas_sisterBird = canvasRef_sisterBird.current;
        const context_sisterBird = canvas_sisterBird?.getContext("2d");

        const canvas_brotherBird = canvasRef_brotherBird.current;
        const context_brotherBird = canvas_brotherBird?.getContext("2d");

        const canvas_girl = canvasRef_girl.current;
        const context_girl = canvas_girl?.getContext("2d");

        const canvas_god = canvasRef_god.current;
        const context_god = canvas_god?.getContext("2d");

        const canvas_combine = canvasRef_combine.current;
        const context_combine = canvas_combine?.getContext("2d");

        if (!context_video) {
            throw new Error("context is not defined");
        }

        const drawFrame = () => {
            if (videoRef.current) {
                context_video.drawImage(videoRef.current, 0, 0, window.innerWidth, window.innerHeight);
            }
            requestAnimationFrame(drawFrame);
        };

        drawFrame();

        const drawCanvasImage = (context: CanvasRenderingContext2D | null, imageSrc: string | null) => {
            if (context) {
                const img = new Image();
                if(imageSrc != null){
                    img.src = imageSrc;
                }
                img.onload = () => {
                    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    if(context != null && context != undefined){
                        context.drawImage(img, 100, 100, window.innerWidth, window.innerHeight);
                    }
                };
            }
        };

        drawCanvasImage(context_sisterBird ?? null, currentSisterBirdImage);
        drawCanvasImage(context_brotherBird ?? null, currentBrotherBirdImage);
        drawCanvasImage(context_girl ?? null, currentGirlImage);
        drawCanvasImage(context_god ?? null, currentGodImage);

    }, [currentSisterBirdImage, currentBrotherBirdImage, currentGirlImage, currentGodImage]);

    const handleCapture = async (
        context_video: CanvasRenderingContext2D,
        context_sisterBird: CanvasRenderingContext2D,
        context_brotherBird: CanvasRenderingContext2D,
        context_girl: CanvasRenderingContext2D,
        context_god: CanvasRenderingContext2D,
        context_combine: CanvasRenderingContext2D
    ) => {
        try {
            const drawContextToCanvas = (context: CanvasRenderingContext2D, targetContext: CanvasRenderingContext2D) => {
                const image = new Image();
                image.src = context.canvas.toDataURL();
                image.onload = () => {
                    targetContext.drawImage(image, 0, 0, deviceSize.width, deviceSize.height);
                };
            };
    
            // 各コンテキストを `context_combine` に描画
            drawContextToCanvas(context_video, context_combine);
            drawContextToCanvas(context_sisterBird, context_combine);
            drawContextToCanvas(context_brotherBird, context_combine);
            drawContextToCanvas(context_girl, context_combine);
            drawContextToCanvas(context_god, context_combine);
    
            // 少し遅延を入れて、描画完了を待つ（非同期的な描画のため）
            await new Promise((resolve) => setTimeout(resolve, 500));
    
            // 画像データを生成
            const imageDataUrl = context_combine.canvas.toDataURL("image/png");
    
            // ダウンロードリンクを生成してクリック
            const a = document.createElement("a");
            a.href = imageDataUrl;
            a.download = "arPhoto.png";
            a.click();
        } catch (error) {
            console.error("Error capturing photo:", error);
        }
    };

    const shot = () => {
        const context_video = canvasRef_video.current?.getContext("2d");
        const context_sisterBird = canvasRef_sisterBird.current?.getContext("2d");
        const context_brotherBird = canvasRef_brotherBird.current?.getContext("2d");
        const context_girl = canvasRef_girl.current?.getContext("2d");
        const context_god = canvasRef_god.current?.getContext("2d");
        const context_combine = canvasRef_combine.current?.getContext("2d");

        if (context_video && context_sisterBird && context_brotherBird && context_girl && context_god && context_combine) {
            handleCapture(context_video, context_sisterBird, context_brotherBird, context_girl, context_god, context_combine);
            alert("撮影しました");
        } else {
            alert("撮影できませんでした");
        }
    }

    const toggleEditingMenu = () => {
        setIsEditingMenuVisible(!isEditingMenuVisible);
    };

    const handleCanvasClick = (canvas: HTMLCanvasElement) => {
        setSelectedCanvas(canvas);
    };

    const handleCanvasReset = (canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        setSelectedCanvas(null);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = event.currentTarget;
        const context = canvas.getContext('2d');
        if (context) {
            const rect = canvas.getBoundingClientRect();
            const x = event.touches[0].clientX - rect.left;
            const y = event.touches[0].clientY - rect.top;
            context.strokeStyle = 'white';
            context.lineWidth = 2;
            context.strokeRect(x - 50, y - 50, 100, 100);
            context.fillStyle = 'white';
            context.fillRect(x + 40, y - 60, 20, 20);
            context.fillStyle = 'black';
            context.fillText('✖️', x + 45, y - 45);
        }
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (selectedCanvas) {
            const canvas = selectedCanvas;
            const context = canvas.getContext('2d');
            if (context) {
                const rect = canvas.getBoundingClientRect();
                const x = event.touches[0].clientX - rect.left;
                const y = event.touches[0].clientY - rect.top;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(new Image(), x - 50, y - 50, 100, 100);
            }
        }
    };

    const handleTouchEnd = () => {
        setSelectedCanvas(null);
    };

    return (
        <>
            <div className="allContainer relative">
                <NavBar />
                {/* スマホの縦、横サイズのキャンバスを作成 */}
                <div className="canvasContainer relative">
                    <canvas className="absolute top-0 left-0" ref={canvasRef_video} width={deviceSize.width} height={deviceSize.height} />
                    <canvas className="absolute top-0 left-0" ref={canvasRef_sisterBird} width={deviceSize.width} height={deviceSize.height} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={() => handleCanvasClick(canvasRef_sisterBird.current!)} />
                    <canvas className="absolute top-0 left-0" ref={canvasRef_brotherBird} width={deviceSize.width} height={deviceSize.height} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={() => handleCanvasClick(canvasRef_brotherBird.current!)} />
                    <canvas className="absolute top-0 left-0" ref={canvasRef_girl} width={deviceSize.width} height={deviceSize.height} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={() => handleCanvasClick(canvasRef_girl.current!)} />
                    <canvas className="absolute top-0 left-0" ref={canvasRef_god} width={deviceSize.width} height={deviceSize.height} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={() => handleCanvasClick(canvasRef_god.current!)} />
                    <canvas className="absolute top-0 left-0" ref={canvasRef_combine} width={deviceSize.width} height={deviceSize.height} />
                </div>
                <div className="editingMenu fixed bottom-10 left-0 right-0 p-4 flex flex-col justify-center space-x-4">
                    <div className="fixed bottom-60 right-4 flex space-x-2">
                        <button onClick={toggleEditingMenu} className="bg-gray-200 p-2 rounded">
                            {isEditingMenuVisible ? '✖️' : '🚪'}
                        </button>
                    </div>
                    {/*キャラクター設定UIをここに追加 */}
                    <div className="charactorSettingUI bottom-32 flex justify-center space-x-4 overflow-x-auto">
                        {sisterBirdImageList.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Sister Bird ${index + 1}`}
                                width={deviceSize.width / 7}
                                height={deviceSize.width / 7}
                                className="h-auto cursor-pointer"
                                onClick={() => setCurrentSisterBirdImage(image)}
                            />
                        ))}
                        {brotherBirdImageList.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Brother Bird ${index + 1}`}
                                width={deviceSize.width / 6}
                                height={deviceSize.height / 6}
                                className="h-auto cursor-pointer"
                                onClick={() => setCurrentBrotherBirdImage(image)}
                            />
                        ))}
                        {girlImageList.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Girl ${index + 1}`}
                                width={deviceSize.width / 6}
                                height={deviceSize.height / 6}
                                className="h-auto cursor-pointer"
                                onClick={() => setCurrentGirlImage(image)}
                            />
                        ))}
                        {battleGodImageList.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Battle God ${index + 1}`}
                                width={deviceSize.width / 6}
                                height={deviceSize.height / 6}
                                className="h-auto cursor-pointer"
                                onClick={() => setCurrentGodImage(image)}
                            />
                        ))}
                    </div>
                      
                    <button onClick={shot} className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-blue-500 text-white rounded">撮影</button>
                </div>
                <video ref={videoRef} autoPlay={true} playsInline={true} muted={true} />
            </div>
        </>
    );
}