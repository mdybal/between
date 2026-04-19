import { sessions } from './sessions'
import type { Session, Scene } from '@/types'

/**
 * Polish session text data.
 *
 * This file contains Polish translations of text fields (title, summary, scenes).
 * The non-text fields (id, sessionNumber, date, tags, npcIds) are stored in sessions.ts.
 */
export interface SessionText {
  id: string
  title: string
  summary: string
  scenes?: Scene[]
}

export const sessionsPl: SessionText[] = [
  {
    id: 'session-01',
    title: 'Lato w Rozkwicie',
    summary:
      'Tajemnicze morderstwo pokojówki na St. James Street. Wampir grasujący w dzielnicy Limehouse. Oraz tajemnicza Theodora Brathwaite, która oplata swoją siecią cały Londyn. Łowcy z Hargrave House muszą stawić czoła tym zagrożeniom, jednocześnie zmagając się z własnymi demonami i tajemnicami przeszłości.',
    scenes: [
      {
        label: 'Prolog',
        phase: 'Dawn',
        prose: [
          'W 1871 roku, w Londyn. Miasto monumentale, bogate, zatłoczone i brudne. W sercu Belgrave Square, w neogotyckiej rezydencji Hargrave, spokojne sobotnie przedpołudnie przerwał wir niezwykłych wydarzeń, wciągając jej ekscentrycznych mieszkańców w sieć tajemnic i zagrożeń.',
        ],
      },
      {
        label: 'Początek Dnia w Hargrave House',
        phase: 'Day',
        prose: [
          'Lord Richard, mężczyzna w dojrzałym wieku ponad trzydziestu lat, z bagażem ponad dekady spędzonej na afrykańskich wyprawach, oddawał się pisaniu pamiętników i szkicowaniu map. Ludwik, który choć utrzymuje, że jedynie wynajmuje pokój na poddaszu, od dawna współmieszka z towarzyszami, pisał kolejny z comiesięcznych, sfabrykowanych listów do swojej matki na Pomorzu, opisując rzekome studia medyczne w Royal College of Surgeons na Sloane Square.',
          'Tymczasem Singh, wróciwszy z targu ze sprawunkami, podniósł rzucony przez gazeciarza egzemplarz "Ilustrowanych Wiadomości Policyjnych" i położył ją na stoliczku w holu. W tej samej chwili George, duch dawno zmarłego Łowcy materializował się, wsró dymu i ognia. Widząc jego przybycie, wszyscy zrozumieli, że stało się coś ważnego. George, czując dziwną więź z jednym z artykułów, wskazał na trzecią stronę. Tabloid donosił o śmierci młodej pokojówki, Ginny Hess, znalezionej martwej „z przerażenia” w domu swoich pracodawców na St. James Street. Scotland Yard uznał to za śmierć z przyczyn naturalnych, ale artykuł sugerował nawiedzenie. Uwagę George\'a zwrócił fragment artykułu opisujacy fragment nadpalonej biblii znalezionej w zaciśniętej ręce Ginny. Łowcy postanowili zbadać sprawę i znaleźć sposób by odesłać ducha w zaświaty.',
        ],
      },
      {
        label: 'Śledztwo na St. James Street',
        phase: 'Day',
        prose: [
          'Lord Dick i Ludwik udali się na St. James Street 18. Na miejscu, przywitała ich kucharka, Irma Thicket - próbując jednocześnie uspokoić psa Pitagorasa. Ku zdzwieniu wszystkich, Ludwik momentalnie nawiązał więź ze zwierzęciem i uspokoił je samym spojrzeniem. Jednocześnie, młode mediu, zauważył zerwaną tapetę i serię numerów zapisanych na ścianie przy progu drzwi wejściowych.',
          'Tymczasem Singh udał się do miejskiego archiwum, by sprawdzić historię budynku. Dowiedział się, że dom należy do rodziny Beale’ów (Harolda, księgowego, jego żony Alice oraz dzieci: Rogera i Mary Alice) od niedawna. Beale’owie nabyli posiadłość po bardzo okazyjnej cenie, a poprzednia rodzina sprzedała go, gdy doszło do małżeńskiego skandalu. Singh odkrył również, że cały rząd kamienic na St. James Street, z wyjątkiem numeru 18, należy do tajemniczej Theodory Brathwaite.',
          'Lord Richard i Ludwik zostali wprowadzeni do saloniku przez kucharkę, Irmę. Tam Lord Richard, zauważył 7-8 letniego Rogera Bale’a. Chłopiec, ku zdziwieniu (i rozbawieniu) Lorda, wykrzyczał: „Jesteście tu, żeby zobaczyć jebanego ducha?!”. Za trzy pensy Roger zaoferował, że pokaże im, gdzie jest duch. Zaprowadził Lorda Richarda na klatkę schodową, w stronę kuchni, mówiąc, że duch najczęściej tam przebywa. Wskazał na zaciek na ścianie, nazywając go „ektoplazmą”. Lord Richard, stwierdził z rozczarowaniem, że to tylko zwykły zaciek.',
          'Wkrótce pojawiła się Alice Bale z małą Mary Alice na rękach. Opowiedziała, że Ginny Hess była opiekunką jej córki i została znaleziona martwa w pokoju dziecięcym, przy łóżeczku. Ludwik, udał się z Alice do pokoju dziecięcego na poddaszu. Tam, podczas gdy Alice układała Mary Alice do snu, Ludwik, używając rytuału krwi, spróbował zobaczyć okoliczności śmierci Ginny. Doświadczył przelotnego błysku, widząc Ginny i Mary Alice kłócące się w pokoju w nieznanym języku – tym samym, co w kołysance, którą Ludwik mimowolnie nucił wcześniej.',
          'George, w międzyczasie, odbył astralną podróż do St. James Street 18. Nie było łatwo odnaleźć mu ten dom, na szczęście obecność pozostałych Łowców pomogła mu nawigować przez pole astralne. Dostępu do pokoju Mary-Alice strzegły dziwnie zapieczętowane, duchowe drzwi. Ku swojej frustracji, tuż po tym jak udało mu się je sforsować, poczuł, że jakaś siła ściąga go z powrotem do Hargrave House. Gdy ocknął się w domu, zobaczył czarny powóz z niebieskim herbem wymalowanym na drzwiach. W środku siedziała czarnoskóra kobieta i... patrzyła prosto na niego!'
        ],
      },
      {
        label: 'Oranżeria w Hargrave House',
        phase: 'Night',
        prose: [
          'Oranżeria w Hargrave House była w przeszłości świadkiem przeraźliwych zbrodni dokonywanych przez jednego z byłych Łowców, Rogera "Łupieżcę". Roger zwabiał do oranżerii swoje ofiary, odurzał trującymi kwiatami, które tu hodował, po czym dokonywał na nich rytualnego mordu, wycinając jeszcze żywej ofierze język i oczy, jednocześnie intonując bluźniercze psalmy.',
        ],
        highlightBox: {
          variant: 'clue',
          title: 'Zdolność Łupieżcy',
          content:
            'Pierwszy raz, gdy zamordujesz Bohatera Niezależnego w Oranżerii w sposób Łupieżcy, usuń wszystkie swoje Stany, w tym Stany, których nie można usunąć w normalny sposób, a następnie zaznacz pierwsze pole poniżej. Od tej pory, za każdym razem gdy mordujesz kogoś z zimną krwią, zaznaczaj kolejne pole.',
          items: [
            'Zwiększ swoją Wrażliwość o 2 (max 3), gdy twój umysł otwiera się na nieskończone możliwości wszechświata, a następnie przyjmij Stan: Jam jest. Ten Stan nie może zostać usunięty.',
            'Zwiększ swój Rozum o 2 (max 3), gdy twój umysł staje się idealną siatką do organizowania i tropienia ofiar, a następnie przyjmij Stan: Roger. Ten Stan nie może zostać usunięty.',
            'Zwiększ swoją Witalność o 2 (max 3), gdy moc Łupieżcy przepływa przez ciebie. Opisz, jak twoje ciało zewnętrznie się zmienia, a następnie przyjmij Stan: Łupieżca. Ten Stan nie może zostać usunięty.'
          ]
        },
      },
      {
        label: 'Nocne śledztwo George\'a',
        phase: 'Night',
        prose: [
          'George nie próżnował w nocy, gdy pozostali Łowcy spali. Udał się po raz kolejny do domu Beale\'ów. Podróż przypłacił niemal (ponownie) życiem, gdy okazało się, że dom nawiedza nie jeden, a cała zgraja duchów! Odpędził jej jednak i nie niepokojony mógł zbadać każdy zakamarek domu. W pokoju Mary-Alice zobaczył dziwną łunę bijącą z jednego okien. Gdy przez nie wyjrzał zobaczył nie panoramę Londynu, ale wiejski dom stojący na wzgórzu, który trawiły płomienie!',
        ],
      },
      {
        label: 'Nowe Zagrożenie – Wampiry i Handel Opium',
        phase: 'Day',
        prose: [
          'Następnego dnia Singh, podczas zakupów na targu, spotkał Jenny Johnson (Chen Bao), przywódczynię lokalnej chińskiej diaspory i właścicielkę palarni opium. Jenny poprosiła o pomoc: w okolicy znaleziono trzy ciała, całkowicie pozbawione krwi, co wskazywało na nadprzyrodzone siły. Ofiary to męska prostytutka „Miękki Jimmy”, młoda matka Charla Bell i chiński marynarz.',
          'Singh, Ludwik i George (wciąż w postaci astralnej) udali się do palarnii w Limehouse. George został na parterze, a Singh i George udali się do piwnicym gdzie Jenny trzymała ciała. Blade, wysuszone, z nietypowymi ranami ciętymi zamiast typowych ukąszeń wampirów. Co więcej, wszystkim ofiarom brakowało obu kłów i jednej jedynki. George, badając ducha Jimmy’ego, odkrył, że jego ostatnią emocją był „nieszczery wstyd” związany z wyśmiewaniem starszego klienta z problemami z erekcją. Ludwik wywnioskował, że nietypowe rany wskazują na to, że wampir ma ciało dziecka - to czy jest młodym, czy starym wampirem nadal pozostaje do wyjaśnienia. Singh znalazł w piwnicy również księgi rachunkowe, które, choć zamaskowane jako sprzedaż jedzenia i innych produktów, w rzeczywistości dokumentowały handel opium. Wiele dużych zamówień było oznaczonych inicjałami „th”, co wskazywało na Theodrę Brathwaite!',
          'George\'a zaczepił tajemniczy mężczyzna w masce słońca, który najwyraźniej wiedział o medium więcej niż powinien. Ludwik odruchowo sięgnął do maski nieznajomego, ale w ostatniej chwili się powstrzymał - poczuł, że zdjęcie jej byłoby ekstremalnie niebezpieczne. Mężczyzna nie wydawał się poruszony - przeprosił Ludwika i powiedział (ewidentnie kłamiąc), że musi pozostać incognito ponieważ jest członkiem rodziny królewskiej. Wskazął jednak George\'owi Rudą Katherine, partnerkę Jimmy’ego.',
          'Katherine, ze łzami w oczach, opowiedziała Ludwikowi, że to ona odnalazła ciało Jimmy’ego. Wspomniała, że gdy zbliżała się do niego, widziała nad jego ciałem „spiralę z krwi” wiszącą w powietrzy. Gdy wskazała dokładne miejsce, gdzie była spirala, na jej dłoń kapnęła ciężka kropla krwi. Ludwik poczuł na policzku kolejną. Gdy spojrzał w góre, zobaczył niewielki cień, który wspiął się po belkach dachowych i uciekł w ciemność! Ludwik, postanowił odprawić rytuał, znacząc wejścia symbolami krwi, aby zabronić wampirowi wstępu do budynku.',
          'W międzyczasie George, namówił Singha by ten skorzystał z usług jednej z lokalnych prostytutek. Singh wynajął Grubą Bertę i (nie)świadomy tego, że duch jego pana podgląda całe zdarzenie, udał się z nią do pokoju na zapleczu. Prostytutka zdradziła sikhowi, że w dniu śmierci Jimmy’ego, do drzwi palarnii zapukał dziwny chłopiec. Podawał się za kuriera z wiadomością do jednego z gości i pytał czy może wejśc. Berta wpuściła go do środka, ale zdzwiił ją nietypowy akcent chłopca.'
        ],
      },
      {
        label: 'Wścibska sąsiadka spod St. James 17',
        phase: 'Day',
        prose: [
          'W tym czasie Lord Dick udał się znów do domu Beale\'ów - postanowił odkupić od Harolda jego psa. Nim zdażył wejść do środka, na chodniku zaczepiła go pani Constance Head, sąsiadka Beale\'ów. Powiedziała, że nie jest do końca zadowolona z nowego sąsiedztwa, ponieważ Beale\'owie nie pochodzą z żadnej zacnej rodziny i są znacząco mniej zamożni niż reszta mieszkańców ulicy, a to źle wpływa na postrzeganie okolicy. Lord Richard zaczał wypytywać kobietę o poprzednich właścicieli - gdy ta miała właśnie o nich opowiedzieć, nagle głos uwiązł jej w gardle i padła martwa na ziemię!',
          'Gdy na miejsce przybyła policja i ciało staruszki zostało zabrane do kostnicy, Richard udał się do Harolda - ten był zaskoczony ofertą sprzedaży rodzinnego psa, ale lord nie zakładał nawet, że jego oferta może nie zostać przyjęta. Załatwiwszy jedną sprawę, postanowił sprawdzić przy okazji, co Harold wie o poprzednich właścicielach. Niestety, Beale\'owie nie znali ich bezpośrednio, Harold pracuje dla kontrahenta byłego właściciela. Natomiast Lord Dick zauważył w księgach pana Beale\'a bardzo dziwne pozycje takie jak "łapacze snów", "podarki dla świń", czy "odlewy myśli". Mężczyzna wydawał się całkowicie nieświadomy tych zapisków. '
        ],
      },
      {
        label: 'Epilog',
        phase: 'Dusk',
        prose: [
          'Epilog W tle tych wszystkich wydarzeń, Teodora Brahway, postać już wcześniej zauważona przez George’a w karecie przed Hargrave House, przebywała w swojej rezydencji poza Londynem. Ciemnoskóra kobieta, po pięćdziesiątce, z szafirem na gardle, studiowała mapę Londynu, na której pineski w kształcie sztyletów znaczyły różne miejsca, w tym Hargrave House. Theodora, dopiła swój rum, podeszła do mapy i wbiła koleną pinezkę w sam środek Buckingham Palace, ujawniając swój ostateczny cel. Łowcy muszą dowiedzieć się jak Mistrzyni Zbrodni zamierza zniszczyć Koronę i powstrzymać ją za wszelką cenę!'
        ],
      },
    ],
  },
]

/**
 * Merges session base data with Polish text to produce full Session objects.
 */
export function getSessionsPl(): Session[] {
  return sessions.map((session) => {
    const text = sessionsPl.find((s) => s.id === session.id)
    if (!text) {
      throw new Error(`Missing Polish text for session: ${session.id}`)
    }
    return {
      ...session,
      title: text.title,
      summary: text.summary,
      scenes: text.scenes,
    }
  })
}