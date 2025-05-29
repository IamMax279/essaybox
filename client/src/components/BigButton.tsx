interface Props {
    width: string
    onPress: () => void
    text: string
    className?: string
}

export default function BigButton({ width, onPress, text, className }: Props) {
    return (
        <button className={`flex justify-center items-center bg-bigbutton py-2 rounded-lg
        cursor-pointer hover:brightness-110 transition duration-200
        ${width}
        ${className ? className : ""}`} onClick={onPress}>
            <p className="font-heming text-lg text-white">
                {text}
            </p>
        </button>
    )
}