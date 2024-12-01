import Link from "next/link";
export default function PcNavbar({}) {
    return (
        <div className="navBarContainer">
            <nav className="navBar">
                <Link href="/">ホーム</Link>
                <Link href="/arPhoto">ARフォト</Link>
                <Link href="/pageUpdate">ページの更新</Link>
            </nav>
        </div>
    );
}

