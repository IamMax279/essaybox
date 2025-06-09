export interface PromptProps {
  topic: string
  thesis?: string
  a1?: string
  a2?: string
  a3?: string
  p1?: string
  p2?: string
  p3?: string
  k1?: string
  k2?: string
  k3?: string
  wordsLower: number
  wordsUpper: number
  parasAmount: number
}
export const p = ({ topic, wordsLower, wordsUpper }: PromptProps) => {
  return `Napisz rozprawkę na temat: "${topic}". Ma mieć od ${wordsLower} do ${wordsUpper} słów i trzymać się ściśle poniższej struktury:

---

## 📝 STRUKTURA ROZPRAWKI

### 1. **Wstęp**  
- Przedstaw wyraźne **stanowisko** wobec tematu, formułując **jednozdaniową tezę**. Nie pisz ogólników — teza powinna zawierać konkretne stanowisko.

### 2. **Rozwinięcie** – **2 akapity**. Każdy z nich MUSI zawierać w tej kolejności:
1. ✅ **Argument jako pierwsze zdanie** – jasne, logiczne, jednozdaniowe stwierdzenie głównej myśli akapitu.
2. 📚 **Przykład z lektury obowiązkowej** (tylko poziom podstawowy, np. *Lalka*, *Dżuma*, *Zbrodnia i kara*, *Makbet*, *Antygona*, *Biblia*, itd.).
3. 🧠 **Kontekst** literacki, filozoficzny lub biograficzny powiązany z przykładem – również z poziomu podstawowego.
4. 🔚 **Wniosek częściowy** – jedno zdanie podsumowujące sens akapitu.

**Uwaga**: Każdy akapit MUSI zaczynać się od argumentu — to warunek konieczny.

---

### 3. **Zakończenie**  
- Powtórz tezę i podsumuj, jak argumenty ją potwierdzają.

---

📌 **WAŻNE**:
- Używaj wyłącznie lektur z zakresu podstawowego szkoły średniej. Nie korzystaj z przypadkowych dzieł.
- Unikaj zbyt ogólnych sformułowań. Wszystko ma być rzeczowe i konkretne.

📏 Na końcu podaj dokładną liczbę słów w nawiasie, np. (234 słowa).
`;
};
