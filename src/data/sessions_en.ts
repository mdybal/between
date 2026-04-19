import { sessions } from './sessions'
import type { Session, Scene } from '@/types'

/**
 * English session text data.
 *
 * This file contains all translatable text fields (title, summary, scenes).
 * The non-text fields (id, sessionNumber, date, tags, npcIds) are stored in sessions.ts.
 */
export interface SessionText {
  id: string
  title: string
  summary: string
  scenes?: Scene[]
}

export const sessionsEn: SessionText[] = [
  {
    id: 'session-01',
    title: 'Summer in Full Bloom',
    summary:
      'A mysterious murder of a chambermaid on St. James Street. A vampire lurking in the Limehouse district. And the enigmatic Theodora Brathwaite, who ensnares all of London in her web. The Hunters from Hargrave House must face these threats while grappling with their own demons and secrets from the past.',
    scenes: [
      {
        label: 'Prologue',
        phase: 'Dawn',
        prose: [
          'In 1871, in London. A monumental city, rich, crowded, and dirty. At the heart of Belgrave Square, in a neogothic residence called Hargrave, a peaceful Saturday morning was shattered by a whirlwind of extraordinary events, drawing its eccentric residents into a web of mysteries and dangers.',
        ],
      },
      {
        label: 'The Beginning of the Day at Hargrave House',
        phase: 'Day',
        prose: [
          'Lord Richard, a man in his mature thirties, with over a decade of African expeditions behind him, devoted himself to writing memoirs and sketching maps. Ludwig, still claiming to merely renting a room in the attic, has long became a full member of Hargrave House, was writing another of his monthly, fabricated letters to his mother in Pomerania, describing fictitious medical studies at the Royal College of Surgeons on Sloane Square.',
          'Meanwhile, Singh, returning from the market with groceries, picked up a copy of the "Illustrated Police News" thrown by a newsboy and placed it on the foyer side table. At that same moment, George, the spirit of a long-dead Hunter materialized, amid smoke and fire. Seeing his arrival, everyone understood that something important had happened. George, feeling a strange connection to one of the articles, pointed to the third page. The tabloid reported the death of a young chambermaid, Ginny Hess, found dead "of fright" at her employers\' home on St. James Street. Scotland Yard deemed it death from natural causes, but the article suggested a haunting. George\'s attention was drawn to a fragment describing a piece of scorched Bible found in Ginny\'s clenched hand. The Hunters decided to investigate the case and find a way to send the spirit to the afterlife.',
        ],
      },
      {
        label: 'Investigation on St. James Street',
        phase: 'Day',
        prose: [
          'Lord Dick and Ludwig went to 18 St. James Street. On site, they were greeted by the cook, Irma Thicket, whom simultaneously tried to calm the dog Pythagoras. To everyone\'s surprise, Ludwig instantly bonded with the animal and calmed it with just a glance. At the same time, the young medium noticed torn wallpaper and a series of numbers written on the wall near the entrance door.',
          'Meanwhile, Singh went to the city archives to check the building\'s history. He learned that the house belonged to the Beale family (Harold, an accountant, his wife Alice, and children: Roger and Mary Alice) only recently. The Beales acquired the property at a very bargain price, and the previous family sold it when a marital scandal occurred. Singh also discovered that the entire row of townhouses on St. James Street, except number 18, belonged to the mysterious Theodora Brathwaite.',
          'Lord Richard and Ludwig were shown into the sitting room by the cook, Irma. There Lord Richard noticed 7-8 year old Roger Beale. The boy, to everyone\'s amazement (and amusement), shouted: "You\'re here to see the bloody ghost?!" For three pence, Roger offered to show them where the ghost was. He led Lord Richard to the staircase, toward the kitchen, saying the ghost was most often there. He pointed to a stain on the wall, calling it "ectoplasm." Lord Richard, to his disappointment, stated it was just a regular water stain.',
          'Soon Alice Beale appeared with little Mary Alice in her arms. She told them that Ginny Hess was her daughter\'s nanny and was found dead in the children\'s room, next to the crib. Ludwig went with Alice to the children\'s room in the attic. There, while Alice was putting Mary Alice down for sleep, Ludwig, using a blood ritual, tried to see the circumstances of Ginny\'s death. He experienced a fleeting flash, seeing Ginny and Mary Alice arguing in the room in an unknown language—the same one that Ludwig had unconsciously hummed earlier in a lullaby.',
          'George, in the meantime, made an astral journey to 18 St. James Street. It wasn\'t easy to find the house, fortunately the presence of the other Hunters helped him navigate through the astral field. The entrance to Mary-Alice\'s room was guarded by strangely sealed, spiritual doors. To his frustration, just as he managed to force them open, he felt some force pulling him back to Hargrave House. When he woke up in the house, he saw a black carriage with a blue coat of arms painted on the door. Inside sat a black woman who... was looking straight at him!',
        ],
      },
      {
        label: 'The Conservatory at Hargrave House',
        phase: 'Night',
        prose: [
          'The conservatory at Hargrave House had in the past witnessed horrific crimes committed by one of the former Hunters, Roger "the Marauder." Roger lured his victims into the orangery, drugged them with poisonous flowers he cultivated there, then performed ritual murders on them, cutting out the tongue and eyes of the still-living victim while intoning blasphemous psalms.',
        ],
        highlightBox: {
          variant: 'clue',
          title: 'Roger the Reaver move',
          content:
            'The first time you murder a Side Character in the Conservatory in the manner of Roger the Reaver, clear all your Conditions, including Conditions that can’t be cleared in the normal ways, and then mark the first box below. Hereafter, whenever you murder someone in cold blood, mark the next box. ',
          items: [
            'Increase your Sensitivity by 2 (max 3) as your mind opens up to the infinite possibilities of the universe, and then take the Condition: I Am. This Condition can never be cleared',
            'Increase your Reason by 2 (max 3) as your mind becomes a perfect grid for organizing and tracking your prey, and then take the Condition: Roger. This Condition can never be cleared.',
            'Increase your Vitality by 2 (max 3) as the power of the Reaver courses through you. Describe how your body outwardly manifests this change, and then take the Condition: The Reaver. This Condition can never be cleared.'
          ]
        },
      },
      {
        label: 'George\'s Night Investigation',
        phase: 'Night',
        prose: [
          'George did not idle at night while the other Hunters slept. He went to the Beale residence again. The journey nearly cost him his life (again), as it turned out the house was haunted by not one, but a whole gang of spirits! He drove them away, however, and was able to investigate every nook and cranny of the house undisturbed. In Mary-Alice\'s room, he saw a strange glow emanating from one window. When he looked through it, he saw not a panorama of London, but a country house standing on a hill, engulfed in flames!',
        ],
      },
      {
        label: 'New Threat — Vampires and Opium Trade',
        phase: 'Day',
        prose: [
          'The next day Singh, while shopping at the market, met Jenny Johnson (Chen Bao), the leader of the local Chinese diaspora and owner of an opium den. Jenny asked for help: three bodies had been found in the area, completely drained of blood, pointing to supernatural forces. The victims were a male prostitute "Soft Jimmy," a young mother Charla Bell, and a Chinese sailor.',
          'Singh, Ludwig, and George (still in astral form) went to the opium den in Limehouse. George stayed on the ground floor, and Singh and Ludwig went to the basement where Jenny kept the bodies. Pale, desiccated, with unusual slash wounds instead of typical vampire bites. Moreover, all victims were missing both fangs and one incisor. George, examining Jimmy\'s spirit, discovered that his last emotion was "insincere shame" related to mocking an older client with erection problems. Ludwig concluded that the unusual wounds indicated that the vampire has a child\'s body—whether it is a young or old vampire remains to be determined. Singh also found accounting books in the basement which, though disguised as sales of food and other products, actually documented opium trade. Many large orders were marked with the initials "th," pointing to Theodora Brathwaite!',
          'A mysterious man in a sun mask approached George, who apparently knew more about the medium than he should. Ludwig reflexively reached for the stranger\'s mask but stopped at the last moment—he felt that removing it would be extremely dangerous. The man did not seem upset—he apologized to Ludwig and said (evidently lying) that he must remain incognito because he is a member of the royal family. However, he pointed George to Ruddy Katherine, Jimmy\'s partner.',
          'Katherine, with tears in her eyes, told Ludwig that she was the one who found Jimmy\'s body. She mentioned that as she approached him, she saw a "spiral of blood" hanging in the air above his body. When she pointed to the exact place where the spiral was, a heavy drop of blood fell onto her palm. Ludwig felt another one on his cheek. When he looked up, he saw a small shadow that climbed up the roof beams and fled into the darkness! Ludwig decided to perform a ritual, marking the entrances with blood symbols to forbid the vampire entry to the building.',
          'In the meantime, George, having persuaded Singh, got him to use the services of one of the local prostitutes. Singh hired Fat Berta and (un)aware that his master\'s spirit was watching the whole event, went with her to a back room. The prostitute told the Sikh that on the day of Jimmy\'s death, a strange boy knocked on the opium den door. He claimed to be a courier with a message for one of the guests and asked if he could come in. Berta let him in, but was surprised by the boy\'s unusual accent.',
        ],
      },
      {
        label: 'A Nosy Neighbor from No. 17 St. James',
        phase: 'Day',
        prose: [
          'During this time, Lord Dick went again to the Beale residence—he decided to buy their dog from Harold. Before he could enter, Mrs. Constance Head, the Beales\' neighbor, accosted him on the sidewalk. She said she was not entirely happy with the new neighborhood because the Beales did not come from any respectable family and were significantly less wealthy than the rest of the street\'s residents, and this poorly affected the area\'s perception. Lord Richard began questioning the woman about the previous owners—just as she was about to tell them, her voice suddenly stuck in her throat and she fell dead to the ground!',
          'When the police arrived and the old woman\'s body was taken to the morgue, Richard went to Harold—the man was surprised by the offer to sell the family dog, but the lord never even assumed his offer might be rejected. Having settled one matter, he decided to check, in passing, what Harold knew about the previous owners. Unfortunately, the Beales did not know them directly, Harold works for a client of the former owner. Meanwhile, Lord Dick noticed very strange entries in Mr. Beale\'s books such as "dream catchers," "gifts for pigs," or "thought castings." The man seemed completely unaware of these entries.',
        ],
      },
      {
        label: 'Epilogue',
        phase: 'Dusk',
        prose: [
          'In the background of all these events, Theodora Brahway, a figure already noticed by George in a carriage before Hargrave House, was in her residence outside London. A black woman, in her fifties, with a sapphire on her throat, was studying a map of London on which pins shaped like daggers marked various places, including Hargrave House. Theodora finished her rum, approached the map, and with her knee drove a pin into the very center of Buckingham Palace, revealing her ultimate goal. The Hunters must learn how the Mistress of Crime intends to destroy the Crown and stop her at all costs!',
        ],
      },
    ],
  },
]

/**
 * Merges session base data with English text to produce full Session objects.
 */
export function getSessionsEn(): Session[] {
  return sessions.map((session) => {
    const text = sessionsEn.find((s) => s.id === session.id)
    if (!text) {
      throw new Error(`Missing English text for session: ${session.id}`)
    }
    return {
      ...session,
      title: text.title,
      summary: text.summary,
      scenes: text.scenes,
    }
  })
}