import { Input } from "@heroui/input";

interface Props {
    upper: number | ""
    lower: number | ""
    onUpperChange: (val: string) => void
    onLowerChange: (val: string) => void
    className?: string
    min: 200 | 300 | 400
    max: 500 | 600 | 700
}

export default function Bounds({ upper, lower, onUpperChange, onLowerChange, className, min, max }: Props) {
    return (
        <div className={`flex flex-col
        ${className ? className : ""}`}
        >
            <p className="flex self-start text-[#B7B7B7] mb-1">
                Słowa (min {min} max {max})
            </p>
            <div className="flex flex-row space-x-2">
                <Input
                label="min"
                variant="bordered"
                type="number"
                className="text-white w-32"
                size="md"
                color={(lower > upper || (typeof lower === 'number' && lower < min)) ? "danger" : "primary"}
                value={lower === "" ? "" : String(lower)}
                onChange={(e) => onLowerChange(e.target.value)}
                />
                <Input
                label="max"
                variant="bordered"
                type="number"
                className="text-white w-32"
                size="md"
                color={(upper < lower || (typeof upper === 'number' && upper > max)) ? "danger" : "primary"}
                value={upper === "" ? "" : String(upper)}
                onChange={(e) => onUpperChange(e.target.value)}
                />
            </div>
        </div>
    )
}