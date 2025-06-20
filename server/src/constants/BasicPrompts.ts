import { ParagraphData } from "../../../@types"

export interface PromptProps {
  topic: string
  thesis?: string
  parasData?: ParagraphData[]
  wordsLower: number
  wordsUpper: number
  parasAmount: number
}
export const p = ({ 
  topic,
  thesis,
  wordsLower,
  wordsUpper,
  parasAmount,
  parasData
}: PromptProps) => {
  let rozwiniecie = ""
  if (parasData && parasData.length) {
    rozwiniecie = parasData.map((para, idx) => `
      Akapit ${idx + 1})
      ${para.customArgument ? `Argument: ${para.customArgument}` : undefined}
      ${para.customPrzyklad ? `Przyklad: ${para.customPrzyklad}` : undefined}
      ${para.customKontekst ? `Kontekst: ${para.customKontekst}` : undefined}
    `).join('\n')
  }

  return `Napisz rozprawkę na temat: "${topic}". Ma mieć od ${wordsLower} do ${wordsUpper} słów i trzymać się ściśle poniższej struktury:

---

📝 STRUKTURA ROZPRAWKI

1. Wstęp  
- Przedstaw wyraźne stanowisko (2-3 zdania) wobec tematu, ${thesis ? `korzystając z tej tezy: ${thesis}` : "formułując jednozdaniową tezę. Nie pisz ogólników — teza powinna zawierać konkretne stanowisko."}

2. Rozwinięcie – ${parasAmount === 1 ? "1 akapit. MUSI być w tej kolejności:" : `${parasAmount} akapity. Każdy z nich MUSI być w tej kolejności:`}
1. Argument jako pierwsze zdanie – jasne, logiczne, jednozdaniowe stwierdzenie głównej myśli akapitu.
2. Przykład z lektury obowiązkowej z zakresu podstawowego - 
Zakres podstawowy:
Biblia, w tym fragmenty Księgi Rodzaju, Księgi Hioba, Księgi Koheleta, Księgi Psalmów,
Apokalipsy św. Jana
Jan Parandowski, Mitologia, cz. I Grecja
Homer, Iliada (fragmenty)
Sofokles, Antygona
Lament świętokrzyski (fragmenty)
Rozmowa Mistrza Polikarpa ze Śmiercią (fragmenty)
Pieśń o Rolandzie (fragmenty)
William Szekspir, Makbet
Molier, Skąpiec
Ignacy Krasicki, wybrana satyra
Adam Mickiewicz, wybrane ballady, w tym Romantyczność, Dziady cz. III
Bolesław Prus, Lalka
Henryk Sienkiewicz, Potop (fragmenty)
Fiodor Dostojewski, Zbrodnia i kara
Stanisław Wyspiański, Wesele
Władysław Stanisław Reymont, Chłopi (fragmenty)
Stefan Żeromski, Przedwiośnie
Witold Gombrowicz, Ferdydurke (fragmenty)
Tadeusz Borowski, Proszę państwa do gazu
Gustaw Herling-Grudziński, Inny świat (fragmenty)
Hanna Krall, Zdążyć przed Panem Bogiem
Albert Camus, Dżuma
George Orwell, Rok 1984
Sławomir Mrożek, Tango
Marek Nowakowski, Górą „Edek” (z tomu Prawo prerii)
Andrzej Stasiuk, Miejsce (z tomu Opowieści galicyjskie)
Olga Tokarczuk, Profesor Andrews w Warszawie (z tomu Gra na wielu bębenkach)
Ryszard Kapuściński, Podróże z Herodotem (fragmenty)
Ponadto z zakresu szkoły podstawowej
Ignacy Krasicki, bajki
Adam Mickiewicz, Dziady cz. II, Pan Tadeusz (księgi: I, II, IV, X, XI, XII)
Aleksander Fredro, Zemsta
Juliusz Słowacki, Balladyna
Ma on zawierać 3-4 zdania w których przywołana jest konkretna sytuacja z wybranej lektury, A NIE OGÓLNA OCENA SYTUACJI DANEJ POSTACI.
Podawaj wyłącznie fakty zgodne z lekturami szkolnymi.
3. Kontekst literacki, filozoficzny lub biograficzny powiązany z przykładem – ma on zawierać 3-4 zdania w których przywołana jest konkretna sytuacja z wybranej lektury, wydarzenia historycznego lub przesłanie filozofii
(kontekst - dodatkowe informacje, odniesienia lub przykłady, które pomagają zrozumieć i interpretować omawiany temat, wzbogacają argumentację oraz pogłębiają analizę).
4. Wniosek częściowy – dwa zdania podsumowujące sens akapitu.

Uwaga: Każdy akapit MUSI zaczynać się od argumentu — to warunek konieczny.

---

3. Zakończenie
- Powtórz tezę i podsumuj, jak argumenty ją potwierdzają.

---

WAŻNE:
- Unikaj zbyt ogólnych sformułowań. Wszystko ma być rzeczowe i konkretne.
- Nie używaj symboli typu * lub #

${rozwiniecie ? `Zastosuj się do podanych danych: ${rozwiniecie}` : ""}

Wzoruj się na tej rozprawce:
📝 Rozprawka: Jak relacja z drugą osobą kształtuje człowieka?
Wstęp)
Relacje z innymi ludźmi mają ogromny wpływ na nasze życie, postawy i wybory. To dzięki nim uczymy się empatii, odpowiedzialności, a także kształtujemy system wartości. Uważam, że relacja z drugą osobą ma fundamentalne znaczenie w kształtowaniu człowieka – wpływa na jego charakter, decyzje i rozwój wewnętrzny.

Akapit 1)
Bliska relacja z drugim człowiekiem może być źródłem przemiany moralnej i duchowej.
W Zbrodni i karze Fiodora Dostojewskiego kluczową rolę w przemianie głównego bohatera, Rodiona Raskolnikowa, odgrywa Sonia – prosta, wierząca dziewczyna, która mimo własnych dramatów okazuje mu współczucie i zrozumienie. Dzięki relacji z nią Raskolnikow przechodzi od stanu wyobcowania i pychy do pokory i skruchy – to właśnie Sonia staje się przewodnikiem w jego duchowym odrodzeniu. Jej obecność skłania go do przyznania się do winy i odbycia kary, co prowadzi do jego moralnego oczyszczenia.
Podobny motyw odnajdujemy w Biblii, w relacji Jezusa z Marią Magdaleną. Choć kobieta była potępiana przez społeczeństwo, Jezus okazał jej akceptację i przebaczenie, co doprowadziło do jej duchowej przemiany. Jego postawa pokazuje, że miłość, wyrozumiałość i bliskość mogą wyzwalać w człowieku dobro i prowadzić go ku lepszej wersji siebie.
Obie relacje – Soni z Raskolnikowem i Jezusa z Marią Magdaleną – pokazują, że bliskość z drugim człowiekiem może być impulsem do wewnętrznej przemiany i odkrycia prawdziwych wartości.

Akapit 2)
Relacja z drugą osobą może też prowadzić do cierpienia i rozczarowania, ale mimo to kształtuje dojrzałość emocjonalną człowieka.
W Lalce Bolesława Prusa relacja Stanisława Wokulskiego z Izabelą Łęcką wywarła ogromny wpływ na jego życie. Zakochany bezgranicznie w arystokratce, idealizował ją i podporządkował jej swoje działania. Gdy odkrył jej płytkość i brak uczuć, przeżył głębokie rozczarowanie. Mimo tego doświadczenia, relacja ta zmusiła go do refleksji nad sensem własnych działań i miejscem w społeczeństwie.
Podobna sytuacja ma miejsce w Makbecie Williama Szekspira – tytułowy bohater pod wpływem żony, Lady Makbet, dokonuje zbrodni, co prowadzi go do szaleństwa i zguby. Ich relacja oparta była na ambicji i manipulacji, co pokazuje, że wpływ drugiej osoby może być także destrukcyjny.
Zarówno Wokulski, jak i Makbet, ponoszą konsekwencje relacji, w które się zaangażowali, ale doświadczenia te prowadzą ich do wewnętrznego przełomu, choć o zupełnie różnym charakterze.

Zakończenie)
Relacja z drugim człowiekiem potrafi kształtować osobowość, wpływać na wybory moralne i emocjonalne dojrzewanie. Teza, że relacje mają ogromny wpływ na rozwój człowieka, została potwierdzona przez losy bohaterów Zbrodni i kary, Lalki oraz Makbeta.

WAŻNE: Argumenty mają być różne - nie powtarzaj argumentu, którego już użyłeś,
nawet jeśli jest sformułowany innymi słowami.
WAŻNE: Unikaj fraz typu "Kontekstem może być...", zamiast tego pisz coś w stylu "Podobna sytuacja ukazana jest w..."
WAŻNE: Nie pisz na końcu ile słów ma rozprawka.
BARDZO WAŻNE: UWZGLĘDNIAJ JAK NAJWIĘCEJ TREŚCI Z UŻYTYCH LEKTUR (na przykład nazwy postaci). 
ZADBAJ O TO ABY POJAWIAŁO SIĘ W NICH JAK NAWIĘCEJ IMION BOHATERÓW
BARDZO WAŻNE: UPEWNIJ SIĘ, ŻE ROZRPAWKA MA OD ${wordsLower} DO ${wordsUpper} SŁÓW.
`;
};
