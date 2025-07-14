"use client"

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem 
} from "@heroui/dropdown";
import { SharedSelection } from "@heroui/system";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface Props {
    text: string
    className?: string
    items: {
        key: string
        value: string 
    }[]
    mainItem: string
    textStyles?: string
    buttonStyles?: string
    onChange?: (key: string) => void
}

export default function DropdownOptions({ text, className, items, mainItem, textStyles, buttonStyles, onChange }: Props) {
    const [selected, setSelected] = useState<any>(new Set([mainItem]))

    const selectedKey = Array.from(selected)[0] // tu i tak tylko 1 element
    const selectedValue = items.find(item => item.key === selectedKey)?.value ?? "";

    const handleSelectionChange = (keys: SharedSelection) => {
        setSelected(keys)
        const key = Array.from(keys)[0]
        if (onChange) {
            onChange(key as string)
        }
    }

    return (
        <div className={`inline-flex flex-row items-center rounded-xl h-10 bg-[#2A2A2A]
        w-fit
        ${className ? className : ""}`}>
            <p className={`text-white ${textStyles ? textStyles : ""}`}>
                {text}
            </p>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                    variant="flat"
                    className={`capitalize text-white rounded-xl bg-dropdown font-outfit
                    text-lg 
                    ${buttonStyles ? buttonStyles : ""}`}
                    >
                    {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selected}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={handleSelectionChange}
                >
                    {items.map((item) => (
                        <DropdownItem
                        key={item.key}
                        className="text-lg font-outfit">
                            {item.value}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}