// import { useState, useEffect } from 'react';
// import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../firebase';

// interface Contents {
//     img: string;
//     name: string;
// }
// interface EditingData {
//     date: string;
//     introText: string;
//     contents: Contents[];
//     sponsors: string[];
// }

// export default function PageUpdate() {
//     // 編集前のデータ
//     const [currentFBIData, setCurrentFBIData] = useState<any[]>([]);
//     const [currentFCData, setCurrentFCData] = useState<any[]>([]);
//     const [currentSPData, setCurrentSPData] = useState<any[]>([]);
//     // 編集後のデータ
//     const [editingDateData, setEditingDateData] = useState<string>("");
//     const [editingIntroData, setEditingIntroData] = useState<string>("");
//     const [addContentsData, setAddContentsData] = useState<Contents>({ img: "", name: "" });
//     const [editingContentsData, setEditingContentsData] = useState<Contents>({ img: "", name: "" });
//     const [selectedContentId, setSelectedContentId] = useState<string>("");
//     const [updateSponsorId, setUpdateSponsorId] = useState<string>("");
//     const [deleteSponsorId, setDeleteSponsorId] = useState<string>("");
//     const [addSponsorData, setAddSponsorData] = useState<string>("");
//     const [editingSponsorData, setEditingSponsorData] = useState<string>("");
//     const [error, setError] = useState<string | null>(null);
//     const [showDialog, setShowDialog] = useState<boolean>(false);

//     useEffect(() => {
//         const editableQuery = async () => {
//             try {
//                 const queryBaseInfo = await getDocs(collection(db, "festival-base-info"));
//                 const fbiData = queryBaseInfo.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setCurrentFBIData(fbiData);

//                 const queryContents = await getDocs(collection(db, "festival-contents"));
//                 const fcData = queryContents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setCurrentFCData(fcData);

//                 const querySponsors = await getDocs(collection(db, "sponsors"));
//                 const spData = querySponsors.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setCurrentSPData(spData);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 setError("データの取得中にエラーが発生しました。");
//             }
//         };
//         editableQuery();
//     }, []);

//     const handleAddContent = async () => {
//         try {
//             await addDoc(collection(db, "festival-contents"), addContentsData);
//             setAddContentsData({ img: "", name: "" });
//             // データを再取得
//             const queryContents = await getDocs(collection(db, "festival-contents"));
//             const fcData = queryContents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setCurrentFCData(fcData);
//         } catch (error) {
//             console.error("Error adding content: ", error);
//             setError("コンテンツの追加中にエラーが発生しました。");
//         }
//     };

//     const handleUpdateContent = async () => {
//         try {
//             const contentDoc = doc(db, "festival-contents", selectedContentId);
//             await updateDoc(contentDoc, editingContentsData);
//             // データを再取得
//             const queryContents = await getDocs(collection(db, "festival-contents"));
//             const fcData = queryContents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setCurrentFCData(fcData);
//         } catch (error) {
//             console.error("Error updating content: ", error);
//             setError("コンテンツの更新中にエラーが発生しました。");
//         }
//     };

//     const handleDeleteContent = async (id: string) => {
//         try {
//             const contentDoc = doc(db, "festival-contents", id);
//             await deleteDoc(contentDoc);
//             // データを再取得
//             const queryContents = await getDocs(collection(db, "festival-contents"));
//             const fcData = queryContents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setCurrentFCData(fcData);
//         } catch (error) {
//             console.error("Error deleting content: ", error);
//             setError("コンテンツの削除中にエラーが発生しました。");
//         }
//     };

//     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedId = e.target.value;
//         setSelectedContentId(selectedId);
//         const selectedContent = currentFCData.find(content => content.id === selectedId);
//         if (selectedContent) {
//             setEditingContentsData(selectedContent);
//         }
//     };

//     const handleConfirmChanges = async () => {
//         try {
//             // ここでaddDoc, deleteDoc, updateDocなどの処理をまとめて行う
//             if (addContentsData.name) {
//                 await addDoc(collection(db, "festival-contents"), addContentsData);
//             }
//             if (selectedContentId) {
//                 const contentDoc = doc(db, "festival-contents", selectedContentId);
//                 await updateDoc(contentDoc, editingContentsData);
//             }
//             if (deleteSponsorId) {
//                 const sponsorDoc = doc(db, "sponsors", deleteSponsorId);
//                 await deleteDoc(sponsorDoc);
//             }
//             setShowDialog(false);
//         } catch (error) {
//             console.error("Error confirming changes: ", error);
//             setError("変更の確定中にエラーが発生しました。");
//         }
//     };

//     return (
//         <div className="allContainer">
//             <Header />
//             <NavBar />
//             {error && <div className="error">{error}</div>}
//             <div className="allEditingContainer">
//                 <div className="festivalBaseInfoEditing">
//                     <div className="editing grid grid-cols-2">
//                         <div className="before">
//                             {currentFBIData.map(baseInfo => (
//                                 <div className="text-xs" key={baseInfo.id}>
//                                     <h2>{baseInfo.name}</h2>
//                                     <p>{baseInfo.date}</p>
//                                     <p>{baseInfo.place}</p>
//                                     <p>{baseInfo.intro_text}</p>
//                                     <a href={baseInfo.map_link}>Map</a>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="after">
//                             <div className="contents">
//                                 <p>コンテンツ一覧</p>
//                                 {currentFCData.map((content, index) => (
//                                     <div className="text-xs" key={index}>
//                                         <h2>{content.name}</h2>
//                                         <button onClick={() => handleDeleteContent(content.id)}>削除</button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="addContentForm">
//                                 <h3>コンテンツを追加</h3>
//                                 <input
//                                     type="text"
//                                     placeholder="画像URL"
//                                     value={addContentsData.img}
//                                     onChange={(e) => setAddContentsData({ ...addContentsData, img: e.target.value })}
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="コンテンツ名"
//                                     value={addContentsData.name}
//                                     onChange={(e) => setAddContentsData({ ...addContentsData, name: e.target.value })}
//                                 />
//                                 <button onClick={handleAddContent}>追加</button>
//                             </div>
//                             <div className="updateContentForm">
//                                 <h3>コンテンツを更新</h3>
//                                 <select value={selectedContentId} onChange={handleSelectChange}>
//                                     <option value="">選択してください</option>
//                                     {currentFCData.map(content => (
//                                         <option key={content.id} value={content.id}>
//                                             {content.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <input
//                                     type="text"
//                                     placeholder="画像URL"
//                                     value={editingContentsData.img}
//                                     onChange={(e) => setEditingContentsData({ ...editingContentsData, img: e.target.value })}
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="コンテンツ名"
//                                     value={editingContentsData.name}
//                                     onChange={(e) => setEditingContentsData({ ...editingContentsData, name: e.target.value })}
//                                 />
//                                 <button onClick={handleUpdateContent}>更新</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sponsorsEditing">
//                     <div className="editing grid grid-cols-2">
//                         <div className="before">
//                             <p>協賛先一覧</p>
//                             {currentSPData.map((sponsor, index) => (
//                                 <div className="text-xs" key={index}>
//                                     <h2>協賛先{index + 1}:{sponsor.name}</h2>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="after">
//                             {/* リストから１つ選ぶ */}
//                             <select value={updateSponsorId} onChange={handleUpdateSponsorChange} name="editingSponsor">
//                                 {currentSPData.map((sponsor) => (
//                                     <option value={sponsor.name} key={sponsor.id}>{sponsor.name}</option>
//                                 ))}
//                             </select>
//                             <p>更新後の協賛先の名前を入力してください。</p>
//                             <input className="border-black border-2" type="text" name="Sponsor" value={editingSponsorData} onChange={(e) => setEditingSponsorData(e.target.value)} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <button onClick={() => setShowDialog(true)}>編集内容の確認</button>
//             {showDialog && (
//                 <div className="dialog">
//                     <h2>編集内容の確認</h2>
//                     <p>日付: {editingDateData}</p>
//                     <p>紹介文: {editingIntroData}</p>
//                     <p>追加するコンテンツ: {addContentsData.name}</p>
//                     <p>更新するコンテンツ: {editingContentsData.name}</p>
//                     <p>削除する協賛先: {deleteSponsorId}</p>
//                     <button onClick={handleConfirmChanges}>確定</button>
//                     <button onClick={() => setShowDialog(false)}>キャンセル</button>
//                 </div>
//             )}
//             <Footer />
//         </div>
//     );
// }