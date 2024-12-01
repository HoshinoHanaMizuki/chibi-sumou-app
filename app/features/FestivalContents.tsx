"use client";
// 祭りのコンテンツをデータベースから取得し、表示するコンポーネント
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

// Contentインターフェースを定義
interface Content {
    id: string;
    image: string;
    name: string;
    // 他のプロパティがある場合はここに追加
}

export default function FestivalContents() {
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        const queryContents = async () => {
            const querySnapshot = await getDocs(collection(db, "festival-contents"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Content));
            setContents(data);
        };
        queryContents();
    }, []);

    return (
        <div className="contentsContainer">
            {/* コンテンツ */}
            {contents.map((content) => (
                <div key={content.id}>
                    <h2>{content.name}</h2>
                </div>
            ))}
        </div>
    );
}