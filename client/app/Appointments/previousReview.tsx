"use client"

import { previousStarsSVG } from "../(svg)/starsSVG"
import { ReviewsTable } from "../types/barberTypes"

type PreviousReviewTypes = {
    review:ReviewsTable;
    pp:string
}

function PreviousReview({review,pp}:PreviousReviewTypes) {
    const date = new Date(review.created_at)
  return (
    <aside className="bg-light-3-f rounded-xl p-2 mb-2">
            <h2 className="text-primary-f">Your previous review</h2>
            <div className="flex gap-2">
                <div>
                    <img className="w-8 aspect-square object-cover overflow-hidden rounded-full " alt="user profile picture" src={pp}></img>
                </div>

                <div className="flex flex-col ">
                    <div className="flex">
                        {
                        previousStarsSVG(review.stars)
                        }
                    </div>
                    <span className="text-light-f text-xs">({date.getDate()}/{date.getMonth()+1}/{date.getFullYear()})</span>
                </div>
            </div>
            <h3 className="text-secondary-f">&quot;{review.review}&quot;</h3>

    </aside>
 )
}

export default PreviousReview