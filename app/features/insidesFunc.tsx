// import { addDoc ,collection} from "firebase/firestore";
// import { db } from "../firebase";

// // 協賛先２０２４年
// const sponsors:string[] = [
//     "永野茂雄", 
//     "甲斐優公", 
//     "山崎壮一郎", 
//     "佐々木丈陽",
//     "長友敬三", 
//     "伊藤建具店", 
//     "居酒屋だご亭",
//     "荒川農園", 
//     "金丸美容室", 
//     "長友石油", 
//     "タナベ商店",
//     "ヤマトウッドワークス",
//     "サン美容室",
//     "都於郡地域づくり協議会",
//     "森さん", 
//     "三納の里", 
//     "木村工業",
//     "阿萬",
//     "上田",
//     "宮ノ下郵便局"
// ]
// //協賛先の名前をデータベースに登録する関数
// async function addSponsor(name: string){
//     await addDoc(collection(db, "sponsors"), {
//         name: name
//     });
// }
// // sponsors.map((sponsor,index)=>{addSponsor(sponsor)});