"use client";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../features/common/header";
import Footer from "../features/common/footer";
import NavBar from "../features/common/Navbar/Navbar";
// import Image from "next/image";
interface FestivalBaseInfo{
    id:string;
    date:string;
    introText:string;
    mapLink:string;
    name:string;
    place:string;
}
// interface festivalContents{
//     contents:Content[];
// }
interface Sponsor{
    id:string;
    name:string;
}

// interface currentData{
//     festivalBaseInfo:FestivalBaseInfo;
//     festivalContents:festivalContents;
//     sponsors:Sponsors;
// }

interface Content{
    id:string;
    img:string;
    name:string;
}
// interface EditingData {
//     date: string;
//     introText: string;
//     contents: Content[];
//     sponsors: string[];
// }

export default function PageUpdate(){
    // 編集前のデータ
    const [currentFBIData, setCurrentFBIData] = useState<FestivalBaseInfo[]>([]);
    const [currentFCData, setCurrentFCData] = useState<Content[]>([]);
    const [currentSPData, setCurrentSPData] = useState<Sponsor[]>([]);

    // 編集モード切り替え用ステータス
    const [currentContentsEditMode, setCurrentContentsEditMode] = useState<string>("追加");
    const [currentSponsorEditMode, setCurrentSponsorEditMode] = useState<string>("追加");

    // 編集後のデータ
    // 日付
    const [editingDateData, setEditingDateData] = useState<string>("");
    // 紹介文
    const [editingIntroData, setEditingIntroData] = useState<string>("");

    // コンテンツ(追加する新規データ用と更新するデータ用)　削除は選択だけで良い。
    const [updateContentId, setUpdateContentId] = useState<string>("");
    const [deleteContentId, setDeleteContentId] = useState<string>("");
    const [addContentsData, setAddContentsData] = useState<Content>();
    const [editingContentsData, setEditingContentsData] = useState<Content>();
    
    // スポンサー(追加する新規データ用と更新するデータ用)　削除は選択だけで良い。
    const [updateSponsorId, setUpdateSponsorId] = useState<string>("");
    const [deleteSponsorId, setDeleteSponsorId] = useState<string>("");
    const [addSponsorData, setAddSponsorData] = useState<string>("");
    const [editingSponsorData, setEditingSponsorData] = useState<string>("");

    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const editableQuery = async () => {
            try {
                const queryBaseInfo = await getDocs(collection(db, "festival-base-info"));
                const fbiData = queryBaseInfo.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        date: data.date,
                        introText: data.intro_text,
                        mapLink: data.map_link,
                        name: data.name,
                        place: data.place
                    } as FestivalBaseInfo;
                });
                setCurrentFBIData(fbiData);

                const queryContents = await getDocs(collection(db, "festival-contents"));
                const fcData = queryContents.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        img: data.img,
                        name: data.name
                    } as Content;
                });
                setCurrentFCData(fcData);

                const querySponsors = await getDocs(collection(db, "sponsors"));
                const spData = querySponsors.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name
                    } as Sponsor;
                });
                setCurrentSPData(spData);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("データの取得中にエラーが発生しました。");
            }
        };
        editableQuery();
    }, []);

    const handleUpdateContentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setUpdateContentId(selectedId);
        // const selectedContent = currentFCData.find(content => content.id === selectedId);
    };
    const handleDeleteContentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setDeleteContentId(selectedId);
        // const selectedContent = currentFCData.find(content => content.id === selectedId);
    };
    const handleUpdateSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setUpdateSponsorId(selectedId);
        // const selectedSponsor = currentFCData.find(sponsor => sponsor.id === selectedId);
    };
    const handleDeleteSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setDeleteSponsorId(selectedId);
        // const selectedSponsor = currentFCData.find(sponsor => sponsor.id === selectedId);
    };

    return(
        <div className="allContainer">
            <Header />
            <NavBar />
            {/*sponsors, festivalBaseInfo, festivalContentsを編集するためのフォームを作成。 */}
            <div  className="allEditingContainer">
                <div className="festivalBaseInfoEditing">
                    <div className="editing grid grid-cols-2">
                        <div className="before">
                        {currentFBIData.map(baseInfo => (
                            <div className="text-xs" key={baseInfo.id}>
                                <h2>{baseInfo.name}</h2>
                                <p>{baseInfo.date}</p>
                                <p>{baseInfo.place}</p>
                                <p>{baseInfo.introText}</p>
                                <a href={baseInfo.mapLink}>Map</a>
                            </div>
                        ))}
                        </div>
                        <div className="after text-xs">
                            <div className="date">
                                {/* 入力フォーム */}
                                <p>更新する日付を入力してください。　例：2020/1//22</p>
                                <input className="border-black border-2" type="string" name="date" value={editingDateData} onChange={(e) => setEditingDateData(e.target.value)} />
                            </div>
                            <div className="introText">
                                <p>更新する紹介文を入力してください。</p>
                                <textarea className="border-black border-2" name="introText" value={editingIntroData} onChange={(e) => setEditingIntroData(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="festivalContentsEditing">
                    <div className="editing grid grid-cols-2">
                        <div className="before">
                            <div className="contents">
                                <p>コンテンツ一覧</p>
                                {currentFCData.map((content, index) => (
                                    <div className="text-xs" key={index}>
                                        {/* <Image src={content.img} alt={content.name} /> */}
                                        <h2>{content.name}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="after text-xs">
                            <div className="contents">
                                {/* モード切り替え用ラジオボタン */}
                                <div className="radio text-center">
                                    <input type="radio" name="contents" value="追加" checked={currentContentsEditMode === "追加"} onChange={() => setCurrentContentsEditMode("追加")} />
                                    <label className="pl-1 pr-1">追加</label>
                                    <input type="radio" name="contents" value="削除" onChange={() => setCurrentContentsEditMode("削除")} />
                                    <label className="pl-1 pr-1">削除</label>
                                    <input type="radio" name="contents" value="更新" onChange={() => setCurrentContentsEditMode("更新")} />
                                    <label className="pl-1 pr-1">更新</label>
                                </div>
                                {/* 追加モード */}
                                {currentContentsEditMode === "追加" && (
                                    <div className="addContents">
                                        <p>追加するコンテンツ名を入力してください。</p>
                                        {/* addContentnsDataのname要素の値の入力 */}
                                        <input className="border-black border-2"  type="text" name="contents" value={addContentsData?.name} onChange={(e) => setAddContentsData(addContentsData => ({
                                            ...addContentsData,
                                            name: e.target.value
                                        } as Content))} />
                                    </div>
                                )}
                                {/* 更新モード */}
                                {currentContentsEditMode === "更新" && (
                                    <div className="updateContents">
                                        <p>更新するコンテンツ名を選択してください。</p>
                                        {/* editingContentsDataのname要素の値の入力 */}
                                        {/* リストから１つ選ぶ */}
                                        <select value={updateContentId} onChange={handleUpdateContentChange} name="editingContents">
                                            {currentFCData.map((content) => (
                                                <option value={content.name} key={content.id}>{content.name}</option>
                                            ))}
                                        </select>
                                        <p>更新後のコンテンツ名を入力してください。</p>
                                        <input className="border-black border-2" type="text" name="contents" value={editingContentsData?.name} onChange={(e) => setEditingContentsData(editingContentsData => ({
                                            ...editingContentsData,
                                            name: e.target.value
                                        } as Content))} />

                                    </div>
                                )}
                                {/* 削除モード */}
                                {currentContentsEditMode === "削除" && (
                                    <div className="deleteContents">
                                        <p>削除するコンテンツ名を選択してください。</p>
                                        {/* リストから１つ選ぶ */}
                                        <select value={deleteContentId} onChange={handleDeleteContentChange} name="deleteContents">
                                            {currentFCData.map((content) => (
                                                <option value={content.name} key={content.id}>{content.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sponsorsEditing">
                    <div className="editing grid grid-cols-2">
                        <div className="before">
                            <p>協賛先一覧</p>
                            {currentSPData.map((sponsor,index) =>(
                                <div className="text-xs" key={index}>
                                    <h2>協賛先{index+1}:{sponsor.name}</h2>
                                </div>
                            ))}
                        </div>
                        <div className="after text-xs">
                            <div className="sponsor">
                                {/* モード切り替え用ラジオボタン */}
                                <div className="radio text-center">
                                    <input type="radio" name="sponsor" value="追加" checked={currentSponsorEditMode === "追加"} onChange={() => setCurrentSponsorEditMode("追加")} />
                                    <label className="pl-1 pr-1">追加</label>
                                    <input type="radio" name="sponsor" value="削除" onChange={() => setCurrentSponsorEditMode("削除")} />
                                    <label className="pl-1 pr-1">削除</label>
                                    <input type="radio" name="sponsor" value="更新" onChange={() => setCurrentSponsorEditMode("更新")} />
                                    <label className="pl-1 pr-1">更新</label>
                                </div>
                                {/* 追加モード */}
                                {currentSponsorEditMode === "追加" && (
                                    <div className="addSponsor">
                                        <p>追加する協賛先の名前を入力してください。</p>
                                        {/* addSponsorDataのname要素の値の入力 */}
                                        <input className="border-black border-2"  type="text" name="sponsor" value={addSponsorData} onChange={(e) => setAddSponsorData(e.target.value)} />
                                    </div>
                                )}
                                {/* 更新モード */}
                                {currentSponsorEditMode === "更新" && (
                                    <div className="updateSponsor">
                                        <p>更新する協賛先の名前を選択してください。</p>
                                        {/* editingSponsorDataのname要素の値の入力 */}
                                        {/* リストから１つ選ぶ */}
                                        <select value={updateSponsorId} onChange={handleUpdateSponsorChange} name="editingSponsor">
                                            {currentSPData.map((sponsor) => (
                                                <option value={sponsor.name} key={sponsor.id}>{sponsor.name}</option>
                                            ))}
                                        </select>
                                        <p>更新後の協賛先の名前を入力してください。</p>
                                        <input className="border-black border-2" type="text" name="Sponsor" value={editingSponsorData} onChange={(e) => setEditingSponsorData(e.target.value)} />

                                    </div>
                                )}
                                {/* 削除モード */}
                                {currentSponsorEditMode === "削除" && (
                                    <div className="deleteSponsor">
                                        <p>削除する協賛先の名前を選択してください。</p>
                                        {/* リストから１つ選ぶ */}
                                        <select value={deleteSponsorId} onChange={handleDeleteSponsorChange} name="deleteSponsor">
                                            {currentSPData.map((sponsor) => (
                                                <option value={sponsor.name} key={sponsor.id}>{sponsor.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
        
    );
}

//編集するのは、祭りの基礎情報(update)、コンテンツ(add,delete,update)、協賛先の情報(add,delete,update)。