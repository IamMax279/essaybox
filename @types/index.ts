export interface RestResponse {
    success: boolean,
    message: string
}

export interface AIResponse extends RestResponse {
    essay: string
}

export interface ParagraphData {
    id: string
    argument: string
    customArgument: string
    przyklad: string
    customPrzyklad: string
    kontekst: string
    customKontekst: string
}

export interface GenerationParams {
    topic: string
    parasAmount: number
    parasData: ParagraphData[]
    thesisType: 'ai_generated' | 'wlasna'
    thesis: string
    lowerBound: number
    upperBound: number
}

export interface EssayData {
    title: string
    content: string
    urlIdentifier: string
}