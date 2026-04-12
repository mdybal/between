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
  traits: string[]
  conditions?: string[]
  masks?: { category: string; masks: { name: string }[] }[]
}

export const charactersPl: CharacterText[] = [
  {
    id: 'evelyn-ashworth',
    name: 'Evelyn Ashworth',
    occupation: 'Dziennikarka śledcza',
    description:
      'Ostra na język korespondentka „The Illustrated London News", Evelyn wykorzystuje swoje credenciamento prasowe, by dostawać się tam, gdzie inni nie śmią.',
    background:
      'Urodzona w Bath w szanowanej, ale ubogiej rodzinie, Evelyn wdarła się do Fleet Street dzięki niezłomnej wytrwałości. Jej śledztwa w sprawie slumsów East Endu zaprowadziły ją w kręgi dziwnego i strasznego.',
    traits: ['Przenikliwa', 'Uporczywa', 'Współczująca', 'Lekkomyślna'],
    conditions: ['Wstrząśnięta', 'Obsesyjna'],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Zrozpaczona Córka' },
          { name: 'Uliczny Spryciarz' },
          { name: 'Debiutantka' },
        ],
      },
      {
        category: 'Maska Junony',
        masks: [
          { name: 'Nieustraszona Reporterka' },
          { name: 'Socjalna Gwiazda' },
        ],
      },
    ],
  },
  {
    id: 'cornelius-vane',
    name: 'Dr Cornelius Vane',
    alias: 'Doktor',
    occupation: 'Alienista i badacz okultyzmu',
    description:
      'Lekarz umysłu, który widział zbyt wiele, by lekceważyć nadnaturalne. Jego praktyka na Harley Street to przykrywka dla głębszych badań.',
    background:
      'Wykształcony w Wiedniu pod okiem Charcota, Vane powrócił do Londynu prześladowany przez to, co widział w europejskich azylach. Teraz bada punkt przecięcia obłędu i okultyzmu.',
    traits: ['Metodyczny', ' Tajemniczy', 'Współczujący', 'Nękany'],
    conditions: ['Nękany'],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'ZrozpaczonyWdowiec' },
          { name: 'Gorliwy Student' },
          { name: 'Złamany Żołnierz' },
        ],
      },
      {
        category: 'Maska Junony',
        masks: [
          { name: 'Szanowany Lekarz' },
          { name: 'Poszukiwacz Okultyzmu' },
        ],
      },
    ],
  },
  {
    id: 'silas-morrow',
    name: 'Silas Morrow',
    occupation: 'Były Inspektor Policji Metropolitalnej',
    description:
      'Wyrzucony ze służby po zgłoszeniu zjawisk nadnaturalnych, Silas teraz działa jako prywatny agent dochodzeniowy, który nie ma już nic do stracenia.',
    background:
      "Dwadzieścia lat w policji dało Silasowi sieć informatork i głęboką nieufność wobec władzy. Sprawa, która zakończyła jego karierę, otworzyła mu oczy na to, co czai się pod szacowną powierzchnią Londynu.",
    traits: ['Wytrwały', 'Cyniczny', 'Lojalny', 'Zmęczony'],
    conditions: [],
    masks: [
      {
        category: 'Maska Przeszłości',
        masks: [
          { name: 'Lojalny Konstabl' },
          { name: 'Nękany Detektyw' },
          { name: 'Skompromitowany Inspektor' },
        ],
      },
      {
        category: 'Maska Junony',
        masks: [
          { name: 'Szorstki Informatyk' },
          { name: 'Zmęczony Weteran' },
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
