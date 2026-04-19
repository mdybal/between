import { threats } from './threats'
import type { Threat, ThreatQuestion, MaskSection } from '@/types'

/**
 * Polish threat text data.
 *
 * This file contains Polish translations of text fields (name, description,
 * knownFacts, questions) for threats. The non-text fields (id, type,
 * threatLevel, status, firstEncountered, clueImages) are stored in threats.ts.
 *
 * To add Polish translations, add entries with the same id as in threats_en.ts
 * and replace the text fields with Polish translations.
 */
export interface ThreatText {
  id: string
  name: string
  description: string
  knownFacts?: string[]
  questions: ThreatQuestion[]
  mask?: MaskSection
}

export const threatsPl: ThreatText[] = [
  {
    id: 'mastermind-conspiracy',
    name: 'Spisek Theodory Brathwaite',
    description:
      'Theodora Brathwaite studiuje ogromną mapę Londynu zamontowaną na ścianie gabinetu. Mosiężne szpilki w kształcie sztyletów zaznaczają różne miejsca w mieście, lokalizacje ważne dla jakiegoś wielkiego planu (można zauważyć szpilkę na Domu Hargrave\'a). Nagle wstaje, przemierza pokój i wbija jeden z mosiężnych sztyletów w Pałac Buckingham.',
    questions: [
      {
        question: 'Jak Mistrzyni Zbrodni zamierza zniszczyć Koronę? (Złożoność: 8)',
      }
    ],
  },
    {
    id: 'james-street-ghost',
    name: 'Duch z St. James\'s Street',
    description:
      'Stary egzemplarz „The Illustrated Police News", tabloidu słynącego z pikantnych, krwiopijczych opowieści wątpliwego pochodzenia, zawiera historię o młodej pokojówce, Ginny Hess, która została znaleziona martwa — w domu jej pracodawcy przy St. James\'s Street kilka miesięcy temu. Historia głosi, że dom jest nawiedzony i że niemal na pewno to widok ducha spowodował, że młoda pokojówka zmarła z czystego przerażenia. Po pobieżnym dochodzeniu dowiadujecie się dokładnego adresu nawiedzonego domu — 18 St. James\'s Street — oraz nazwiska rodziny, która tam mieszka, Beale\'ów.',
    questions: [
      {
        question: 'Jak sprawić, by ten duch przeszedł do następnego świata? (Złożoność: 6)',
      },
    ],
    mask: {
      title: 'Maska Niespokojnych',
      description:
        'Każdy Łowca opowiada retrospekcję ze swojego dzieciństwa, gdy doświadczył nawiedzenia.',
    },
  },
  {
    id: 'limehouse-lurker',
    name: 'Zmora z Limehouse',
    description:
      'Jen Johnson, właścicielka palarni opium w Limehouse, opowiada wam historię, która jeszcze nie dotarła do Scotland Yardu ani do gazet: trzy osoby zostały znalezione martwe w ostatnich dniach, ciała całkowicie pozbawione krwi. Pierwszą był prostytutka o imieniu Miękki Jimmy, znaleziony w ciemnym rogu palarni opium; drugą była młoda matka, Charla Bell, znaleziona w zaułku za szkołą w Limehouse; a trzecią był chiński żeglarz, Zhao Donghai, znaleziony przed barem w pobliżu Regent\'s Canal Dock, „Dog & Whistle". Jen, nieformalna liderka społeczności w Limehouse, trzyma ciała w piwnicy; waha się, czy iść do władz, ponieważ obawia się, że to sprawi kłopoty niewielkiej, ale kwitnącej chińskiej społeczności imigrantów w dzielnicy. Słyszała, że Dom Hargrave ma doświadczenie w sprawach takich jak ta, i poprosiła was o pomoc.',
    questions: [
      {
        question: 'Czy wampir jest młody czy stary? (Złożoność: 4)',
      },
    ],
    mask: {
      title: 'Maska Słońca',
      description:
        'Każdy Łowca opowiada sen, który kiedyś miał o pierwotnej Ziemi: cofając się w czas starożytnego morza, cofając się w czas, gdy duchy chodziły po ziemi, gdy Słońce było nowe, a starożytni Bogowie władali światem.',
    },
  },
]

/**
 * Merges threat base data with Polish text to produce full Threat objects.
 */
export function getThreatsPl(): Threat[] {
  return threats.map((threat) => {
    const text = threatsPl.find((t) => t.id === threat.id)
    if (!text) {
      throw new Error(`Missing Polish text for threat: ${threat.id}`)
    }
    return {
      ...threat,
      name: text.name,
      description: text.description,
      knownFacts: text.knownFacts,
      questions: text.questions,
      mask: text.mask,
    }
  })
}