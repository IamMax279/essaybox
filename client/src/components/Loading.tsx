import { ThreeDot } from "react-loading-indicators"

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <ThreeDot color="#000" size="small"/>
        </div>
    )
}