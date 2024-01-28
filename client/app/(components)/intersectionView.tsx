"use client"

import { InView } from "react-intersection-observer"

export default function IntersectionView({
        children,
        classNameInView,
        classNameNotInView,
        threshold,
        key,
    }: {
        children: React.ReactNode
        classNameInView?: string
        classNameNotInView?: string
        threshold?:number
        key:string
    }) {
        
    return (
        <InView triggerOnce threshold={threshold ? threshold : 0.8}>
            {({ inView, ref, entry }) => (

            <div
                key={key}
                ref={ref}
                className={inView ? classNameInView : classNameNotInView}
            >
                {children}
            </div>
            )}
        </InView>
    )
}