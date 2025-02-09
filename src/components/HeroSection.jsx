import React from 'react'
import chat from '../assets/icons/chat.png'
import card from '../assets/icons/card.png'
import shipping from '../assets/icons/shipping.png'
import replay from '../assets/icons/replay.png'
import HomeCard from './HomeCard'
import Card from './Card'
const HeroSection = () => {
    return (
        <div className="relative">
            <img src="https://t3.ftcdn.net/jpg/06/92/64/12/240_F_692641245_4mN5Oht7xNi4atfJGlSmwUqmmpCypjZz.jpg" alt=""
                className="w-[100%] h-[70vh]" />
            <Card classes="p-4 relative bottom-10 w-full md:w-[80%] m-auto absolute">
                <div className="flex gap-2 items-center flex-wrap justify-between">
                    <HomeCard
                        image={shipping}
                        title={"Free shipping"}
                        description={"When you spend INR 250 or more"}
                    />
                    <HomeCard
                        image={chat}
                        title={"We are available 24x7"}
                        description={"Need help contact us"}
                        next={"anytime"}
                    />
                    <HomeCard
                        image={replay}
                        title={"Satisfied or return"}
                        description={"Easy 30-day return policy"}
                    />
                    <HomeCard
                        image={card}
                        title={"100% secure payment"}
                        description={"visa, mastercard, stripe, "}
                        next={"paypal"}
                    />
                </div>
            </Card>
        </div>
    )
}

export default HeroSection