
import { characters } from './characters'
import type { Character } from '@/types'

/**
 * Polish character text data.
 *
 * This file contains Polish translations of text fields (name, alias, occupation,
 * description, background, traits, conditions, masks[].category,
 * masks[].masks[].name). The non-text fields (id, type, subtype, imageUrl,
 * status, used flags) are stored in characters.ts.
 */
export interface CharacterText {
  id: string
  name: string
  alias?: string
  occupation: string
  description: string
  background: string
  traits?: string[]
  conditions?: string[]
  masks?: { category: string; masks: { name: string; masked?: boolean }[] }[]
}

export const charactersPl: CharacterText[] = [
  {
    id: 'george-montegu',
    name: 'George Montegu',
    occupation: 'Nieuciszony',
    description:
      'Duch zamordowanego członka domu Hargrave. Młody mężczyzna ubrany w strój z innej epoki, pachnący dymem i popiołem.',
    background:
      'Byłeś mieszkańcem Domu Hargrave wiele dekad temu, a teraz jesteś duchem, jesteś martwy. W rzeczy samej, spotkał Cię przedwczesny koniec w wyniku zdrady. Pojawienie się potomka zdrajcy w Londynie zbudziło Cię, i przykowało do Domu Hargrave, który będziesz nawiedzać dopóki nie dokonasz zemsty. W międzyczasie znów oddajesz się do brudnej pracy wykonywanej przez Dom Hargrave, a ci nowi Łowcy z pewnością mogliby skorzystać z Twojej pomocy. Przy odrobinie wysiłku udaje Ci się zgromadzić energię potrzebną do tymczasowego wyswobodzenia się ze swoich spektralnych więzów by znów spacerować po ulicach Londynu.',
    conditions: ['Jeden z wielu'],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Opowiedz retrospekcję z czasów, gdy żyłeś, pokazującą jak walczyłeś i niszczyłeś potworne stwory w imieniu Domu Hargrave.', masked: true },
          { name: 'Opowiedz retrospekcję z czasów, gdy żyłeś, pokazującą intymny moment z Łowcą, który ostatecznie Cię zdradził. Nazwij go.' },
          { name: 'Opowiedz retrospekcję z czasów, gdy żyłeś, pokazującą nemezis Domu Hargrave w tamtych dniach.' },
          { name: 'Opowiedz retrospekcję pokazującą, jak Łowca, który ostatecznie Cię zdradził, związał się z nemezis Domu Hargrave.' },
          { name: 'Opowiedz retrospekcję pokazującą zdradę.' },
          { name: 'Opowiedz retrospekcję pokazującą, jak zdrada doprowadziła do Twojej śmierci.' },
          { name: 'Prowadzący opowiada scenę w czasach współczesnych, w której widzimy potomka Łowcy, który Cię zdradził. Nazwij go.' },
        ],
      },
      {
        category: 'Maska Przyszłości',
        masks: [
          { name: 'Brama Porośnięta Mchem' },
          { name: 'Próg Ciemności' },
          { name: 'Kosmiczny Passaż' },
          { name: 'Skrwawiony Portal' },
        ],
      },
    ],
  },
  {
    id: 'singh',
    name: 'Singh',
    occupation: 'Faktotum',
    description:
      'Sikh z długiej linii sług rodziny Montegu. Zawsze nienagannie ubrany i doskonale zadbany, Singh jest ucieleśnieniem spokojnej lojalności.',
    background:
      'Miałeś życie zanim wstąpiłeś w służbę do swojego Pracodawcy, ale szczegóły tego życia są nieistotne. Wszystko co teraz ma znaczenie to osoba, której służysz, i Dom Hargrave, gdzie zestarzejesz się i umrzesz — jeśli będziesz miał szczęście. Bardziej prawdopodobne, że twoarzysze Twojego Pracodawcy, ci Łowcy, będą Twoim końcem, grzebiąc w rzeczach, które powinny pozostać pochowane i drażniąc zjawiska, które zamieszkują ciemne miejsca. Zrobisz co w Twojej mocy, by im pomóc, oczywiście, by trzymać ich przy życiu, bo bez nich, kim właściwie jesteś?',
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Opowiedz retrospekcję z czasów młodości, przed służbą, pokazującą Twoje najbardziej znaczące zawodowe zwycięstwo.' },
          { name: 'Opowiedz retrospekcję z czasów młodości, przed służbą, pokazującą jak urozmaicone było Twoje życie.' },
          { name: 'Opowiedz retrospekcję z wydarzenia, które ostatecznie zmusiło Cię do służby.' },
          { name: 'Opowiedz retrospekcję z czasów, gdy byłeś bardziej członkiem rodziny dla swojego pracodawcy niż kimś z jego własnego ciała i krwi.' },
          { name: 'Opowiedz retrospekcję z czasów, gdy Twój pracodawca zachowywał się w sposób całkowicie obojętny na Twoją godność.' },
          { name: 'Opowiedz retrospekcję pokazującą, jak musiałeś wykonywać pracę emocjonalną, aby zadowolić lub uspokoić swojego pracodawcę.' },
          { name: 'Opowiedz retrospekcję z pierwszego razu, gdy uratowałeś życie swojemu pracodawcy.' },
        ],
      },
      {
        category: 'Maska Przyszłości',
        masks: [
          { name: 'Złocone Drzwi' },
          { name: 'Brama Porośnięta Mchem' },
          { name: 'Próg Ciemności' },
          { name: 'Kosmiczny Passaż' },
          { name: 'Skrwawiony Portal' },
        ],
      },
    ],
  },
  {
    id: 'ludwig-virchow',
    name: 'Ludwig Virchow',
    occupation: 'Naczynie',
    description:
      'Ludwig przybył do Londynu z Pomorza. Jest młody, chorowity i dumny ze swojego wąsika. Oszukuje swoją matkę, że studiuje w Królewskim Kolegium Chirurgów.',
    background:
      'Odkąd pamiętasz, mroczne byty były w pobliżu. Czają się tuż na granicy Twojego widzenia, tuż za krawędzią lustra. Gdy zamykasz oczy, możesz je poczuć: ich zimny oddech, ich tłuste dotknięcia... sporadyczne gorączkowe objęcia. Chcą być w środku Ciebie; chcą ocierać się o Twoje wnętrzności i zdeponować swoją moc. Przyciągasz też innych: tych, którzy chcieliby wykorzystać Cię do opanowania tych ciemnych rzeczy, abyś służył ich celom. Niektórzy z nich, mogą być użyteczni, jak Łowcy, z którymi dzielisz dom. Innych, jak Sabat, najlepiej unikać. W obu przypadkach nie jesteś niczyją własnością, narzędziem ani bronią; nie jesteś zwykłym śmiertelnikiem. Twoje przeznaczenie należy do Ciebie.',
    conditions: ['Najukochańszy', 'Naznaczony przez wampira'],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Opowiedz retrospekcję z czasów, gdy byłeś w łonie matki, pokazującą, że już wtedy ciemne byty były tobą zainteresowane.' },
          { name: 'Opowiedz retrospekcję z dzieciństwa pokazującą pierwszą okazję, gdy spotkałeś ciemną istotę.' },
          { name: 'Opowiedz retrospekcję z młodości pokazującą twoje pierwsze spotkanie seksualne z ciemną istotą.' },
          { name: 'Opowiedz retrospekcję z młodości pokazującą czas, gdy wykorzystałeś swoje nadprzyrodzone zdolności do samolubnych celów.' },
          { name: 'Opowiedz retrospekcję z młodości pokazującą, gdy pierwszy raz spotkałeś przywódczynię Sabatu. Nazwij ją.' },
          { name: 'Opowiedz retrospekcję z młodości pokazującą część twojej inicjacji do Sabatu. Nazwij go.' },
          { name: 'Opowiedz retrospekcję z wydarzenia, które wpłynęło na twoją decyzję o odejściu z Sabatu.' },
        ],
      },
      {
        category: 'Maska Przyszłości',
        masks: [
          { name: 'Złocone Drzwi', masked: true },
          { name: 'Brama Porośnięta Mchem' },
          { name: 'Próg Ciemności' },
          { name: 'Kosmiczny Passaż' },
          { name: 'Skrwawiony Portal' },
        ],
      },
    ],
  },
  {
    id: 'lord-bellows',
    name: 'Lord Richard Abelard Jonathan Bellows III',
    occupation: 'Odkrywca',
    description:
      'Trzydziesto-kilku letni, słynny odkrywca. Samouwielbiający się i słusznie arogancki. Zawsze nosi swój korkowy kapelusz i buty do jazdy konnej.',
    background:
      'Urodziłeś się wśród fantastycznego bogactwa i przywilejów. Mógłbyś spędzać dnie rozpieszczany przez luksus, bez niczego pilniejszego niż decydowanie, co włożyć na wieczorny obiad. Ale wybrałeś inne życie; wybrałeś służbę swojej królowej. Wykorzystałeś swoje bogactwo i koneksje, by odkrywać świat, by opisywać nieznane terytoria. I teraz masz pasmo górskie nazwane twoim imieniem — odpowiedni zaszczyt, zważywszy, że górujesz nad innymi Brytyjczykami. Twoja siła, twój intelekt, twoja przebiegłość — żaden nie może im dorównać. Żaden oprócz... Mistrzyni Zbrodni. Mistrzyni, która nieustannie knuje przeciwko Jej Królewskiej Mości, której umysł i zasoby przewyższają twoje własne. Sprostałeś każej próbie, którą bogowie przed tobą postawili, ale Mistrzyni to coś zupełnie innego. A twoja nowa praca, twoja praca z Domem Hargrave, jest z nią w jakiś sposób połączona. Spędzasz dni i noce eksplorując prawdziwe serce ciemności — potwory, które skradają się po ulicach Londynu — ale żaden nie jest tak potworny jak twój przeciwnik, ten, który siedzi po drugiej stronie szachownicy. Czy Wielka Brytania wciąż będzie stała, gdy wielka gra dobiegnie końca?',
    conditions: ['Rozczarowany chaosem'],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Opowiedz retrospekcję z czasu, gdy Odkrywca po raz pierwszy przybył do twojej wsi. Czy to była radosna chwila? Czy było w tym coś złowieszczego?' },
          { name: 'Opowiedz retrospekcję pokazującą twoją przyjaźń z Odkrywcą. Jaki to był związek? Rodzic i dziecko? Nauczyciel i uczeń? Pan i sługa?' },
          { name: 'Opowiedz retrospekcję z czasu, gdy twoja wieś ucierpiała zbrodnię z rąk Odkrywcy. Jak pomogłeś ją popełnić?' },
          { name: 'Opowiedz retrospekcję pokazującą, jak zmierzyłeś się z konsekwencjami zbrodni, której pomogłeś dokonać Odkrywcy.' },
          { name: 'Opowiedz retrospekcję z niedawnej przeszłości pokazującą, jak wieś wciąż cierpi z powodu skutków okupacji Odkrywcy.' },
          { name: 'Opowiedz retrospekcję pokazującą twoje przybycie do Londynu.' },
          { name: 'Opowiedz retrospekcję z czasu, gdy pierwszy raz spotkałeś Mistrzynię Zbrodni.' },
        ],
      },
      {
        category: 'Maska Przyszłości',
        masks: [
          { name: 'Złocone Drzwi' },
          { name: 'Brama Porośnięta Mchem' },
          { name: 'Próg Ciemności' },
          { name: 'Kosmiczny Passaż' },
          { name: 'Skrwawiony Portal' },
        ],
      },
    ],
  },
  {
    id: 'theodora-brathwaite',
    name: 'Theodora Brathwaite',
    occupation: 'Mistrzyni Zbrodni',
    description:
      'Theodora Brathwaite to dystyngowana, czarnoskóra kobieta w średnim wieku, zawsze nienagannie ubrana i nigdy nie widywana bez swojego charakterystyczne aksamitnego dusika z ogromnym szafirem.',
    background:
      'Jest rdzenną mieszkanką Montserrat, która doszła do wszystkiego sama. Zbudowała swoją ogromną fortunę najpierw jako królowa piratów, a później jako włącicielka floty statków handlowych. Przybyła do Londynu w wieku dwudziestu kilku lat, już bajecznie bogata.',
    traits: ['Bogata', 'Niebezpieczna', 'Z koneksjami'],
  },
  {
    id: 'harold-beale',
    name: 'Harold Beale',
    occupation: 'mąż i ojciec',
    description:
      'Rzadka broda. Nie może usiedzieć w miejscu. Martwi się o koszty.',
    background:
      'Harold, księgowy i matematyk-amator, przeprowadził swoją młodą rodzinę na St. James\'s Street zaledwie rok temu, po otrzymaniu zadziwiająco dobrej oferty na dom.',
    traits: ['Zmartwiony', 'Niespokojny', 'Skrupulatny'],
  },
  {
    id: 'alice-beale',
    name: 'Alice Beale',
    occupation: 'żona i matka',
    description:
      'Słodkie usposobienie. Urocza, ale zgaszona. Prosta kraciasta sukienka.',
    background:
      "Alice słucha Haroldem w większości spraw, ale uważa, że nie traktuje wystarczająco poważnie śmierci Ginny. To on sprzedał historię „The Illustrated Police News\" po tym, jak Scotland Yard nie dał rady roziwązać sprawy. Uważa to za niską próbę zarobienia na tragedii.",
    traits: ['Cicha', 'Blada', 'Rozczarowana'],
  },
  {
    id: 'roger-beale',
    name: 'Roger Beale',
    occupation: 'młody syn',
    description:
      'Rumiane policzki. Marynarski strój. Uczy się przeklinać.',
    background:
      "Dziewięcioletni Roger ma zadatki na łobuza, ale uważa, że pomysł nawiedzenia jest cudownie ekscytujący i często prowadzi swoich przyjaciół na wycieczki z duchami po domu.",
    traits: ['Przygodniany', 'Ciekawski', 'Łobuz'],
  },
  {
    id: 'mary-alice-beale',
    name: 'Mary-Alice Beale',
    occupation: 'córeczka',
    description:
      'Dość rozbrykana jak na swój wiek. I gruba — co za gruba mała małpka!',
    background:
      "Posłuchaj, jak ona gaworzy — nie zastanawiasz się, o czym myślą, gdy tak gaworzą?",
    traits: ['Urocza', 'Ciekawska', 'Gruba']
  },
  {
    id: 'pythagoras',
    name: 'Pythagoras',
    occupation: 'pies',
    description:
      'Chart. Pręgowany',
    background:
      "Kiedyś był dość leniwy, ale odkąd przeprowadzili się na St. James's Street, większość czasu spędza nerwowo obchodząc dom.",
    traits: ['Lojalny', 'Przyjazny', 'Czujny'],
    },
    {
    id: 'irma-thicket',
    name: 'Irma Thicket',
    occupation: 'kucharka',
    description:
      'Grubo ciosana. Policzki jak u bullteriera. Pachnie cebulą i tytoniem',
    background:
      "Irma mieszka przy St. James's Street 18 dłużej niż ktokolwiek, pracowała już dla poprzedniej rodziny, Buckleych. Niechętnie mówi o rzeczach, które widziała, ale jest szczerze smutna i przerażona tym, co stało się z Ginny Hess.",
    traits: ['Przesądna', 'Bezpośrednia', 'Zatrwożona'],
    },
    {
    id: 'constance-head',
    name: 'Constance Head',
    occupation: 'sąsiadka',
    description:
      'Przenikliwe spojrzenie. Zbyt ciasny gorset. Siwe pasma we włosach',
    background:
      "Constance jest wdową i sąsiadką Beale'ów. Podobnie jak pani Thicket, wie co nieco o domu pod numerem 18 przy St. James's Street, mieszkając obok przez większość swojego dorosłego życia. Z pewnością chętnie podzieli się tym, co wie, w zamian za trochę soczystych plotek.",
    traits: ['Plotkarska', 'Wścibska', 'Dobrze Poinformowana'],
    },

    // Limehouse Lurker
    {
    id: 'chen-bao',
    name: 'Chen Bao',
    alias: 'Jen Johnson',
    occupation: 'liderka społeczności',
    description:
      'Kojące usposobienie. Ciemna suknia z tafty. Włosy spięte w orientalny kok jadeitową spinką.',
    background:
      "Jen prowadzi zyskowny lokal z opium i jest nieformalną liderką niewielkiej chińskiej społeczności imigrantów w Limehouse. Poważnie podchodzi do swojej roli i opiekuje się prawie każdym, kto przychodzi do niej po pomoc.",
    traits: ['Spokojna', 'Pomysłowa', 'Opiekuńcza'],
    },
    {
    id: 'sun-mask',
    name: 'Człowiek w Słonecznej Masce',
    occupation: 'bywalec palarni opium',
    description:
      'Złota smokingowa marynarka i żółte jedwabne spodnie. Miękkie kapcie na nogach. Półmaska w kształcie słońca ukrywająca jego tożsamość.',
    background:
      "Człowiek w Słonecznej Masce twierdzi, że jest członkiem Rodziny Królewskiej lub innym ważnym członkiem społeczeństwa, w zależności od tego, kiedy go zapytacie; mówi, że nosi maskę, aby ukryć swoją tożsamość.",
    traits: [' Kryptyczny', 'Wyluzowany', 'Bezceremonialny'],
    },
    {
    id: 'rory-bell',
    name: 'Rory Bell',
    occupation: 'mąż',
    description:
      'Umazany sadzą. Kwaśny zapach. Przybity i przygięty życiem',
    background:
      "Rory jest robotnikiem portowym w Regent's Canal Dock. Chce zgłosić na policję sprawę śmierci jego żony, Charly, ale Jen Johnson wywiera na niego dużą presję, aby był cicho i pozwolił jej zająć się sprawą.",
    traits: ['Przepraszający', 'Onieśmielony', 'Niewykształcony'],
    },
    {
    id: 'franklin-horsford',
    name: 'Franklin Horsford',
    occupation: 'właściciel pubu „Dog & Whistle"',
    description:
      'Spocona twarz. Owłosione ramiona. Czarny fartuch',
    background:
      "Franklin prowadzi dochodowy pub „Dog & Whistle\" i zgadza się z Jen, że nic dobrego nie wyniknie z wciągania władz w obecne kłopoty.",
    traits: ['Przyjazny', 'Szczery do bólu', 'Bezpośredni'],
    },
    {
    id: 'elma-thorpe',
    name: 'Elma Thorpe',
    occupation: 'stała klientka „Dog & Whistle"',
    description:
      'Zaniedbane siwe włosy. Owinięta kocem, narzekająca na zimno. Właśnie kończy swoje ale',
    background:
      "Elma jest stałą bywalczynią „Dog & Whistle\". Wie co się dzieje wokół Canal Dock i chętnie opowie, co wie, jeśli postawisz jej drinka.",
    traits: ['Pijana', 'Wulgarna', 'Obrotna'],
    },
    {
    id: 'lin-bohai',
    name: 'Lin Bohai',
    occupation: 'żeglarz',
    description:
      'Przystojny uśmiech. Zapach morza. Zniszczony biały mundur marynarza',
    background:
      "Lin Bohai i Zhao Donghai byli przyjaciółmi i służyli na tym samym statku. Ich statek ma odpłynąć za tydzień; chciałby dowiedzieć się, co stało się z jego przyjacielem przedtem.",
    traits: ['Współczujący', 'Hazardzista', 'Obieżyświat'],
    },
    {
    id: 'lawrence-chesterfield',
    name: 'Lawrence Chesterfield',
    occupation: 'dyrektor szkoły',
    description:
      'Niespokojny. Brązowy, trzyczęściowy garnitur . Głos zawsze zaczyna się nisko, ale kończy wysoko.',
    background:
      "Lawrence jest dyrektorem szkoły w Limehouse. Jest przepracowany, wyczerpany i robi wszystko, aby stłumić plotki o krwiopijczych potworach.",
    traits: ['Surowy', 'Oficjalny', 'Wyczerpany'],
    },
    {
    id: 'limehouse-lurker',
    name: 'Zmora z Limehouse',
    occupation: 'wampir',
    description:
      'Ciało dziecka. Blady i wychudzony. Czai się w cieniu krokwi.',
    background:
      "Wampir fizycznie jest dzieckiem, ale to nie znaczy, że jest młody. Wampiry nigdy nie starzeją się fizycznie poza wiek, w którym zostały 'przemienione', a stary wampir wymaga zupełnie innego podejścia niż młody...",
    traits: ['Pragnący krwi', 'Niebezpieczny', 'Ukryty w cieniu'],
    },
    {
    id: 'red-katherine',
    name: 'Ruda Katherine',
    occupation: 'prostytutka',
    description:
      'Burza rudych loków. Ładna, ale postarzała ponad wiek. Ziemista cera',
    background:
      "Siostra/partnerla/przyjaciółka Miękkiego Jimmiego, zamordowanego przez Zmore z Limehouse. Pracuje jako prostytutka w Limehouse. Została naznaczona przez Zmorę razem z Ludwikiem.",
    traits: ['Uzależniona od opium', 'Znerwicowana', 'Ufna'],
    },
    {
    id: 'big-bertha',
    name: 'Gruba Berta',
    occupation: 'prostytutka',
    description:
      'Otyła i wielka. Mocny makijaż. Można utonąć w jej dekolcie.',
    background:
      "Prostytyka z Limehouse. Bardzo w guście Sikha. To ona wpuściła do palarni opium Zmorę z Limehouse.",
    traits: ['Czułe objęcia','Wielka'],
    },
    
]

/**
 * Merges character base data with Polish text to produce full Character objects.
 */
export function getCharactersPl(): Character[] {
  return characters.map((char) => {
    const text = charactersPl.find((c) => c.id === char.id)
    if (!text) {
      throw new Error(`Missing Polish text for character: ${char.id}`)
    }
    return {
      ...char,
      name: text.name,
      alias: text.alias,
      occupation: text.occupation,
      description: text.description,
      background: text.background,
      traits: text.traits,
      conditions: text.conditions,
      masks: text.masks?.map((maskGroup) => ({
        ...maskGroup,
        masks: maskGroup.masks.map((m) => ({
          ...m,
          used: false,
        })),
      })),
    }
  })
}
