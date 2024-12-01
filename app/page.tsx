"use client";
// import { useAuth } from "./appProvider";
// import { useState,useEffect } from "react";
import NavBar from "./features/common/Navbar/Navbar";
import Footer from "./features/common/footer";
import Header from "./features/common/header";
import FestivalBaseInfo from "./features/FestivalBaseInfo";
import FestivalContents from "./features/FestivalContents";
import AroundInfo from "./features/AroundInfo";
import Sponsors from "./features/Sponsors";
export default function Home(){
  // const [isAuth, setIsAuth] = useAuth();
  return(
    <>
      {/* 相撲大会情報掲載（日時、会場、祭りの紹介、コンテンツ）  周辺情報掲載（トイレ、駐車場、食事、飲料の購入)   協賛先掲載*/}
      <div className="allContainer">
        <Header />
        <NavBar />
        <div  className="allContainer">
          {/* 相撲大会情報掲載（日時、会場、祭りの紹介） */}
          <FestivalBaseInfo />
          {/* コンテンツ */}
          <FestivalContents />
          {/* 周辺情報掲載（トイレ、駐車場、食事、飲料の購入) */}
          <AroundInfo />
          {/* 協賛先掲載 */}
          <Sponsors />
        </div>
        <Footer  />
      </div>
    </>
  );
}