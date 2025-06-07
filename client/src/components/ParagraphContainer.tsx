import DropdownOptions from "./DropdownOptions"

interface ParagraphValues {
    argument: string
    customArgument?: string
    przyklad: string
    customPrzyklad?: string
    kontekst: string
    customKontekst?: string
}

interface Props {
    order: string
    className?: string
    values: ParagraphValues,
    onChange: (updated: Partial<ParagraphValues>) => void
}

export default function ParagraphContainer({ order, className, values, onChange }: Props) {
    return (
        <div className={`flex flex-col lg:w-[520px] md:w-[380px] w-4/5 min-w-[300px]
        ${className ? className : ""}`}
        >
            <p className="text-[#B7B7B7] mb-1">
                Akapit {order}
            </p>
            <div className="flex flex-col rounded-xl bg-[#2A2A2A]/60 items-center
            border border-white/20 shadow-[0_2px_16px_0_#121212] backdrop-blur-xl">
                <DropdownOptions
                text="Argument"
                className='mt-5 bg-[#3B3B3B]'
                items={Array.of(
                    { key: "ai_generated", value: "AI generated" },
                    { key: "wlasny", value: "Własny" }
                )}
                mainItem={values.argument}
                textStyles="px-4"
                buttonStyles="sm:w-[182px] w-[162px]"
                onChange={key => onChange({ argument: key })}
                />
                {values.argument === "wlasny" && (
                <input
                type="text"
                className="mt-2 p-2 bg-[#3b3b3b] text-white rounded-lg
                outline-none sm:w-[286px] w-[266px]"
                placeholder="Wpisz własny argument..."
                value={values.customArgument || ""}
                onChange={e => onChange({ customArgument: e.target.value })}
                />
                )}
                <DropdownOptions
                text="Przykład"
                className='mt-5 bg-[#3B3B3B]'
                items={Array.of(
                    { key: "zakres_podstawowy", value: "Zakres Podstawowy" },
                    { key: "zakres_rozszerzony", value: "Zakres Rozszerzony" },
                    { key: "inne", value: "Inne" }
                )}
                mainItem={values.przyklad}
                textStyles="px-4"
                buttonStyles="sm:w-[192px] w-[172px]"
                onChange={key => onChange({ przyklad: key })}
                />
                {values.przyklad === "inne" && (
                <input
                type="text"
                className="mt-2 p-2 bg-[#3b3b3b] text-white rounded-lg
                outline-none sm:w-[286px] w-[266px]"
                placeholder="Wpisz tytuł utworu..."
                value={values.customPrzyklad || ""}
                onChange={e => onChange({ customPrzyklad: e.target.value })}
                />
                )}
                <DropdownOptions
                text="Kontekst"
                className={`${values.kontekst !== "wlasny" ? "my-5" : "mt-5"} bg-[#3B3B3B] `}
                items={Array.of(
                    { key: "literacki", value: "Literacki" },
                    { key: "historyczny", value: "Historyczny" },
                    { key: "biograficzny", value: "Biograficzny" },
                    { key: "filozoficzny", value: "Filozoficzny" },
                    { key: "wlasny", value: "Własny" }
                )}
                mainItem={values.kontekst}
                textStyles="px-4"
                buttonStyles="sm:w-[192px] w-[172px]"
                onChange={key => onChange({ kontekst: key })}
                />
                {values.kontekst === "wlasny" && (
                <input
                type="text"
                className="mt-2 mb-5 p-2 bg-[#3b3b3b] text-white rounded-lg
                outline-none sm:w-[286px] w-[266px]"
                placeholder="Wpisz tytuł utworu..."
                value={values.customKontekst || ""}
                onChange={e => onChange({ customKontekst: e.target.value })}
                />
                )}
            </div>
        </div>
    )
}