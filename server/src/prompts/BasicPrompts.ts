interface PromptProps {
    topic: string
    a1?: string
    a2?: string
    p1?: string
    p2?: string
    k1?: string
    k2?: string
    wordsLower: number
    wordsUpper: number
}

export const p = ({ topic, wordsLower, wordsUpper }: PromptProps) => {
  return `Napisz rozprawkę na temat: "${topic}". Zastosuj następujący układ:

1. Wstęp - sformułuj tezę oraz przedstaw stanowisko.
2. Rozwinięcie - napisz dwa akapity. Każdy akapit ma zawierać (w tej kolejności):
   - wyraźnie sformułowany argument (pełne zdanie logiczne),
   - przykład z lektury obowiązkowej (z zakresu podstawowego),
   - kontekst (literacki, filozoficzny lub biograficzny),
   - wniosek częściowy.
3. Zakończenie - podsumuj główną myśl i powtórz tezę.

Rozprawka ma liczyć od ${wordsLower} do ${wordsUpper} słów. Na końcu dopisz liczbę słów.`;
}