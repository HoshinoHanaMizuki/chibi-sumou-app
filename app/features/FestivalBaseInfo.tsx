"use client";
// 祭りの基礎情報をデータベースから取得し、表示するコンポーネント
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

// FestivalBaseInfoインターフェースを定義
interface FestivalBaseInfo {
    id: string;
    name: string;
    date: string;
    place: string;
    intro_text: string;
    map_link: string;
}

export default function FestivalBaseInfoComponent() {
    const [baseInfos, setBaseInfo] = useState<FestivalBaseInfo[]>([]);

    useEffect(() => {
        const queryBaseInfo = async () => {
            const querySnapshot = await getDocs(collection(db, "festival-base-info"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FestivalBaseInfo));
            setBaseInfo(data);
        };
        queryBaseInfo();
    }, []);

    return (
        <div className="baseInformation">
            {/* 祭りの基礎情報（name、date、place、intro_text、map_link）をデータベースから取得して表示 */}
            {baseInfos.map(baseInfo => (
                <div key={baseInfo.id}>
                    <h2>{baseInfo.name}</h2>
                    <p>{baseInfo.date}</p>
                    <p>{baseInfo.place}</p>
                    <p>{baseInfo.intro_text}</p>
                    <a href={baseInfo.map_link}>Map</a>
                </div>
            ))}
        </div>
    );
}