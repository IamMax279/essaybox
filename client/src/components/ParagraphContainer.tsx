import DropdownOptions from "./DropdownOptions"

interface Props {
    order: string
    className?: string
}

export default function ParagraphContainer({ order, className }: Props) {
    return (
        <div className={`flex flex-col lg:w-[520px] md:w-[380px] w-4/5 min-w-[220px]
        ${className ? className : ""}`}
        >
            <p className="text-[#B7B7B7] mb-1">
                Akapit {order}
            </p>
            <div className="flex flex-col rounded-xl bg-[#2A2A2A] items-center">
                <DropdownOptions
                text="Argument"
                className='mt-5 bg-[#3B3B3B]'
                items={Array.of(
                    { key: "ai_generated", value: "AI generated" },
                    { key: "wlasny", value: "Własny" }
                )}
                mainItem='ai_generated'
                textStyles="px-4"
                buttonStyles="sm:w-[182px] w-[162px]"
                />
                <DropdownOptions
                text="Przykład"
                className='mt-5 bg-[#3B3B3B]'
                items={Array.of(
                    { key: "zakres_podstawowy", value: "Zakres Podstawowy" },
                    { key: "zakres_rozszerzony", value: "Zakres Rozszerzony" },
                    { key: "inne", value: "Inne" }
                )}
                mainItem='zakres_podstawowy'
                textStyles="px-4"
                buttonStyles="sm:w-[192px] w-[172px]"
                />
                <DropdownOptions
                text="Kontekst"
                className='my-5 bg-[#3B3B3B]'
                items={Array.of(
                    { key: "literacki", value: "Literacki" },
                    { key: "historyczny", value: "Historyczny" },
                    { key: "biograficzny", value: "Biograficzny" },
                    { key: "filozoficzny", value: "Filozoficzny" },
                    { key: "wlasny", value: "Własny" }
                )}
                mainItem='literacki'
                textStyles="px-4"
                buttonStyles="sm:w-[192px] w-[172px]"
                />
            </div>
        </div>
    )
}