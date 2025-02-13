import Card from "./Card"
import HeroSection from "./HeroSection"
import air from "../assets/icons/air.png"
import audio_video from "../assets/icons/audio_video.png"
import kitchen from "../assets/icons/kitchen.png"
import laptop from "../assets/icons/laptop.png"
import mobile from "../assets/icons/mobile.png"
import refrigerator from "../assets/icons/refrigerator.png"
import { useEffect, useState } from "react"
import { getApi } from "../api"
import { useNavigate } from "react-router-dom"
export const Home = () => {
    const [categoryWiseData, setCategoryWiseData] = useState({})
    const navigate = useNavigate()
useEffect(() => {
    getData()
}, [])
const getData = async () => {
   try {
    const res = await getApi('/product/category-data')
    setCategoryWiseData(res?.data?.data)
   } catch(err) {
    console.log(err)
   }
}
    return (
        <>
            <HeroSection/>
            <Card classes="p-4 w-full m-auto md:w-[80%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/air conditioner')}>
                        <img src={air} alt="" className="aspect-square"/>
                        <strong>AIR CONDITIONER</strong>
                        <span>{categoryWiseData["air conditioner"]} Products</span>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/laptop')}>
                        <img src={laptop} alt="" className="aspect-square"/>
                        <strong>LAPTOP</strong>
                        <span>{categoryWiseData["laptop"]} Products</span>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/mobile')}>
                        <img src={mobile} alt="" className="aspect-square"/>
                        <strong>MOBILE</strong>
                        <span>{categoryWiseData["mobile"]} Products</span>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/refrigerator')}>
                        <img src={refrigerator} alt="" className="aspect-square"/>
                        <strong>REFRIGERATOR</strong>
                        <span>{categoryWiseData["refrigerator"]} Products</span>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/audio video')}>
                        <img src={audio_video} alt="" className="aspect-square"/>
                        <strong>AUDIO/VIDEO</strong>
                        <span>{categoryWiseData["audio video"]} Products</span>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-between" onClick={() => navigate('/product/kitchen appliances')}>
                        <img src={kitchen} alt="" className="aspect-square"/>
                        <strong>KITCHEN</strong>
                        <span>{categoryWiseData["kitchen appliances"]} Products</span>
                    </div>
                </div>
            </Card>

        </>
    )
}