// "use client";
// import NavBar from "../features/common/Navbar/Navbar";
// import { useRef, useEffect, useState } from "react";

// export default function ArPhoto() {
//     const canvasRef_sisterBird = useRef<HTMLCanvasElement>(null);
//     const [currentSisterBirdImage, setCurrentSisterBirdImage] = useState<string | null>(null);

//     const [scale, setScale] = useState<number>(0.5);
//     const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
//     const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

//     const sisterBirdImageList: string[] = [
//         "/images/charactors/sisterBird/open.png",
//         "/images/charactors/sisterBird/close.png",
//         "/images/charactors/sisterBird/shock.png",
//         "/images/charactors/sisterBird/smile.png",
//     ];

//     useEffect(() => {
//         const canvas = canvasRef_sisterBird.current;
//         if (!canvas) return;

//         const context = canvas.getContext("2d");
//         // if (!context) return;

//         const img = new Image();
//         if (currentSisterBirdImage) {
//             img.src = currentSisterBirdImage;
//         }

//         img.onload = () => {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             const scaledWidth = img.width * scale;
//             const scaledHeight = img.height * scale;

//             // 画像の位置をキャンバス内に制限
//             const clampedX = Math.min(Math.max(position.x, 0), canvas.width - scaledWidth);
//             const clampedY = Math.min(Math.max(position.y, 0), canvas.height - scaledHeight);

//             context.drawImage(img, clampedX, clampedY, scaledWidth, scaledHeight);
//         };
//     }, [currentSisterBirdImage, scale, position]);

//     const handleScaleChange = (newScale: number) => {
//         setScale(newScale);
//     };

//     const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
//         const touch = e.touches[0];
//         setTouchStart({ x: touch.clientX, y: touch.clientY });
//     };

//     const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//         if (!touchStart) return;

//         const touch = e.touches[0];
//         const deltaX = touch.clientX - touchStart.x;
//         const deltaY = touch.clientY - touchStart.y;

//         setPosition((prev) => ({
//             x: prev.x + deltaX,
//             y: prev.y + deltaY,
//         }));

//         setTouchStart({ x: touch.clientX, y: touch.clientY });
//     };

//     const handleTouchEnd = () => {
//         setTouchStart(null);
//     };

//     return (
//         <>
//             <div className="allContainer relative">
//                 <NavBar />
//                 <div className="canvasContainer relative">
//                     <canvas
//                         className="absolute top-0 left-0 border"
//                         ref={canvasRef_sisterBird}
//                         width={window.innerWidth}
//                         height={window.innerHeight}
//                         onTouchStart={handleTouchStart}
//                         onTouchMove={handleTouchMove}
//                         onTouchEnd={handleTouchEnd}
//                     />
//                 </div>
//                 <div className="fixed bottom-10 left-0 right-0 p-4 flex flex-col space-x-4">
//                     <div className="flex justify-center space-x-4">
//                         {sisterBirdImageList.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`Sister Bird ${index + 1}`}
//                                 width={50}
//                                 height={50}
//                                 className="cursor-pointer"
//                                 onClick={() => setCurrentSisterBirdImage(image)}
//                             />
//                         ))}
//                     </div>
//                     <div className="flex justify-center space-x-4">
//                         {[0.25, 0.5, 1].map((s) => (
//                             <button
//                                 key={s}
//                                 className={`p-2 rounded ${scale === s ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                                 onClick={() => handleScaleChange(s)}
//                             >
//                                 {s}倍
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }