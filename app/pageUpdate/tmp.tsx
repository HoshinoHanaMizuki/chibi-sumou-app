// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, updateDoc } from 'firebase/firestore';
// // import { app } from '../firebaseConfig'; // Adjust the path as necessary

// const PageUpdate = () => {
//     const [festivalBaseInfo, setFestivalBaseInfo] = useState('');
//     const [festivalContents, setFestivalContents] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const router = useRouter();
//     const db = getFirestore(app);
//     const auth = getAuth(app);

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setIsAuthenticated(true);
//             } else {
//                 router.push('/login'); // Redirect to login if not authenticated
//             }
//         });
//     }, [auth, router]);

//     const handleUpdate = async () => {
//         const festivalId = 'your-festival-id'; // Replace with the actual festival ID
//         const festivalDocRef = doc(db, 'festivals', festivalId);

//         try {
//             await updateDoc(festivalDocRef, {
//                 baseInfo: festivalBaseInfo,
//                 contents: festivalContents,
//             });
//             alert('Update successful');
//         } catch (error) {
//             console.error('Error updating document: ', error);
//             alert('Update failed');
//         }
//     };

//     return (
//         isAuthenticated && (
//             <div>
//                 <h1>Update Festival Information</h1>
//                 <div>
//                     <label>
//                         Festival Base Info:
//                         <input
//                             type="text"
//                             value={festivalBaseInfo}
//                             onChange={(e) => setFestivalBaseInfo(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Festival Contents:
//                         <input
//                             type="text"
//                             value={festivalContents}
//                             onChange={(e) => setFestivalContents(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <button onClick={handleUpdate}>Update</button>
//             </div>
//         )
//     );
// };

// export default PageUpdate; 