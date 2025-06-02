import { ThreeDot } from "react-loading-indicators"

interface Props {
    width: string
    onPress?: () => void
    text: string
    className?: string
    loading?: boolean
    shadow?: boolean
    type?: 'submit' | 'reset' | 'button' | undefined
}

export default function BigButton({ width, onPress, text, className, loading, type, shadow }: Props) {
    return (
        <button className={`flex justify-center items-center bg-bigbutton py-2 rounded-lg
        cursor-pointer hover:brightness-110 transition duration-200
        ${shadow ? "shadow-[0_2px_16px_0_#1157a6]" : ""}
        ${width}
        ${className ? className : ""}`}
        type={type ? type : undefined}
        onClick={onPress}
        disabled={loading}
        >
            {!loading ?
            <p className="font-heming text-lg text-white">
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