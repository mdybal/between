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
    occupation: 'Antagonistka',
    description:
      'Mroczna postać, której prawdziwe motywy pozostają ukryte. Znana jedynie z reputacji i szeptanych ostrzeżeń.',
    background:
      "Niewiele wiadomo o pochodzeniu Theodory Brathwaite. Porusza się przez podziemia Londynu z niepokojącą łatwością, zostawiając za sobą chaos.",
    traits: ['Kalkulująca', 'Unikająca', 'Niebezpieczna'],
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
