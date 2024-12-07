// "use client";
// import NavBar from "../features/common/Navbar/Navbar";
// import { useRef, useEffect, useState } from "react";

// export default function ArPhoto() {
//     const canvasRef_video = useRef<HTMLCanvasElement>(null);
//     const canvasRef_sisterBird = useRef<HTMLCanvasElement>(null);
//     const canvasRef_brotherBird = useRef<HTMLCanvasElement>(null);
//     const canvasRef_girl = useRef<HTMLCanvasElement>(null);
//     const canvasRef_god = useRef<HTMLCanvasElement>(null);
//     const canvasRef_combine = useRef<HTMLCanvasElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);

//     const [currentGirlImage, setCurrentGirlImage] = useState<string | null>(null);
//     const [currentBrotherBirdImage, setCurrentBrotherBirdImage] = useState<string | null>(null);
//     const [currentSisterBirdImage, setCurrentSisterBirdImage] = useState<string | null>(null);
//     const [currentGodImage, setCurrentGodImage] = useState<string | null>(null);

//     const [deviceSize, setDeviceSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

//     const [isEditingMenuVisible, setIsEditingMenuVisible] = useState(true);

//     const [positions, setPositions] = useState({
//         sisterBird: { x: 0.15 * window.innerWidth, y: 0.15 * window.innerHeight },
//         brotherBird: { x: 0.15 * window.innerWidth, y: 0.15 * window.innerHeight },
//         girl: { x: 0.15 * window.innerWidth, y: 0.15 * window.innerHeight },
//         god: { x: 0.15 * window.innerWidth, y: 0.15 * window.innerHeight },
//     });

//     const sisterBirdImageList: string[] = [
//         "/images/charactors/sisterBird/open.png",
//         "/images/charactors/sisterBird/close.png",
//         "/images/charactors/sisterBird/shock.png",
//         "/images/charactors/sisterBird/smile.png"
//     ];
//     const brotherBirdImageList: string[] = [
//         "/images/charactors/brotherBird/normal.png",
//         "/images/charactors/brotherBird/cool.png",
//         "/images/charactors/brotherBird/shiny.png"
//     ];
//     const girlImageList: string[] = [
//         "/images/charactors/girl/normal.png",
//         "/images/charactors/girl/normalWithOp.png",
//         "/images/charactors/girl/puku.png",
//         "/images/charactors/girl/winkWithOp.png",
//         "/images/charactors/girl/winkWithCl.png"
//     ];
//     const battleGodImageList: string[] = [
//         "/images/charactors/battleGod/normal.PNG",
//         "/images/charactors/battleGod/normalOura.PNG",
//         "/images/charactors/battleGod/normalFull.PNG",
//         "/images/charactors/battleGod/normalRock.PNG",
//         "/images/charactors/battleGod/smile.PNG",
//         "/images/charactors/battleGod/smileOura.PNG",
//         "/images/charactors/battleGod/smileFull.PNG",
//         "/images/charactors/battleGod/smileRock.PNG"
//     ];

//     useEffect(() => {
//         setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
//         if (!videoRef.current) {
//             throw new Error("videoRef is not defined");
//         }
//         if (!canvasRef_video.current) {
//             throw new Error("canvasRef_video is not defined");
//         }

//         // スマホのカメラを起動する関数
//         const startCamera = async () => {
//             try {
//                 // カメラを起動してこれをcanvasに描画するため取得
//                 const stream = await navigator.mediaDevices.getUserMedia({
//                     video: { facingMode: { exact: "environment" } } // 外カメラを指定
//                 });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             } catch (err) {
//                 console.error("Error accessing camera: ", err);
//                 // エラーハンドリング: 外カメラが利用できない場合、内カメラを使用
//                 if (err.name === "OverconstrainedError" || err.name === "NotFoundError") {
//                     try {
//                         const stream = await navigator.mediaDevices.getUserMedia({
//                             video: { facingMode: "user" } // 内カメラを指定
//                         });
//                         if (videoRef.current) {
//                             videoRef.current.srcObject = stream;
//                         }
//                     } catch (innerErr) {
//                         console.error("Error accessing camera: ", innerErr);
//                     }
//                 }
//             }
//         }
//         startCamera();

//         const canvas_video = canvasRef_video.current;
//         const context_video = canvas_video?.getContext("2d");

//         const canvas_sisterBird = canvasRef_sisterBird.current;
//         const context_sisterBird = canvas_sisterBird?.getContext("2d");

//         const canvas_brotherBird = canvasRef_brotherBird.current;
//         const context_brotherBird = canvas_brotherBird?.getContext("2d");

//         const canvas_girl = canvasRef_girl.current;
//         const context_girl = canvas_girl?.getContext("2d");

//         const canvas_god = canvasRef_god.current;
//         const context_god = canvas_god?.getContext("2d");

//         const canvas_combine = canvasRef_combine.current;
//         const context_combine = canvas_combine?.getContext("2d");

//         if (!context_video) {
//             throw new Error("context is not defined");
//         }

//         const drawFrame = () => {
//             if (videoRef.current) {
//                 context_video.drawImage(videoRef.current, 0, 0, window.innerWidth, window.innerHeight);
//             }
//             requestAnimationFrame(drawFrame);
//         };

//         drawFrame();

//         const drawCanvasImage = (context: CanvasRenderingContext2D | null, imageSrc: string | null, position: { x: number, y: number }) => {
//             if (context) {
//                 const img = new Image();
//                 if (imageSrc != null) {
//                     img.src = imageSrc;
//                 }
//                 img.onload = () => {
//                     context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//                     if (context != null && context != undefined) {
//                         context.drawImage(img, position.x, position.y, window.innerWidth * 0.7, window.innerHeight * 0.7);
//                     }
//                 };
//             }
//         };

//         drawCanvasImage(context_sisterBird, currentSisterBirdImage, positions.sisterBird);
//         drawCanvasImage(context_brotherBird, currentBrotherBirdImage, positions.brotherBird);
//         drawCanvasImage(context_girl, currentGirlImage, positions.girl);
//         drawCanvasImage(context_god, currentGodImage, positions.god);

//     }, [currentSisterBirdImage, currentBrotherBirdImage, currentGirlImage, currentGodImage, positions]);

//     const handleCapture = () => {
//         if (canvasRef_video.current && videoRef.current) {
//             const canvas = canvasRef_video.current;
//             const context = canvas.getContext('2d');
//             if (context) {
//                 context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//                 const dataUrl = canvas.toDataURL('image/png');
//                 alert(`撮影された画像のデータURL: ${dataUrl}`);
//             }
//         }
//     };

//     const toggleEditingMenu = () => {
//         setIsEditingMenuVisible(!isEditingMenuVisible);
//     };

//     const handleCanvasClick = (canvas: HTMLCanvasElement) => {
//         setSelectedCanvas(canvas);
//     };

//     const handleCanvasReset = (canvas: HTMLCanvasElement) => {
//         const context = canvas.getContext('2d');
//         if (context) {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//         }
//         setSelectedCanvas(null);
//     };

//     const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>, canvasType: string) => {
//         const touch = e.touches[0];
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = touch.clientX - rect.left;
//         const y = touch.clientY - rect.top;
//         setPositions((prev) => ({
//             ...prev,
//             [canvasType]: { x: x - window.innerWidth * 0.35, y: y - window.innerHeight * 0.35 }
//         }));
//     };

//     return (
//         <>
//             <div className="allContainer relative">
//                 <NavBar />
//                 {/* スマホの縦、横サイズのキャンバスを作成 */}
//                 <div className="canvasContainer relative">
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_video} width={deviceSize.width} height={deviceSize.height} />
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_sisterBird} width={deviceSize.width} height={deviceSize.height} onTouchStart={(e) => handleTouchStart(e, 'sisterBird')} />
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_brotherBird} width={deviceSize.width} height={deviceSize.height} onTouchStart={(e) => handleTouchStart(e, 'brotherBird')} />
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_girl} width={deviceSize.width} height={deviceSize.height} onTouchStart={(e) => handleTouchStart(e, 'girl')} />
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_god} width={deviceSize.width} height={deviceSize.height} onTouchStart={(e) => handleTouchStart(e, 'god')} />
//                     <canvas className="absolute top-0 left-0" ref={canvasRef_combine} width={deviceSize.width} height={deviceSize.height} />
//                 </div>
//                 <div className="editingMenu fixed bottom-10 left-0 right-0 p-4 flex flex-col justify-center space-x-4">
//                     <div className="fixed bottom-60 right-4 flex space-x-2">
//                         <button onClick={toggleEditingMenu} className="bg-gray-200 p-2 rounded">
//                             {isEditingMenuVisible ? '✖️' : '🚪'}
//                         </button>
//                     </div>
//                     {/*キャラクター設定UIをここに追加 */}
//                     <div className="charactorSettingUI bottom-32 flex justify-center space-x-4 overflow-x-auto">
//                         {sisterBirdImageList.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Sister Bird ${index + 1}`}
//                                 width={deviceSize.width / 7}
//                                 height={deviceSize.width / 7}
//                                 className="h-auto cursor-pointer"
//                                 onClick={() => setCurrentSisterBirdImage(image)}
//                             />
//                         ))}
//                         {brotherBirdImageList.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Brother Bird ${index + 1}`}
//                                 width={deviceSize.width / 7}
//                                 height={deviceSize.width / 7}
//                                 className="h-auto cursor-pointer"
//                                 onClick={() => setCurrentBrotherBirdImage(image)}
//                             />
//                         ))}
//                         {girlImageList.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Girl ${index + 1}`}
//                                 width={deviceSize.width / 7}
//                                 height={deviceSize.width / 7}
//                                 className="h-auto cursor-pointer"
//                                 onClick={() => setCurrentGirlImage(image)}
//                             />
//                         ))}
//                         {battleGodImageList.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Battle God ${index + 1}`}
//                                 width={deviceSize.width / 7}
//                                 height={deviceSize.width / 7}
//                                 className="h-auto cursor-pointer"
//                                 onClick={() => setCurrentGodImage(image)}
//                             />
//                         ))}
//                     </div>
                      
//                     <button onClick={handleCapture} className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-blue-500 text-white rounded">撮影</button>
//                 </div>
//                 <video ref={videoRef} autoPlay={true} playsInline={true} muted={true} />
//             </div>
//         </>
//     );
// }