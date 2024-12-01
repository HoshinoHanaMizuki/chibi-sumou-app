"use client";
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function CameraPage() {
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedCharactor, setSelectedCharactor] = useState<string | null>(null);
    const [charactors, setCharactors] = useState<string[]>([]);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const charactorRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        startCamera();
        loadCharactors();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setError("カメラのアクセス中にエラーが発生しました。");
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
    };

    const loadCharactors = () => {
        // ここでimage/charactorsフォルダからキャラクター画像を読み込みます
        // 例として、固定のキャラクター画像を使用します
        setCharactors([
            "/images/charactors/brotherBird/cool.png",
            "/images/charactors/brotherBird/normal.png",
            "/images/charactors/sisterBird/open.png",
            "/images/charactors/sisterBird/shock.png",
            "/images/charactors/sisterBird/smile.png"
        ]);
    };

    const handleCapture = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                // カメラの映像をキャンバスに描画
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                // キャラクターをキャンバスに描画
                if (selectedCharactor && charactorRef.current) {
                    const img = charactorRef.current;
                    context.drawImage(img, img.offsetLeft, img.offsetTop, img.width, img.height);
                }
                // 画像として保存
                const dataUrl = canvas.toDataURL('image/png');
                console.log("撮影された画像のデータURL: ", dataUrl);
                // ここでdataUrlを使用して画像を保存したり表示したりできます
            }
        }
    };

    const handleCharactorSelect = (charactor: string) => {
        setSelectedCharactor(charactor);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [cameraStream]);

    useEffect(() => {
        if (selectedCharactor && charactorRef.current) {
            const img = charactorRef.current;
            let isDragging = false;
            let startX = 0;
            let startY = 0;

            const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;
                startX = e.clientX - img.offsetLeft;
                startY = e.clientY - img.offsetTop;
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (isDragging) {
                    img.style.left = `${e.clientX - startX}px`;
                    img.style.top = `${e.clientY - startY}px`;
                }
            };

            const handleMouseUp = () => {
                isDragging = false;
            };

            img.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                img.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [selectedCharactor]);

    return (
        <div className="cameraPage">
            {error && <div className="error">{error}</div>}
            {cameraStream && (
                <div className="cameraContainer">
                    <video
                        autoPlay
                        playsInline
                        muted
                        ref={videoRef}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                    <div className="charactorSelection">
                        {charactors.map((charactor, index) => (
                            <img
                                key={index}
                                src={charactor}
                                alt={`Charactor ${index + 1}`}
                                onClick={() => handleCharactorSelect(charactor)}
                                style={{ width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                    {selectedCharactor && (
                        <div
                            ref={charactorRef}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100px',
                                height: '100px',
                                cursor: 'move'
                            }}
                        >
                            <Image
                                src={selectedCharactor}
                                alt="Selected Charactor"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    )}
                    <div className="customizationUI">
                        <button onClick={handleCapture}>撮影</button>
                    </div>
                </div>
            )}
        </div>
    );
}