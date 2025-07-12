import { ThreeDot } from "react-loading-indicators"

interface Props {
    text: string
    onPress: () => void
    className?: string
    loading?: boolean
}

export default function SmallButton({ text, onPress, className, loading }: Props) {
    return (
        <button
        className={`rounded-lg border border-neutral-700 bg-[#1E1E1E] h-10 w-40
        cursor-pointer hover:brightness-110 shadow-[0_1px_6px_0_#2f2f2f] transition-all
        duration-200 ease-in-out
        ${className ? className : ""}`}
        onClick={onPress}>
            {!loading ? 
            <p className="font-outfit">
                {text}
            </p>
            :
            <div className="py-[1px]">
                <ThreeDot color="#fff" size="small"/>
            </div>
            }
        </button>
    )
}