import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 協賛先の名前を全て取得
  useEffect(() => {
    const querySponsors = async () => {
      const querySponsors = await getDocs(collection(db, "sponsors"));
      const data = querySponsors.docs.map(doc => doc.data().name);
      setSponsors(data);
    };
    querySponsors();
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="title text-center mt-5 text-xl sponsorsTable cursor-pointer" onClick={handleDialogOpen}>
        【協賛先一覧】
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 items-center">
            <h2 className="text-2xl mb-4">協賛先一覧</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center grid grid-cols-2">
                {sponsors.map((sponsor, index) => (
                    <div key={index} className="text-xs mb-2">{sponsor}様</div>
                ))}
            </div>
            <button
                onClick={handleDialogClose}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                クローズ
            </button>
        </div>
      )}
    </>
  );
}