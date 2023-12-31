"use client"

import Lottie from "lottie-react"
import scissors from "./scissors.json"

function ScissorsLottie() {
  return (
    <Lottie animationData={scissors} loop={true}/>
    )
}

export default ScissorsLottie