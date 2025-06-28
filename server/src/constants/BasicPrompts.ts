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
      W AKAPICIE ${idx + 1} I NIGDZIE INDZIEJ UŻYJ:
      ${para.customArgument ? `Argument: ${para.customArgument}` : undefined}
      ${para.customPrzyklad ? `Przykład: ${para.customPrzyklad}` : undefined}
      ${para.customKontekst ? `Kontekst: ${para.customKontekst}` : undefined}
    `).join('\n')
  }

  let test = ""
  if (parasData && parasData.length) {
    test = parasData.map((para, idx) => `
      W AKAPICE ${idx + 1} ZASTOSUJ:
      ${para.customArgument ? `UŻYJ ARGUMENTU: ${para.customArgument}` : "NAPISZ ARGUMENT"}
      ${para.customPrzyklad ? `UŻYJ PRZYKLADU: ${para.customPrzyklad}` : "NAPISZ PRZYKLAD"}
      ${para.customKontekst ? `UŻYJ KONTEKSTU: ${para.customKontekst}` : "NAPISZ KONTEKSTU"}
    `)
    .join('\n')
  }

  const paragraphs = []
  if (parasData && parasData.length) {
    for (let i = 0; i < parasData.length; i++) {
      const data = parasData[i]
      const instructions = `
      W AKAPICIE ${i + 1} ZASTOSUJ:
      NAJPIERW ${data.customArgument ? `UŻYJ ARGUMENTU: ${data.customArgument}` : "NAPISZ ARGUMENT"}
      POTEM ${data.customPrzyklad ? `UŻYJ PRZYKŁADU: ${data.customPrzyklad}. NAPISZ 3-4 ZDANIA` : `NAPISZ PRZYKŁAD ${data.customKontekst ? `NIE UŻYWAJĄC LEKTURY ${data.customKontekst}` : ""}. NAPISZ 3-4 ZDANIA.`}
      I NA KONIEC ${data.customKontekst ? `UŻYJ KONTEKSTU: ${data.customKontekst}. NAPISZ 3-4 ZDANIA` : "NAPISZ KONTEKST (3-4 ZDANIA)"}
      `
      paragraphs.push(instructions)
    }
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

UWAGA: KAŻDY AKAPIT MA SKŁADAĆ SIĘ Z POWYŻSZYCH ELEMENTÓW W NASTĘPUJĄCEJ KOLEJNOŚCI:
- ARGUMENT
- PRZYKŁAD
- KONTEKST
- WNIOSEK CZĘŚCIOWY

Uwaga: Każdy akapit MUSI zaczynać się od argumentu — to warunek konieczny.

---

3. Zakończenie
- Powtórz tezę i podsumuj, jak argumenty ją potwierdzają.

---

WAŻNE:
- Unikaj zbyt ogólnych sformułowań. Wszystko ma być rzeczowe i konkretne.
- Nie używaj symboli typu * lub #

Wzoruj się na tej rozprawce:
📝 Rozprawka: Jak relacja z drugą osobą kształtuje człowieka?
Wstęp)
Relacje z innymi ludźmi mają ogromny wpływ na nasze życie, postawy i wybory. To dzięki nim uczymy się empatii, odpowiedzialności, a także kształtujemy system wartości. Uważam, że relacja z drugą osobą ma fundamentalne znaczenie w kształtowaniu człowieka – wpływa na jego charakter, decyzje i rozwój wewnętrzny.

${
  parasData?.length === 1 ?
  `Akapit 1)
  Bliska relacja może prowadzić do przemiany duchowej i moralnej. W Małym Księciu Antoine’a de Saint-Exupéry’ego tytułowy bohater spotyka lisa, który uczy go, że „oswoić” to „stworzyć więzi”. Kiedy lis mówi: „Stajesz się odpowiedzialny za to, co oswoiłeś”, Mały Książę rozumie, że miłość do róży czyni ją wyjątkową. Ta relacja otwiera go na pojęcie odpowiedzialności i troski. Podobnie w Opowieści wigilijnej Charlesa Dickensa przemienia się Ebenezer Scrooge. Pod wpływem duchów i wizji przyszłości uświadamia sobie, że jego życie było puste bez relacji z innymi. Scena ukazująca chorego Tiny’ego Tima oraz przyszłą samotną śmierć Scrooge’a staje się punktem zwrotnym – prowadzi do otwarcia serca na innych. Oba przykłady pokazują, że relacje mogą uczyć empatii i zmieniać sposób postrzegania świata.
  `
  :
  parasData?.length === 2 ?
  `
  Akapit 1)
  Bliska relacja może prowadzić do przemiany duchowej i moralnej. W Małym Księciu Antoine’a de Saint-Exupéry’ego tytułowy bohater spotyka lisa, który uczy go, że „oswoić” to „stworzyć więzi”. Kiedy lis mówi: „Stajesz się odpowiedzialny za to, co oswoiłeś”, Mały Książę rozumie, że miłość do róży czyni ją wyjątkową. Ta relacja otwiera go na pojęcie odpowiedzialności i troski. Podobnie w Opowieści wigilijnej Charlesa Dickensa przemienia się Ebenezer Scrooge. Pod wpływem duchów i wizji przyszłości uświadamia sobie, że jego życie było puste bez relacji z innymi. Scena ukazująca chorego Tiny’ego Tima oraz przyszłą samotną śmierć Scrooge’a staje się punktem zwrotnym – prowadzi do otwarcia serca na innych. Oba przykłady pokazują, że relacje mogą uczyć empatii i zmieniać sposób postrzegania świata.

  Akapit 2)
  Nie każda relacja rozwija – niektóre prowadzą do cierpienia, ale to także kształtuje człowieka. W Cierpieniach młodego Wertera Goethego bohater zakochuje się w Lotcie, która jest zaręczona z innym. Werter nie potrafi pogodzić się z sytuacją i pogrąża się w rozpaczy, co prowadzi do samobójstwa. Jego doświadczenie ukazuje, jak silny wpływ emocje i relacje mają na psychikę i tożsamość człowieka. Z kolei w Zielu na kraterze Melchiora Wańkowicza widzimy ojcowską więź wystawioną na próbę przez wojnę. Listy córki Krysi z Armii Andersa ukazują głęboką tęsknotę i troskę mimo rozłąki. Choć trudna, relacja ta zostaje wzmocniona, pokazując, że nawet ból może pogłębić miłość i odpowiedzialność.
  `
  :
  `
  Akapit 1)
  Bliska relacja może prowadzić do przemiany duchowej i moralnej. W Małym Księciu Antoine’a de Saint-Exupéry’ego tytułowy bohater spotyka lisa, który uczy go, że „oswoić” to „stworzyć więzi”. Kiedy lis mówi: „Stajesz się odpowiedzialny za to, co oswoiłeś”, Mały Książę rozumie, że miłość do róży czyni ją wyjątkową. Ta relacja otwiera go na pojęcie odpowiedzialności i troski. Podobnie w Opowieści wigilijnej Charlesa Dickensa przemienia się Ebenezer Scrooge. Pod wpływem duchów i wizji przyszłości uświadamia sobie, że jego życie było puste bez relacji z innymi. Scena ukazująca chorego Tiny’ego Tima oraz przyszłą samotną śmierć Scrooge’a staje się punktem zwrotnym – prowadzi do otwarcia serca na innych. Oba przykłady pokazują, że relacje mogą uczyć empatii i zmieniać sposób postrzegania świata.

  Akapit 2)
  Nie każda relacja rozwija – niektóre prowadzą do cierpienia, ale to także kształtuje człowieka. W Cierpieniach młodego Wertera Goethego bohater zakochuje się w Lotcie, która jest zaręczona z innym. Werter nie potrafi pogodzić się z sytuacją i pogrąża się w rozpaczy, co prowadzi do samobójstwa. Jego doświadczenie ukazuje, jak silny wpływ emocje i relacje mają na psychikę i tożsamość człowieka. Z kolei w Zielu na kraterze Melchiora Wańkowicza widzimy ojcowską więź wystawioną na próbę przez wojnę. Listy córki Krysi z Armii Andersa ukazują głęboką tęsknotę i troskę mimo rozłąki. Choć trudna, relacja ta zostaje wzmocniona, pokazując, że nawet ból może pogłębić miłość i odpowiedzialność.

  Akapit 3)
  Relacje często ujawniają nasze wartości i wpływają na postawy moralne. W Medalionach Nałkowskiej, opisujących okrucieństwa wojny, szczególnie porusza scena, gdy więźniarka dzieli się chlebem z inną kobietą – mimo głodu zachowuje człowieczeństwo. W innych relacjach widzimy zdradę i bierność, co pokazuje, jak ekstremalne warunki obnażają naturę człowieka. Z kolei w Syzyfowych pracach Żeromskiego przemiana Marcina Borowicza następuje dzięki przyjaźni z Andrzejem Radkiem i kontaktowi z polską literaturą. Szczególnie ważna jest scena, gdy uczniowie słuchają recytacji Reduty Ordona – to moment przebudzenia narodowego ducha. Oba utwory dowodzą, że dzięki relacjom z innymi człowiek potrafi odnaleźć własne wartości.
  `
}

Zakończenie)
Relacje z innymi ludźmi odgrywają ogromną rolę w naszym życiu – mogą pomóc w zmianie na lepsze, jak w przypadku Raskolnikowa, albo doprowadzić do cierpienia, co pokazują losy Wokulskiego i Makbeta. Dzięki takim doświadczeniom człowiek dojrzewa, uczy się czego unikać, co naprawdę ważne, i zaczyna lepiej rozumieć siebie oraz innych.

WAŻNE: Argumenty mają być różne - nie powtarzaj argumentu, którego już użyłeś,
nawet jeśli jest sformułowany innymi słowami.
WAŻNE: Unikaj fraz typu "Kontekstem może być...", zamiast tego pisz coś w stylu "Podobna sytuacja ukazana jest w..."
WAŻNE: Nie pisz na końcu ile słów ma rozprawka.
BARDZO WAŻNE: UWZGLĘDNIAJ JAK NAJWIĘCEJ TREŚCI Z UŻYTYCH LEKTUR (na przykład nazwy postaci). 
ZADBAJ O TO ABY POJAWIAŁO SIĘ W NICH JAK NAWIĘCEJ IMION BOHATERÓW
BARDZO WAŻNE: UPEWNIJ SIĘ, ŻE ROZRPAWKA MA OD ${wordsLower} DO ${wordsUpper} SŁÓW.
BARDZO WAŻNE: NIE UŻYWAJ DWA RAZY LEKTURY, KTÓREJ JUŻ UŻYŁEŚ
BARDZO WAŻNE: PRZED GENEROWANIEM KAŻDEGO AKAPITU PRZECZYTAJ JEGO WYTYCZNE:\n${paragraphs}\n
BARDZO WAŻNE: Jeśli zamienisz kolejność lektur lub użyjesz ich w innym akapicie niż wskazano, odpowiedź jest niepoprawna i należy ją napisać od nowa.
`;
};