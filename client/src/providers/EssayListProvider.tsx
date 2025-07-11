import React, { createContext, useContext } from "react";
import type { EssayData } from "../../../@types";

export interface EssayListContextType {
    essays: EssayData[]
    setEssays: React.Dispatch<React.SetStateAction<EssayData[]>>
    //call this to update essays, don't expect a return value - hence void
    refetchEssays: () => void
}

export const EssayListContext = createContext<EssayListContextType | undefined>(undefined)

export function useEssayList() {
    const context = useContext(EssayListContext)
    if (!context) throw new Error("useEssaySidebar must be used within EssayListContext.Provider")
    return context
}