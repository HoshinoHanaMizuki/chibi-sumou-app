export default function AroundInfo(){
    interface ArounfInfo{
        parking : string[][];
        toilet : string[];
    }
    const aroundInfo : ArounfInfo = {
        parking : [["居酒屋だご亭駐車場","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.2461833769135!2d131.37035257623896!3d32.089631518795905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538afcda7fe0347%3A0xc76d95fac9b82190!2z44Gg44GU5Lqt!5e0!3m2!1sja!2sjp!4v1732452653372!5m2!1sja!2sjp"],["居酒屋だご亭","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.2461833769135!2d131.37035257623896!3d32.089631518795905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538afcda7fe0347%3A0xc76d95fac9b82190!2z44Gg44GU5Lqt!5e0!3m2!1sja!2sjp!4v1732452653372!5m2!1sja!2sjp"]],
        toilet : ["居酒屋だご亭","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.2461833769135!2d131.37035257623896!3d32.089631518795905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3538afcda7fe0347%3A0xc76d95fac9b82190!2z44Gg44GU5Lqt!5e0!3m2!1sja!2sjp!4v1732452653372!5m2!1sja!2sjp"]
    }
    return(
        <>
            <div className="aroundInformation">
                {/* 周辺情報を駐車場、トイレ、について表示、地図を埋め込む */}
                <div className="parking">
                    <p>駐車場1:{aroundInfo.parking[0][0]}</p>
                    <div className="parkingMap">
                        <iframe className="w-full h-80 sm:h-64" src={aroundInfo.parking[0][1]} loading="lazy"></iframe>
                    </div>
                </div>
                {/* <div className="parking">
                    <p>駐車場2:{aroundInfo.parking[1][0]}</p>
                    <div className="parkingMap">
                        <iframe className="w-full h-80 sm:h-64" src={aroundInfo.parking[1][1]} loading="lazy"></iframe>
                    </div>
                </div> */}
                <div className="toilet">
                    <p>トイレ:{aroundInfo.toilet[0]}</p>
                    <div className="toiletMap">
                        <iframe className="w-full h-80 sm:h-64" src={aroundInfo.toilet[1]} loading="lazy"></iframe>
                    </div>
                </div>
                <div className="toilet"></div>
            </div>
        </>
    );
}