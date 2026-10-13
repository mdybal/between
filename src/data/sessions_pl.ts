import { sessions } from './sessions'
import type { Session, Scene, HtmlString } from '@/types'

/**
 * Polish session text data.
 *
 * This file contains Polish translations of text fields (title, summary, scenes).
 * The non-text fields (id, sessionNumber, date, tags, npcIds) are stored in sessions.ts.
 *
 * HTML support
 * ------------
 * All translatable text fields on a `Session` / `Scene` (i.e. `summary`,
 * `scenes[].prose`, `scenes[].pullQuote.text`, `scenes[].highlightBox.title`,
 * `scenes[].highlightBox.content`, `scenes[].highlightBox.items`) are typed
 * as `HtmlString`. They may therefore contain a small, safe subset of HTML
 * (e.g. `<br>`, `<em>`, `<strong>`, `<ul>` / `<li>`) which the renderer
 * consumes via `dangerouslySetInnerHTML` so the tags take effect.
 *
 * Plain text still works the same as before — only when a tag is present
 * will the renderer honour it.
 */
export interface SessionText {
  id: string
  title: string
  summary: HtmlString
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
          'Lord Richard, mężczyzna w dojrzałym wieku ponad trzydziestu lat, z bagażem ponad dekady spędzonej na afrykańskich wyprawach, oddawał się pisaniu pamiętników i szkicowaniu map. Ludwig, który choć utrzymuje, że jedynie wynajmuje pokój na poddaszu, od dawna współmieszka z towarzyszami, pisał kolejny z comiesięcznych, sfabrykowanych listów do swojej matki na Pomorzu, opisując rzekome studia medyczne w Royal College of Surgeons na Sloane Square.',
          'Tymczasem Singh, wróciwszy z targu ze sprawunkami, podniósł rzucony przez gazeciarza egzemplarz "Ilustrowanych Wiadomości Policyjnych" i położył ją na stoliczku w holu. W tej samej chwili George, duch dawno zmarłego Łowcy materializował się, wsró dymu i ognia. Widząc jego przybycie, wszyscy zrozumieli, że stało się coś ważnego. George, czując dziwną więź z jednym z artykułów, wskazał na trzecią stronę. Tabloid donosił o śmierci młodej pokojówki, Ginny Hess, znalezionej martwej „z przerażenia” w domu swoich pracodawców na St. James Street. Scotland Yard uznał to za śmierć z przyczyn naturalnych, ale artykuł sugerował nawiedzenie. Uwagę George\'a zwrócił fragment artykułu opisujacy fragment nadpalonej biblii znalezionej w zaciśniętej ręce Ginny. Łowcy postanowili zbadać sprawę i znaleźć sposób by odesłać ducha w zaświaty.',
        ],
      },
      {
        label: 'Śledztwo na St. James Street',
        phase: 'Day',
        prose: [
          'Lord Dick i Ludwig udali się na St. James Street 18. Na miejscu, przywitała ich kucharka, Irma Thicket - próbując jednocześnie uspokoić psa Pitagorasa. Ku zdzwieniu wszystkich, Ludwig momentalnie nawiązał więź ze zwierzęciem i uspokoił je samym spojrzeniem. Jednocześnie, młode mediu, zauważył zerwaną tapetę i serię numerów zapisanych na ścianie przy progu drzwi wejściowych.',
          'Tymczasem Singh udał się do miejskiego archiwum, by sprawdzić historię budynku. Dowiedział się, że dom należy do rodziny Beale’ów (Harolda, księgowego, jego żony Alice oraz dzieci: Rogera i Mary Alice) od niedawna. Beale’owie nabyli posiadłość po bardzo okazyjnej cenie, a poprzednia rodzina sprzedała go, gdy doszło do małżeńskiego skandalu. Singh odkrył również, że cały rząd kamienic na St. James Street, z wyjątkiem numeru 18, należy do tajemniczej Theodory Brathwaite.',
          'Lord Richard i Ludwig zostali wprowadzeni do saloniku przez kucharkę, Irmę. Tam Lord Richard, zauważył 7-8 letniego Rogera Bale’a. Chłopiec, ku zdziwieniu (i rozbawieniu) Lorda, wykrzyczał: „Jesteście tu, żeby zobaczyć jebanego ducha?!”. Za trzy pensy Roger zaoferował, że pokaże im, gdzie jest duch. Zaprowadził Lorda Richarda na klatkę schodową, w stronę kuchni, mówiąc, że duch najczęściej tam przebywa. Wskazał na zaciek na ścianie, nazywając go „ektoplazmą”. Lord Richard, stwierdził z rozczarowaniem, że to tylko zwykły zaciek.',
          'Wkrótce pojawiła się Alice Bale z małą Mary Alice na rękach. Opowiedziała, że Ginny Hess była opiekunką jej córki i została znaleziona martwa w pokoju dziecięcym, przy łóżeczku. Ludwig, udał się z Alice do pokoju dziecięcego na poddaszu. Tam, podczas gdy Alice układała Mary Alice do snu, Ludwig, używając rytuału krwi, spróbował zobaczyć okoliczności śmierci Ginny. Doświadczył przelotnego błysku, widząc Ginny i Mary Alice kłócące się w pokoju w nieznanym języku – tym samym, co w kołysance, którą Ludwig mimowolnie nucił wcześniej.',
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
          'Singh, Ludwig i George (wciąż w postaci astralnej) udali się do palarnii w Limehouse. Ludwig został na parterze, a Singh i George udali się do piwnicym gdzie Jenny trzymała ciała. Blade, wysuszone, z nietypowymi ranami ciętymi zamiast typowych ukąszeń wampirów. Na postawie ran, Łowcy wywnioskowali, że mają do czynienia z wampirem o ciele dziecka - to czy jest młodym, czy starym wampirem nadal pozostaje do wyjaśnienia. Co więcej, wszystkim ofiarom brakowało obu kłów i jednej jedynki. George, badając ducha Jimmy’ego, odkrył, że jego ostatnią emocją był „nieszczery wstyd” związany z wyśmiewaniem starszego klienta z problemami z erekcją. Singh znalazł w piwnicy również księgi rachunkowe, które, choć zamaskowane jako sprzedaż jedzenia i innych produktów, w rzeczywistości dokumentowały handel opium. Wiele dużych zamówień było oznaczonych inicjałami „th”, co wskazywało na Theodrę Brathwaite!',
          'W głównej sali palarnii, Ludwiga\'a zaczepił tajemniczy mężczyzna w masce słońca, który najwyraźniej wiedział o medium więcej niż powinien. Ludwig odruchowo sięgnął do maski nieznajomego, ale w ostatniej chwili się powstrzymał - poczuł, że zdjęcie jej byłoby ekstremalnie niebezpieczne. Mężczyzna nie wydawał się poruszony - przeprosił Ludwiga i powiedział (ewidentnie kłamiąc), że musi pozostać incognito ponieważ jest członkiem rodziny królewskiej. Wskazął jednak George\'owi Rudą Katherine, partnerkę Jimmy’ego.',
          'Katherine, ze łzami w oczach, opowiedziała Ludwigowi, że to ona odnalazła ciało Jimmy’ego. Wspomniała, że gdy zbliżała się do niego, widziała nad jego ciałem „spiralę z krwi” wiszącą w powietrzy. Gdy wskazała dokładne miejsce, gdzie była spirala, na jej dłoń kapnęła ciężka kropla krwi. Ludwig poczuł na policzku kolejną. Gdy spojrzał w góre, zobaczył niewielki cień, który wspiął się po belkach dachowych i uciekł w ciemność! Ludwig, postanowił odprawić rytuał, znacząc wejścia symbolami krwi, aby zabronić wampirowi wstępu do budynku.',
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
  {
    id: 'session-02',
    title: 'Duchy, Wampiry i Ryboludzie',
    summary:
      'Hargrave House uwalnia biedną duszę nawiedzającą St. James Street. Łowcy odkrywają, że Zmora z Limehouse to starożytny wampir uwięziony w ciele dziecka. Nowe niebezpieczeństwa czają się tuż pod powierzchnią Tamizy.',
    scenes: [
      {
        label: 'Historia Ducha',
        phase: 'Dusk',
        prose: [
          'O zmierzchu, Łowcy zgromadzili się by rozwiązać zagadkę nawiedzenia na St. James Street 18. George przedstawił przekonywującą teorię: zbrodnia sprzed dwustu laty, dokonana na nieślubnym dziecku pana Winterbottoma, dziedzica posiadłości na St. James Street oraz nieszczęśliwego męża w zaaranżowanym małżeństwie. Dziecko, urodzone przez służącą, zostało następnie uduszone  przez opłaconą („podarunkami dla świń") kucharkę. Zemsta nadeszła, gdy dom spłonął wraz ze wszystkimi mieszkańcami. Teraz wszystkie dusze są uwięzione między światami, dopóki zamordowane dziecko nie będzie mogło opowiedzieć swojej historii żywej duszy. Niestety, tylko ci, którzy są wrażliwi na nadnaturalne, posiadają więdzę by zrozumieć język duchów i na tyle silni, by przetrwać wysłuchanie tak strasznej opowieści.'
        ]
      },
      {
        label: 'Egzorcyzm Ducha ze St. James Street',
        phase: 'Night',
        prose: [
          'Grupa postanowiła natychmiast spróbować wypędzić ducha. Singh przygotował ochronne znaki na poddaszu, pod nadzorem Ludwiga, podczas gdy George przygotował się by wysłuchać żałosnej opowieści. Gdy dziecko zaczęło mówić, inne duchy zaatakowały Łowców, ale magiczny krąg wytrzymał. Gdy padły ostatnie słowa opowieści, duchy ze St. James Street zostały ściągnięte z Ziemi - a George został wciągnięty wraz z nimi! Na szczęście, widmowy Łowca zdołał oddzielić swoją świadomość od wiru duchów i powrócił.'
        ],
      },
      {
        label: 'Dog & Whistle',
        phase: 'Night',
        prose: [
          'Lord Richard udał się do pubu „Dog & Whistle" - gdzie znaleziono drugą ofiarę Zmory z Limehouse. Ofiarą był chiński marynarz, Zhao Donghai, i Lord Richard miał nadzieję znaleźć tam jego współzałogantów. Niestety, spotkał tylko starą, miejscową pijaczkę, Elmę Thorpe. Za drinka wskazała boczną alejkę, gdzie znaleziono ciało Zhao, i stwierdziła, że słyszała „małe, dziecięce głosy" odstraszające ją od picia, dobiegające stamtąd późno w nocy.',
          'Podczas badania miejsca zbrodni, Lord Bellows został skonfrontowany przez grupę ulicznych wyrostków, niezadowolonych, że ktoś miesza się w sprawy Zmory. Z iście lordowską odwagą, Richard pokonał przeciwników ciężką laską i poszczuł psem.'
        ],
      },
      {
        label: 'Ilustrowane Wiadomości Policyjne',
        phase: 'Day',
        prose: [
          'Wkrótce w „Ilustrowanych Wiadomościach Policyjnych" pojawiła się informacja, że dzięki Łowcom z Hargrave House dom na St. James Street nie jest już nawiedzony. Mimo to, rodzina Beale\'ów się wyprowadza, ponieważ Theodora Brathwaite nabyła posiadłość, dopełniając tym samym swoją kolekcję domów na tej ulicy.',
          'Kilka dni później, dziennikarz z tej samej gazety odwiedza Łowców z Hargrave. Pod wrażeniem ich pracy przy St. James Street, postanawia podsunąć im nowe informacje, zanim zostaną opublikowane - w nadziei na ekskluzywną historię, gdy Łowcy odkryją o co chodzi w całej sprawie. Według historii, „potwór morski" lub ryboludź" grasuje na terenie Cremorne Gardens, zwabiając ludzi syrenim śpiewem. Rzekomo Simon Piemon i Beulah Trum, młoda para, byli ostatnimi ofiarami jego ataku.'
        ],
      },
      {
        label: 'Kliper i Chiński Marynarz',
        phase: 'Day',
        prose: [
          'Lord Dick postanawia odnaleźć chińskich marynarzy przy nabrzeżu. Identyfikuje kliper, na którym pracował Zhao i kontaktuje się z Linem, przyjacielem zmarłego marynarza. Razem wracają do alejek za „Dog & Whistle", próbując odtworzyć wydarzenia feralnej nocy. Lin wyjaśnia, że ostatni raz widział Zao, gdy ten gonił jakichś „łobuzów" w głąb alejki. Lin był zbyt pijany, by podążyć za nim, ale zaprowadził Richarda na miejsce. Gdy wkroczyli w ponury mrok bocznej alejki, Lin nagle został uniesiony w powietrze przez niewidzialną siłę. Z wielkim wysiłkiem, Lord Bellows zdołał pociągnąć mężczyznę z powrotem w promienie słońca, gdzie tajemnicza siła puściła. Chiński marynarz wrócił biegiem do swojego statku, obiecując nigdy nie wracać do Londynu.'
        ],
      },
      {
        label: 'Powrót do Palarni Opium',
        phase: 'Day',
        prose: [
          'Ludwig postanowił wpaść do palarni opium Jen i upewnić się, że jego ochronne rytuały wciąż działają. Tam ponownie spotkał tajemniczego Mężczyznę w Masce Słońca. Zaintrygowany, dołączył do niego w prywatnej wnęce i wkrótce zaczął halucynować od opiumowego dymu. Gdy odzyskał zmysły, znalazł się w eleganckim saloniku - całym w kolorze szafirowego nieba: dywany, meble, kwietne tapety i zasłony - wszystko w błękicie. Na ścianach wisiały dziwne obrazy słońca (lub słońc) świecących nad niezwykłymi światami, które nie przypominały Ziemi. W panice wybiegł najbliższymi drzwiami i wylądował z powrotem we wnęce z Mężczyzną w Masce Słońca. Pośpiesznie pożegnał się i postanowił spędzić trochę czasu pod „normalnym" słońcem.'
        ],
      },
      {
        label: 'Popołudnie w Cremorne Gardens',
        phase: 'Day',
        prose: [
          'Singh przyznał, że miał okazję poznać już właściciela parku, Thomasa Simpsona. Kiedyś pracował dla niego jako służba domowa, lecz został wyrzucony po fałszywych oskrażeniach o kradzież przez córkę Simpsona, Abigail. Z tego powodu nie chciał odwiedzić Ogrodów. Zamiast tego, umówił się na spotkanie z ofiarą, Beulah Thrum. Młoda kobieta była wciąż wstrząśnięta przeżyciem, ale wydawało się, że najbardziej martwi się o zdrowie swojego narzeczonego, który był niemal „przerażony na śmierć" przez potwora. By pomóc w śledztwie, dała Singhowi płaszcz, który miała na sobie tej nocy, podarty pazurami stwora.',
          'W jednej z kieszeni, dociekliwy Sikh znalazł nieotwarty list. Beulah musiała o nim zapomnieć w całym zamieszaniu. W środku była krótka wiadomość napisana przez nieznaną osobę, wskazująca, że Abigail Simpson próbuje uwieść jej ukochanego, Simona!',
          'Ludwig, niezwracając uwagi na liczne atrakcje Cremorne Gardens, udał się prosto na promenadę wzdłuż rzeki. Tam wykonał jeden ze swoich rytuałów krwi, pozwalając jej spływać do wody, by spróbować zajrzeć w przeszłość. Nurt Tamizy był jednak zbyt silny dla młodego medium. Świat wokół niego stracił ostrość. Odwiedzający park, przeszli i obecni, zlewali się w płynący strumień nierozróżnialnych kształtów. Jedyną stałą, jedyną niezmienną rzeczą na świecie była para zimnych oczu obserwujących spod promenady. I ku trwodze Ludwiga, poczuł on z nimi głęboką więź.',
          'Kilkaset jardów dalej, Lord Richard badał inną część Cremorne Gardens. Prowadził Pitagorasa na smyczy przez alejkę parku, gdy jego pies nagle splątał się z wyjątkowo szczekliwym pudlem i jego jeszcze bardziej szczekliwą właścicielką. Ratunek przyszedł z nieoczekiwanej strony - Theodora Brathwaite spuściła Pitagorasa ze smyczy uwalniając go i stwierdzając, że „prawdziwe ogary nigdy nie powinny być na uwięzi". Następnie zabrała Lorda, zanim właścicielka pudla zdążyła cokolwiek powiedzieć. Idąc pod ramię, Mistrzyni Zbrodni podziękowała Hargrave House za oczyszczenie domu z St. James Street, dzięki czemu mogła go przejąć, ale także wyraziła obawę dotyczącą trzymania ducha (George\'a) w samym Hargrave. Mimo ciepłego popołudnia, zimny dreszcz przebiegł Lordowich Richardowi po plecach.'
        ],
      },
      {
        label: 'Nieproszony Gość w Hargrave House',
        phase: 'Night',
        prose: [
          'Zmęczeni śledztwami, Łowcy wycofali się do Hargrave House, by odpocząć. Tylko George czuwał, jako że jego potrzeba snu zniknęła wraz z jego fizycznym ciałem. Gdy dryfował przez korytarze (bez celu, oczywiście), zauważył (całkowicie przypadkowo), że drzwi do sypialni Ludwiga były lekko uchylone. Zajrzał do środka (kierowany poczuciem obowiązku) i zobaczył, że Zmora z Limehouse siedzi na piersi młodego medium! Dzięki swoim nadprzyrodzonym zmysłom, wampir zauważył ducha i w jednej chwili zamienił się w czarną chmurę dymu i zniknął za otwartym oknem w noc.',
          'George obudził Ludwiga - na szczęście chłopak był cały, ale jedna z jego książek o starożytnych kulturach została skradziona!'
        ],
      }
    ],
  },
  {
    id: 'session-03',
    title: 'W proch się obrócisz',
    summary:
      'Singh odkrywa przerażającą niespodziankę w swoim paszteciku. Stwór z Ogrodów Cremorne atakuje Łowców i umyka do Tamizy. Łowcy z Hargrave odnajdują kryjówkę Zmory z Limehouse i ruszają zniszczyć wampira.',
    scenes: [
      {
        label: 'Poranny głód',
        phase: 'Day',
        prose: [
          'Dzień rozpoczął się spokojnie i słonecznie, bez żadnych nagłych wydarzeń. Singh, średniego wzrostu, ciemnoskóry Hindus z turbanem i gęstą brodą, już od dawna krzątał się po rezydencji Hargrave, pucując przedmioty w pokoju ducha George’a. George, kiedyś jowialny i rubaszny mężczyzna w peruce z loczkami, teraz nawiedza Hargrave House jako zjawa z poparzonym, przerażającym obliczem.',
		  'W tym samym czasie, Lord Richard, kwintesencja brytyjskiego dżentelmena z korkowym kapeluszem i wąsikiem, spożywał tradycyjne angielskie śniadanie – fasolkę na toście, dzieląc się kiełbaską z psem Pitagorasem.',
		  'Tymczasem Ludwig, blady i wychudzony jak student, obudził się na piętrze, skotłowany w pościeli, wśród skrzepów krwi. Zwymiotował do umywalki i zszedł na dół.',
		  'Ludwig podsumował bieżące zadania: odnalezienie leża dziecięcego wampira i ustalenie, czy ryboludź istnieje naprawdę. Lord Richard wspomniał o swoim starciu z wampirem w porcie, wierząc, że tam znajduje się jego kryjówka. Singh przypomniał o trzeciej ofierze w pobliżu sierocińca. Postanowiono się rozdzielić.'
        ]
      },
      {
        label: 'Sierociniec Limehouse',
        phase: 'Day',
        prose: [
          'Lord Richard i Ludwig udali się do sierocińca w Limehouse. Tam zostali zaprowadzeni do dyrektora Chesterfielda, człowieka skromnego i zestresowanego, który z wdzięcznością przyjął datek od Lorda Richarda. Ludwig, korzystając z nieuwagi dyrektora, przeglądał księgi uczniów i odkrył, że Chesterfield sam był wychowankiem tego sierocińca, a także znalazł wpis dotyczący Elmy Thorpe sprzed 30 lat.',
		  'Lord Richard zapytał o ciało znalezione za sierocińcem. Dyrektor potwierdził, że była to Charla Bell, znaleziona tydzień lub dwa wcześniej, określając to jako „tragiczny wypadek”. Powiedział, że ciało znaleźli uczniowie. Lord Richard zaoferował dodatkowe pieniądze, by porozmawiać z dziećmi, obawiając się, że wampir może w to być zamieszany.',
		  'Chesterfield zaprowadził ich do trzech chłopców – Toma, Johna i Jimmy’ego – którzy mieli pokazać im miejsce znalezienia ciała, po czym szybko się oddalił. Chłopcy, wyraźnie nieprzyjaźni, poprowadzili Łowców przez szereg zaułków i piwnic. Nagle jeden z nich pociągnął Ludwiga w bok i Lord Richard został sam w wąskim zaułku. Okazało się, że to pułapka: chłopcy rzucali cegłami z dachu, a Lord Richard otrzymał cios w głowę, doznając wstrząsu mózgu.',
		  'Ludwig wrócił po towarzysza i wykorzystując magię krwi wykonał niemożliwy skok na dach, łapiąc jednego z chłopców. Chłopiec, ze łzami w oczach, opowiedział, że Charla Bell została wyssana z krwi i że "Zmora z Limehouse" (wampir), obiecała im ochronę i moc w zamian za służbę. Dzieci mówiły również, że wampir sam by teraz zajął się Łowcami, gdyby nie przebudowa kanalizacji, która odcięła go chwilowo od sierocińca. Ludwig przegnał uliczników, a następnie wezwał powóz dla siebie i rannego towarzysza i wrócili do Hargrave House.'
        ],
      },
      {
        label: 'Mięsne paszteciki i bezcielesne śledztwo',
        phase: 'Day',
        prose: [
          `Singh udał się do Cremor Gardens. Zatrzymał się przy stoisku "Figg's Pigs" oferującym pięknie pachnące paszteciki wieprzowe. Gospodarz, Tytus Figg, podśpiewując pod nosem podał mu i drugiemu dżentelmenowi obok dwie porcje jeszcze gorącego wypieku. Po kilku kęsach, obaj mężczyźni zorientowali się, że w cieście jest ludzkie mięso! Nieznajomy okazał się detektywem Scotland Yardu, a gdy pokazał odznakę, Tytus zaczął uciekać. Detektyw przesadził susem kontuar, Singh za nim i dopadli Pana Figga na zapleczu, gdzie Singh z przerażeniem odkrył ludzki tors wiszący na rzeźniczych hakach. Titus Figg został aresztowany, ale reszta jego rodziny zbiegła. Łowcy musza znaleźć mordedczych kanibali, nim Ci znów zaatakują!`,
		  'George kontynuował śledztwo w sprawie ryboludzia z Cremorne, śledząc właściciela parku, Thomasa Simpsona. Podążył za nim do namiotu, gdzie występował Greco, "widzący chłopiec". Greco okazał się być prawdziwym medium i wyczuł obecność ducha. Doradził mu, aby udał się do starych zabudowań portowych, gdzie spotka jednookiego mężczyznę, z którym łączy go wspólny cel. George i Singh odnaleźli jednookiego rybaka i ten Rybak opisał potwierdził, że widział bestię nawiedzającą Ogrody Cremorne. Opisał Ryboludzia jako trzymetrową, łuskowatą, śluzowatą kreaturę z pazurami i zapachem morza. Hindus założył się z nim o to, kto schwyta ryboludzia.  Umówili się na spotkanie w ogrodach Cremorne nocą, aby go osaczyć, a rybak dał Singowi klucz do wschodniej bramy.'
        ],
      },
      {
        label: 'Łowy, Łowy, Łowy',
        phase: 'Dusk',
        prose: [
          'Wieczorem do Hargrave House przybył Sir Anthony Wood, przyjaciel Lorda Richarda, członek prestiżowego Królewskiego Stowarzyszenia Odkrywców. Gdy usłyszał czym zajmują się obecnie Łowcy, przypomniał sobie legendę z czasów arturiańskich o Trytornie, który uwiódł i utopił damę, za co został przeklęty i uwięziony w drzewie. Podarował też Lordowi Richardowi kości wielorybów rzeźbione w wizerunki trytonów - ponoć bardzo popularne wśród lokalnych marynarzy.',
		  'Łowcy zebrali się, aby omówić plan działania. Singh i George spotkają się z Abelem, by wspólnie zapolować na ryboludzia, Ludwig spróbuje wywabić wampira krążąc po ulicach Londynu i wykorzystując swoją relację z Ciemnością, a Lord Richard uda się na poszukiwanie samego leża wampira.'
        ],
      },
      {
        label: 'Nieoczekiwane spotkanie',
        phase: 'Night',
        prose: [
          'Ludwig udał się na długi spacer przez ciemny Londyn, brocząc krwią i świadomie kusząc los. Jego uwagę przyciągnęła żebraczka, która wyciągała dłoń w błagalnym geście. Gdy Ludwig podał jej zakrwawioną rękę, ku jego przerażeniu, kobieta chwyciła ją i oblizała! Okazała się być Hortensją Figg, żoną Tytusa. Była wysoka, chuda i jej lewa ręka kończyła się kikutem tuż pod łokciem. Wyraziła obawę o swoje dzieci i dała Ludwigowi (za jego "dar") starą książeczkę z wierzykami dla dzieci - w której ktoś starannie wykreślił wszelkie wzmianki o ptakach.',
		  'Jednocześnie, Ludwig uświadomił sobie, że Los spłatał mu figla - postawił na jego drodzę zmorę, lecz nie tą, której się spodziewał! To oznacza, że Lord Richard znalazł się w śmiertelnym niebezpieczeństwie!'
        ],
      },
      {
        label: 'Koniec Zmory z Limehouse',
        phase: 'Night',
        prose: [
          'Analizując wszystkie poszlaki, Łowcy doszli do wniosku, że wampirt ma trzy kryjówki - pod miejscami, gdzie znaleziono ciała. Dzięki przebudowie kanalizacji, nie może się swobodnie między nimi poruszać, a dziwne spirale krwi, które widzieli, to oznaka, że jest w pobliżu. Lord Richard postanowił, że dopadnie bestię tej nocy. Udał się do piwnicy tawerny Dog & Whistle i z zadowoleniem zauważył "spiralę krwi" nad klapą w podłodze. Wszedł w ciemność ze swoją wierną strzelbą na słonie. Niestety nie zdała się na wiele gdy wampir niespodziewanie zaatakował z sufitu! Na szczęście wierny Pitagoras odwrócił uwagę stwora, a Lord Richard użył specjalnie przygotowanej obrotowej kuszy na kołki - jeden z nich trafił wampira w serce. Dziecięce ciało wampira rozpadło się w proch. '
        ],
      },
      {
        label: 'Potyczka nad Tamizą',
        phase: 'Night',
        prose: [
          'Singh (z harpunem od Lorda Richarda) i George (który przybrał fizyczną postać) wkroczyli do Cremorne Gardens. Usłyszeli dziwną pieśń i zobaczyli jednookiego Abela, idącego jak zahipnotyzowany w stronę Tamizy. Singh odciągnął go i uratował przed utopieniem. George, w eterycznej formie, zanurkował w Tamizie szukając stwora, ale zamiast tego znalazł piekny, szmaragdowy kolczyk. Wtedy z krzaków wyskoczyła ciemna postać i zaatakowała Singha i Abela! George, wciąż w fizycznej postaci i w polerowanej zbroi, rzucił się na przeciwnika. Czuł jego łuskowate ciało i słyszał krzyk bólu, po czym stworzenie wskoczyło do wody i zniknęło, pozostawiając porzucone ubrania. Zakład Singha i Abela pozostał nierozstrzygnięty.'
        ],
      },
      {
        label: 'Poranek w Hargrave House',
        phase: 'Dawn',
        prose: [
          'Kolejny poranek Łowcy powitali żywi - co już samo w sobie jest osiągnięciem, biorąc pod uwagę niebezpieczeństwa z jakimi się zmierzyli. Rozwiązali również sprawe Zmory z Limehouse, a Jenny Johnson, właścicielka palarni opium, postanowiła, że w przyszłości będzie wspierać Hargrave House, jeśli tylko będą potrzebowali pomoc we wschodnim Londynie.',
		      `I tylko sny które nawiedziły ich tej nocy, nie dawały im spokoju:<ul>
<li>Singowi śniły się czasy, gdy potężni Hindusi rządzili ziemią, u boku ogromnych, gadzich stworów.
<li> Lordowi Richardowi śniło się powstanie Londinium, rzymskie drogi i młody chłopak obserwujący legionistów oddających cześć bogini Cybele.
<li>Ludwig śnił o świetlistych sylwetkach dawnych bogów, będących częścią "wielkiego układu krwionośnego" świata. Jedna z postaci, z szafirowym gardłem, zwróciła się do niego: "Ciebie będę potrzebować" – była to Teodora Brathwaite.</ul>`
        ],
      }
    ],
  },
  {
    id: 'session-04',
    title: `Moc'h, Syrena i Stary Aparat `,
    summary:
      `Utalentowana aktorka Penelope Ladywhite, zniknęła bez śladu po wizycie w tajemniczym Towarzystwie Obskura. W opuszczonej rzeźni rodziny Figgów w Southwark Sir George i Lord Richard stają twarzą w twarz z makabrycznym ołtarzem pogańskiego bóstwa świń Moc'ha. Stwór z Ogrodów Cremorne, okazuje się być misterną mistyfikacją. Przyjęcie u boku magnatki Theodory Brathwaite przynosi towarzyski skandal.`,
    scenes: [
      {
        label: 'Nieoczekiwane zaproszenie, nieoczekiwany gość',
        phase: 'Dawn',
        prose: [
          'Wiatr wiejący znad Tamizy przyniósł ze sobą zapach wilgoci, sadzy i rzecznego mułu. W Hargrave House dzień zaczynał się powoli. Lord Richard, wpatrując się w ulicę przez wielką lunetę przytwierdzoną do okiennego parapetu, jako pierwszy dostrzegł posłańca zbiegającego po schodach rezydencji. Na progu leżał niewielki list zalakowany głęboką, szmaragdową pieczęcią Królewskiego Towarzystwa Geograficznego. Prezes klubu, generał Herod Barzley, zapraszał wybitnych dżentelmenów na uroczysty wieczór z udziałem gościa honorowego – Theodory Brathwaite, legendarnej „Królowej Barbadosu”.',
		  'Zanim jednak Lord i towarzyszący mu Singh zdołali omówić treść zaproszenia, do frontowych drzwi załomotał ktoś z rozpaczliwą siłą. W progu stanęła zaszlochana Beulah. Wtuliwszy twarz w ramiona Singha, wykrztusiła spomiędzy łez przerażającą wieść: jej najbliższa przyjaciółka, piękna aktorka Penelope Ladywhite, przepadła jak kamień w wodę. Została wciągnięta w kręgi tzw. Towarzystwa Obskura – elitarnej grupy artystów i technologów wykonujących gorszące, okultystyczne fotografie. Beulah trzymała w drżącej dłoni fotografię Penelope o nienaturalnej, fosforyzującej aurze. W bibliotece Hargrave natychmiast odnaleziono powiązanie: nazwisko Atticusa Wheteleya, badacza innych wymiarów, którego aparat miał potęgę rozrywania tkanki świata i strącania uwiecznionych dusz wprost w czeluść „Wonnej Pustki”.',
		  'Łowcy połączyli siły. Przed wyruszeniem na poszukiwania Penelope należało zamknąć sprawę Stwora z Cremorne Gardens, którym w lokalnych szynkach chełpił się kochanek Beulah, młody bon-vivant Simon, a także zbadać zaplombowaną przez Scotland Yard rzeźnię kanibali z rodu Figgów.'
        ]
      },
      {
        label: `Ołtarz Moc'ha`,
        phase: 'Day',
        prose: [
          'Podczas gdy Ludwig i Singh udali się na spotkanie z zarozumiałym Simonem w pobliże gmachu Parlamentu, Lord Richard oraz Sir George Montegu w towarzystwie niezastąpionego ogara Pitagorasa skierowali powóz na południowy brzeg rzeki. Dzielnica Southwark uderzyła ich zmysły kakofonią ryków pędzonego bydła i obezwładniającym odorem zjełczałego tłuszczu oraz krwi dochodzącym z garbarni.',
		  `Zapieczętowany budynek z szyldem "Figg's Pigs" skrywał tajemnicę dalece wykraczającą poza zwykłe rzeźnictwo. Podczas gdy Pitagoras z głośnym warkotem drapał drewnianą boazerię za ladą sklepu, Sir George w postaci bezcielesnej przeniknął przez ukryty mechanizm szafy. Znalazł się w przestronnej, podziemnej krypcie. Na środku komnaty, w oparach gnijącego mięsa, stał prymitywny kamienny ołtarz. Na żelaznym szpikulcu tkwił odcięty łeb potężnego knura, a na kamiennej posadzce wokół niego ułożono ludzkie ramiona i podudzia w kształt bluźnierczego symbolu solarnego.`,
		  `Lodowata emanacja pogańskiego bóstwa Moc'ha runęła na duszę zmarłego Łowcy niczym ołowiany dzwon. George zamarł, sparaliżowany obezwładniającym strachem, czując, jak jego ektoplazmatyczna forma zaczyna się rozpraszać. Sytuację uratował Lord Richard – wpadłszy do krypty z obnażoną laską z kości słoniowej, bez wahania strącił potworny łeb na ziemię i rozbił układ kości, przeklinając na czym świat stoi. Zasłoniwszy się zaklętą głową pigmeja, na którą spłynęło przekleństwo Moc'ha, wyzwolił George'a spod mrocznego uroku. `,
		  `Duch postanowił spojrzeć głębiej w przeszłość tego miejsca. Ukazała mu się wstrząsająca wizja z dnia ślubu: Titus Figg wnosił przez próg swoją wybrankę, młodą i dumną Hortencię w śnieżnobiałej sukni. Jednak zamiast do łoża, poprowadził ją przed ołtarz Moc'ha. Tam Hortencia bez cienia wahania położyła własne prawe ramię na pniu, pozwalając odrąbać je toporem w ofierze bóstwu w zamian za potęgę i powodzenie ich morderczego interesu. W schowku za ołtarzem Łowcy odnaleźli tę samą suknię ślubną, zaschniętą od czarnej posoki, oraz stos ubrań zamordowanych robotników.`
        ],
      },
      {
        label: 'Królowa Barbadosu',
        phase: 'Day',
        prose: [
          `O zmierzchu dorożka zajechała przed marmurowe schody Królewskiego Towarzystwa Geograficznego. Wnętrza klubu tonęły w dymie najlepszych cygar i blasku kryształowych żyrandoli. Generał Herod Barzley z dumą przedstawił gościom gwiazdę wieczoru. Theodora Brathwaite, odziana w powłóczystą szafirową suknię podkreślającą jej dumne, niemal monarsze rysy, skupiała na sobie spojrzenia całej londyńskiej śmietanki towarzyskiej.`,
          `Gdy magnatka opowiadała o swoich dawnych korsarskich wyczynach na Morzu Karaibskim, ułaskawieniu przez młodą królową Wiktorię i handlowej potędze, Lord Richard nie wytrzymał presji. Zmęczony, obolały po trudach dnia i trawiony niepokojem, począł obficie zapijać stres szkocką whisky. Alkohol szybko odebrał mu kurtuazję. Richard zaczął głośno kpić z obecnych dżentelmenów i rzucać aroganckie uwagi, stając się pośmiewiskiem całego salonu. Korzystając ze swej przewagi, Brathwaite zadała Richardowi bezlitosne pytanie: kim naprawdę jest dla niego Ludwig Virchow? Ugodzony w dumę arystokrata wyznał z brutalną szczerością to, co od dawna w nim kipiało – nazwał młodego Niemca bezczelnym darmozjadem i pasożytem, który zamiast polować w buszu, zatruwa swą obecnością Hargrave House.`,
          `Mimo upokorzenia Ludwiga, i kompromitacji Lorda Richarda, Łowcy wrócili razem do Hargrave House i usiedli razem do stołu by zastanowić się nad stanem spraw. Zestawiając wszystkie poszlaki, doszli do wniosku, że amfibijny Ryboludź z Ogrodów Cremorne nigdy nie istniał jako nadnaturalna istota. Była to cyniczna mistyfikacja zorganizowana z użyciem tranu i wyszukanego kostiumu. Teraz należało tylko odkryć motywajcę i tożsamość sprawcy (lub sprawców).`
        ],
      },
      {
        label: `Echa przeszłości`,
        phase: `Dusk`,
        prose: [
          `Ten triumf intelektu otworzył jednak stare rany przeszłości. W zaciszu powozu każdy z Łowców musiał skonfrontować się z własnym demonem:
<ul>
<li> Sir George ujrzał retrospekcję z XVII wieku, gdy malowano jego portret, a przodek Singha, maharadża i przyjaciel George'a, wniósł do Hargrave House afrykański grymuar czarnej magii, zapoczątkowując sojusz, który miał zakończyć się płomieniami zdrady.
<li> Ludwig powrócił do chwili swego poczęcia w pruskiej puszczy, gdzie jego krwawiąca matka Anna zawarła nocny pakt, by uratować dziecko, które nosiła pod sercem.
<li> Chłopiec w wiosce z goryczą przypomniał sobie afrykańską ekspedycję, podczas której Odkrywca podstępnie ukradł czczone kły wielkiej słonicy matriarchini, zawieszone dziś bezwstydnie nad kominkiem jako myśliwskie trofeum w Hargrave House.`
        ]
      },
      {
        label: 'Noc w Cremorne Gardens',
        phase: 'Night',
        prose: [
          `Singh i Ludwig postanowili znów odwiedzić Cremorne Gardens pod osłoną nocy. Każdy przybył tu w innym celu, więc rozdzielili się zaraz za bramą. Singh sprężystym krokiem ruszył pod rusztowanie Diabelskiego Młyna - gdzie, jak zeznał Simon Piedmont, potwór został pozbawiony swojej płetwy grzbietowej. Odważny lokaj znalazł szukany przedmiot, lecz stwór (a raczej przebrana za niego osoba) zaatakowałą niespodziewanie! Na szczeście Singh wziął ze sobą Pitagorasa, który przepędził napastinka odrywając mu ogon! Zgodnie z Oczekiwaniami, zarówno płetwa jak i ogon okazały się być częścią kostiumu wykonanego ze skóry i gumy.`,
          `W tym samym czasie, w zadymionym kadzidłem namiocie cyrkowym, Ludwig Virchow zasiadł do prywatnego seansu z medium Greco. Gdy "Widzący Chłopiec" na czole wyłożył kartę tarota przedstawiającą Głupca, Ludwig postanowił sprawdzić jego rzekomą potęgę. Wyciągnął kryształową fiolkę z popiołem i skrzepami Zmory z Limehouse, po czym z całej siły zmiażdżył ją na mahoniowym stoliku. Odłamki szkła rozcięły skórę Niemca, a przeklęta wampirza krew natychmiast wniknęła w jego żyły. Ludwig wygiął się w agonii, gdy jego prawa dłoń od palców aż po nadgarstek poczerniała niczym zwęglone drewno, naznaczając go nieusuwalnym piętnem ciemności. Chwiejąc się na nogach, Ludwig wybiegł z namiotu na wąską ścieżkę. Tam, pośród cieni, ukazał mu się śnieżnobiały paw albinos z jarzącym się krwawym okiem na czole. Rozpostarty pióropusz oślepił Ludwiga mistycznym blaskiem - prorocza wizja związana w jakiś sposób z Wonną Pustką i zaginięciem Penelopy Levy. Tam znalazł go Singh.`,
          `Lord Richard również miał zamiar udać się do Cremorne Gardens, ale nigdy tam nie dotarł. Zmierzająć wzdłuż wybrzeża, zobaczył Abela Knoxa na moście Vauxhall, wspinającego się na barierkę. Lord rzucił się w jego stronę i w ostatniej chwili złapał niedoszłego samobójcę, który zamierzał skoczyć w odmęty rzeki. Mężczyzna wydawał się być pod wpływem jakiegoś uroku, ale powoli dochodził do siebie. Łkając i szlochając podał tylko Richardowi pomięty list i odpełz w mrok. Na kartce widniało tylko jedno zdanie "Abigail za to zapłaci!". Bystremu wzrokowi Lorda Richarda nie umknął jednak jeszcze jeden szczegół - w rynsztoku zauważył damską, niebieska rękawiczkę, która musiała wypaść z przejeżdżającego tędy powozu.`
        ],
      },
      {
        label: 'Szaleństwo w Bedlam',
        phase: 'Day',
        prose: [
          `Brudnoszary świt powitał Hargrave House zapachem spalenizny i mydła. W ogrodowej balii Singh z mozołem szorował Pitagorasa z rzecznego tranu i sadzy. Ku zdumieniu wszystkich okazało się, że bury dotychczas pies w rzeczywistości ma śnieżnobiałą, nieskazitelną sierść.`,
          `W tym samym czasie z kuchni dobiegł przeraźliwy pisk pani Applebee. Ze ściany w spiżarni, uszkodzonej przez drgania miejskiej kanalizacji Bazalgette'a, począł przesączać się cuchnący, gęsty szlam. Sir George, pragnąc wreszcie rozwiązać problem udręczonej gospodyni, zmaterializował zegarowy mechanizm minerski i odpalił ładunek w przewodzie kominowym. Potężna eksplozja wstrząsnęła parterem rezydencji, wyrywając rury ze ścian i zasypując całą kuchnię gruzem oraz sadzą. Histerycznie płacząca pani Applebee cisnęła fartuchem w zjawę i oświadczyła, że jej noga więcej w tym przeklętym domu nie postanie.`,
          `Lord Richard i George do owianego ponurą sławą szpitala dla obłąkanych, Bedlam. Ordynator placówki, dr Rodney Walters, przyjął dżentelmenów z chłodną rezerwą, prowadząc ich do wyciszonej celi Titusa Figga. Skuty w kaftan bezpieczeństwa rzeźnik z obłędem w oczach rytmicznie uderzał ogoloną głową o miękką ścianę, wybijając tempo do bluźnierczej rymowanki o trzech świnkach. George podchwycił obłąkańczy rytm i zanucił zwrotkę o pannie młodej z rzeźni. Titus, zachwycony wspólnym śpiewem, wykrzyczał nową zwrotkę: Hortencia poświęciła dłoń i rodzinny dom z miłości do Moc'ha i trzoda świnskiego boga będzie rosnąć i rosnąc. Nagle, do Titusa dołączył chór innych głosów - to śpiewali pozostali osadzeni na oddziale! Co gorsza, sam dr Walters, zaczął nucić tą melodię i ruszył do drzwi cel by wypuścić obłąkanych. Dla Lorda Richarda było to zbyt wiele. Weteran afrykańskich wojen eksplodował furią. Dopadł doktora pod ścianą i potężnym ciosem pięści złamał mu nos, a następnie raz za razem uderzał jego głową o posadzkę, aż elegancki biały kitel spłynął krwią. Z rozerwanej kieszeni nieprzytomnego ordynatora wypadł stary, dziecięcy zielnik z  dedykacją: „Dla mojej słodkiej Hortensji – Tata”. Opuszczając oddział, Łowcy unieśli wzrok. Nad wejściem lśniła wypolerowana mosiężna tablica dziękczynna, obwieszczająca, że rozbudowę placówki sfinansował szczodry datek Theodory Brathwaite.`,
          `Singh i Ludwig jeszcze raz udali się do Cremorne Gardens - tym razem chcieli skonfrontować właścicieli ogrodu, Thomasa Simpsona i jego córkę, Abigail. Wiedziony instynktem, Singh zagradł się na tyły budynków administracyjnych Ogrodów i uchwycił przez żywopłot fragment kłótni między ojcem a córką. Abigail była zdecydowanie przeciwna próbie schwytania stwora i wystawienia go na widok publiczny. Wykrzyczawszy swój sprzeciw, odwróciła sie na pięcie i ruszyła przed siebie - prosto na ścieżkę, gdzie (czekając na powrót Singha) stał Ludwig. Widząć samotną Abigail (i podejrzewając, że to ona stoi za cała mistyfikacją) postanowił rzucić na nią urok. Niestety rytuał poszedł nieco zbyt dobrze - wprawdzie dziewczyna została z nim związana i nie byłaby w stanie mu uciec, to młody medium sam poczuł związany się z dziewczyną - i uznał, że musi ją chronić. Nie myśląc długo, uciekł z nią prosto do Palarnii Opium Chen Bao.`
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
