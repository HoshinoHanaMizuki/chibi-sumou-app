// "use client"
// import { useState } from "react";

// export default function PhoneNavbar() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     // メニューの表示を切り替える関数
//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//     return (
//         <>
//             {/* ハンバーガーメニューアイコン */}
//             <div className="fixed top-4 right-4 z-20">
//                 <button
//                     className="flex flex-col items-center space-y-1"
//                     onClick={toggleMenu}
//                 >
//                     <div className="w-6 h-0.5 bg-black"></div>
//                     <div className="w-6 h-0.5 bg-black"></div>
//                     <div className="w-6 h-0.5 bg-black"></div>
//                 </button>
//             </div>

//             {/* メニュー */}
//             {isMenuOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 z-10 flex justify-center items-center">
//                     <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-3/4 max-w-xs">
//                         <a href="/" className="text-base text-gray-800 hover:text-gray-600">ホーム</a>
//                         <a href="/arPhoto" className="text-base text-gray-800 hover:text-gray-600">ARフォト</a>
//                         <button
//                             onClick={toggleMenu}
//                             className="mt-4 text-red-500 hover:text-red-700"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }





