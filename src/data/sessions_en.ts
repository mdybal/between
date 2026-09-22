import { sessions } from './sessions'
import type { Session, Scene, HtmlString } from '@/types'

/**
 * English session text data.
 *
 * This file contains all translatable text fields (title, summary, scenes).
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
 *
 * String quoting convention
 * -------------------------
 * Prose blocks (`prose` arrays, `summary`, `highlightBox.content`, etc.) use
 * backtick template literals. This keeps prose readable, avoids escaping
 * apostrophes inside character dialogue, and lets a paragraph span multiple
 * editor lines if it ever needs to. Short identifiers (`label`, `phase`,
 * `title`) use single quotes — backticks there would be noise.
 */
export interface SessionText {
  id: string
  title: string
  summary: HtmlString
  scenes?: Scene[]
}

export const sessionsEn: SessionText[] = [
  {
    id: 'session-01',
    title: 'Summer in Full Bloom',
    summary: `A mysterious murder of a chambermaid on St. James Street. A vampire lurking in the Limehouse district. And the enigmatic Theodora Brathwaite, who ensnares all of London in her web. The Hunters from Hargrave House must face these threats while grappling with their own demons and secrets from the past.`,
    scenes: [
      {
        label: 'Prologue',
        phase: 'Dawn',
        prose: [
          `In 1871, in London. A monumental city, rich, crowded, and dirty. At the heart of Belgrave Square, in a neogothic residence called Hargrave, a peaceful Saturday morning was shattered by a whirlwind of extraordinary events, drawing its eccentric residents into a web of mysteries and dangers.`,
        ],
      },
      {
        label: 'The Beginning of the Day at Hargrave House',
        phase: 'Day',
        prose: [
          `Lord Richard, a man in his mature thirties, with over a decade of African expeditions behind him, devoted himself to writing memoirs and sketching maps. Ludwig, still claiming to merely renting a room in the attic, has long became a full member of Hargrave House, was writing another of his monthly, fabricated letters to his mother in Pomerania, describing fictitious medical studies at the Royal College of Surgeons on Sloane Square.`,
          `Meanwhile, Singh, returning from the market with groceries, picked up a copy of the "Illustrated Police News" thrown by a newsboy and placed it on the foyer side table. At that same moment, George, the spirit of a long-dead Hunter materialized, amid smoke and fire. Seeing his arrival, everyone understood that something important had happened. George, feeling a strange connection to one of the articles, pointed to the third page. The tabloid reported the death of a young chambermaid, Ginny Hess, found dead "of fright" at her employers' home on St. James Street. Scotland Yard deemed it death from natural causes, but the article suggested a haunting. George's attention was drawn to a fragment describing a piece of scorched Bible found in Ginny's clenched hand. The Hunters decided to investigate the case and find a way to send the spirit to the afterlife.`,
        ],
      },
      {
        label: 'Investigation on St. James Street',
        phase: 'Day',
        prose: [
          `Lord Dick and Ludwig went to 18 St. James Street. On site, they were greeted by the cook, Irma Thicket, whom simultaneously tried to calm the dog Pythagoras. To everyone's surprise, Ludwig instantly bonded with the animal and calmed it with just a glance. At the same time, the young medium noticed torn wallpaper and a series of numbers written on the wall near the entrance door.`,
          `Meanwhile, Singh went to the city archives to check the building's history. He learned that the house belonged to the Beale family (Harold, an accountant, his wife Alice, and children: Roger and Mary Alice) only recently. The Beales acquired the property at a very bargain price, and the previous family sold it when a marital scandal occurred. Singh also discovered that the entire row of townhouses on St. James Street, except number 18, belonged to the mysterious Theodora Brathwaite.`,
          `Lord Richard and Ludwig were shown into the sitting room by the cook, Irma. There Lord Richard noticed 7-8 year old Roger Beale. The boy, to everyone's amazement (and amusement), shouted: "You're here to see the bloody ghost?!" For three pence, Roger offered to show them where the ghost was. He led Lord Richard to the staircase, toward the kitchen, saying the ghost was most often there. He pointed to a stain on the wall, calling it "ectoplasm." Lord Richard, to his disappointment, stated it was just a regular water stain.`,
          `Soon Alice Beale appeared with little Mary Alice in her arms. She told them that Ginny Hess was her daughter's nanny and was found dead in the children's room, next to the crib. Ludwig went with Alice to the children's room in the attic. There, while Alice was putting Mary Alice down for sleep, Ludwig, using a blood ritual, tried to see the circumstances of Ginny's death. He experienced a fleeting flash, seeing Ginny and Mary Alice arguing in the room in an unknown language—the same one that Ludwig had unconsciously hummed earlier in a lullaby.`,
          `George, in the meantime, made an astral journey to 18 St. James Street. It wasn't easy to find the house, fortunately the presence of the other Hunters helped him navigate through the astral field. The entrance to Mary-Alice's room was guarded by strangely sealed, spiritual doors. To his frustration, just as he managed to force them open, he felt some force pulling him back to Hargrave House. When he woke up in the house, he saw a black carriage with a blue coat of arms painted on the door. Inside sat a black woman who... was looking straight at him!`,
        ],
      },
      {
        label: 'The Conservatory at Hargrave House',
        phase: 'Night',
        prose: [
          `The conservatory at Hargrave House had in the past witnessed horrific crimes committed by one of the former Hunters, Roger "the Marauder." Roger lured his victims into the orangery, drugged them with poisonous flowers he cultivated there, then performed ritual murders on them, cutting out the tongue and eyes of the still-living victim while intoning blasphemous psalms.`,
        ],
        highlightBox: {
          variant: 'clue',
          title: 'Roger the Reaver move',
          content: `The first time you murder a Side Character in the Conservatory in the manner of Roger the Reaver, clear all your Conditions, including Conditions that can't be cleared in the normal ways, and then mark the first box below. Hereafter, whenever you murder someone in cold blood, mark the next box.`,
          items: [
            `Increase your Sensitivity by 2 (max 3) as your mind opens up to the infinite possibilities of the universe, and then take the Condition: I Am. This Condition can never be cleared`,
            `Increase your Reason by 2 (max 3) as your mind becomes a perfect grid for organizing and tracking your prey, and then take the Condition: Roger. This Condition can never be cleared.`,
            `Increase your Vitality by 2 (max 3) as the power of the Reaver courses through you. Describe how your body outwardly manifests this change, and then take the Condition: The Reaver. This Condition can never be cleared.`,
          ],
        },
      },
      {
        label: 'George\'s Night Investigation',
        phase: 'Night',
        prose: [
          `George did not idle at night while the other Hunters slept. He went to the Beale residence again. The journey nearly cost him his life (again), as it turned out the house was haunted by not one, but a whole gang of spirits! He drove them away, however, and was able to investigate every nook and cranny of the house undisturbed. In Mary-Alice's room, he saw a strange glow emanating from one window. When he looked through it, he saw not a panorama of London, but a country house standing on a hill, engulfed in flames!`,
        ],
      },
      {
        label: 'New Threat — Vampires and Opium Trade',
        phase: 'Day',
        prose: [
          `The next day Singh, while shopping at the market, met Jenny Johnson (Chen Bao), the leader of the local Chinese diaspora and owner of an opium den. Jenny asked for help: three bodies had been found in the area, completely drained of blood, pointing to supernatural forces. The victims were a male prostitute "Soft Jimmy," a young mother Charla Bell, and a Chinese sailor.`,
          `Singh, Ludwig and George (still in astral form) went to the opium den in Limehouse. Ludwig stayed on the ground floor, and Singh and George went to the basement where Jenny kept the bodies. Pale, desiccated, with unusual slash wounds instead of typical vampire bites. On the basis of the wounds, the Hunters concluded that they were dealing with a vampire with a child's body—whether it is a young or old vampire remains to be determined. Moreover, all victims were missing both fangs and one incisor. George, examining Jimmy's spirit, discovered that his last emotion was "insincere shame" related to mocking an older client with erection problems. Singh also found in the basement accounting books which, though disguised as sales of food and other products, actually documented opium trade. Many large orders were marked with the initials "th," pointing to Theodora Brathwaite!`,
          `In the main hall of the opium den, a mysterious man in a sun mask addressed Ludwig, who apparently knew more about the medium than he should. Ludwig reflexively reached for the stranger's mask but stopped at the last moment—he felt that removing it would be extremely dangerous. The man did not seem upset—he apologized to Ludwig and said (evidently lying) that he must remain incognito because he is a member of the royal family. However, he pointed George to Ruddy Katherine, Jimmy's partner.`,
          `Katherine, with tears in her eyes, told Ludwig that she was the one who found Jimmy's body. She mentioned that as she approached him, she saw a "spiral of blood" hanging in the air above his body. When she pointed to the exact place where the spiral was, a heavy drop of blood fell onto her palm. Ludwig felt another one on his cheek. When he looked up, he saw a small shadow that climbed up the roof beams and fled into the darkness! Ludwig decided to perform a ritual, marking the entrances with blood symbols to forbid the vampire entry to the building.`,
          `In the meantime, George, having persuaded Singh, got him to use the services of one of the local prostitutes. Singh hired Fat Berta and (un)aware that his master's spirit was watching the whole event, went with her to a back room. The prostitute told the Sikh that on the day of Jimmy's death, a strange boy knocked on the opium den door. He claimed to be a courier with a message for one of the guests and asked if he could come in. Berta let him in, but was surprised by the boy's unusual accent.`,
        ],
      },
      {
        label: 'A Nosy Neighbor from No. 17 St. James',
        phase: 'Day',
        prose: [
          `During this time, Lord Dick went again to the Beale residence—he decided to buy their dog from Harold. Before he could enter, Mrs. Constance Head, the Beales' neighbor, accosted him on the sidewalk. She said she was not entirely happy with the new neighborhood because the Beales did not come from any respectable family and were significantly less wealthy than the rest of the street's residents, and this poorly affected the area's perception. Lord Richard began questioning the woman about the previous owners—just as she was about to tell them, her voice suddenly stuck in her throat and she fell dead to the ground!`,
          `When the police arrived and the old woman's body was taken to the morgue, Richard went to Harold—the man was surprised by the offer to sell the family dog, but the lord never even assumed his offer might be rejected. Having settled one matter, he decided to check, in passing, what Harold knew about the previous owners. Unfortunately, the Beales did not know them directly, Harold works for a client of the former owner. Meanwhile, Lord Dick noticed very strange entries in Mr. Beale's books such as "dream catchers," "gifts for pigs," or "thought castings." The man seemed completely unaware of these entries.`,
        ],
      },
      {
        label: 'Epilogue',
        phase: 'Dusk',
        prose: [
          `In the background of all these events, Theodora Brahway, a figure already noticed by George in a carriage before Hargrave House, was in her residence outside London. A black woman, in her fifties, with a sapphire on her throat, was studying a map of London on which pins shaped like daggers marked various places, including Hargrave House. Theodora finished her rum, approached the map, and with her knee drove a pin into the very center of Buckingham Palace, revealing her ultimate goal. The Hunters must learn how the Mistress of Crime intends to destroy the Crown and stop her at all costs!`,
        ],
      },
    ],
  },
  {
    id: 'session-02',
    title: 'Ghosts, Vampires and Seafolk',
    summary: `Hargrave House frees the poor soul haunting the St. James street. They learn that Limehouse Lurker is an ancient vampire trapped in child's body. New dangers lurk just below the surface of Thames.`,
    scenes: [
      {
        label: 'The Story of the Ghost',
        phase: 'Dusk',
        prose: [
          `The Hunters found themselves at dusk, contemplating the the haunting at 18 St. James Street. George, outlined the prevailing theory: a 200-year-old crime involving an illegitimate child of Mr. Winterbottom, who was due to enter an arranged marriage. This child, born to a servant, was subsequently strangled and paid for ("pig gifts") by a cook. The retribution came, when the house burned with all the residents within. Now all the souls are trapped in-between the worlds, until the murdered child can tell its story to a living soul. Unfortunately, only those atuned to the occult, are wise enough to understand the child, and strong enough to survive the telling of such terrible story.`,
        ],
      },
      {
        label: 'Exorcism of the St. James Street Ghost',
        phase: 'Night',
        prose: [
          `The group decides to attempt to banish the spirit immediately. Singh prepares protective sigils at the attic, under Ludwig's supervision, while George prepares to listen to the mournful tale. When the child starts speaking, other ghosts assail the Hunters, but the magical circle holds. When the last words of the tale are spoken, the ghosts of St. James Street are pulled from Earth - and George is pulled with them! Fortunately, the spectral Hunter manages to untangle his consciousness from the ghost vortex and comes back.`,
        ],
      },
      {
        label: 'Dog & Whistle',
        phase: 'Night',
        prose: [
          `Lord Richard ventured to the "Dog & Whistle" pub - where the second victim of Limehouse Lurker was found. The victim was a chinese sailor, Zhao Donghai, and Lord Richard hoped to find his crewmates there. Unfortunately, he only met an old, local drunkard, Elma Thorpe. For a drink, she pointed the side-alley when Zhao's body was found and claimed that she heard "small, childlike voices" discouraging her from drinking coming from there late at nights.`,
          `When investigating  the crime scene, Lord Bellows  was confronted by a street gang of street urchins, not happy that someone's interfering with Lurker. He courageously fought them off with his cane, aided by Pitagoras.  `,
        ],
      },
      {
        label: 'Ilustrated Police News',
        phase: 'Day',
        prose: [
          `News soon broke in the "Illustrated Police Stories" that the house on St. James Street is no longer haunted, thanks to the Hargrave House. Still, the Beale family is moving out, as Theodora Breathwaite had acquired the property, completing her collection of houses on the street.`,
          `A couple of days later, a journalist from the same newspaper visits Hargrave Hunters. Impressed by their work on St. James Street, he wants to sell them a bit of news, before they are published - hoping for an exlcusive story, when the Hunters find more. As the story goes, a "fish monster" or "merman" prowls the grounds of Cremorne Gardens, luring people with a siren song. Allegedly, Simon Piemon and Beluah Trum, a young couple, were recent victims of its attack.`,
        ],
      },
      {
        label: 'Tea Clipper and Chinese Sailor',
        phase: 'Day',
        prose: [
          `Lord Dick decides to find the chinese sailors at the docks. He identifies the clipper that Zhao worked on and contacts Lin, a friend of the deceased sailor. Together they return to the alleys behind "Dog & Whistle" trying to reconstruct the events of the fatal night. Lin explained that the last time he saw Zao, he had chased some "rascals" into the alley. Lin was to drunk to follow suit, but guided Richard to the spot. When they stepped in the gloomy dark of the back alley, Lin was suddenly lifted into the air, by some unseen force. With great effort, Lord Bellows was able to pull the man back into the sunlight, where the mysterious force let go. The chinese sailor run bak to his ship, promising never to return to London.`,
        ],
      },
      {
        label: 'To the Opium Den again',
        phase: 'Day',
        prose: [
          `Ludwig decided to drop by Jen's opium den and ensure that his wards were still in place. There he met the mysterious man in the sun mask again. Drawn by curiosity he joined him in the private alcove and soon started hallucinating from the air filled with opium smoke. When he came to his senses, he found himself in a posh smoking room - decorated fully in saphire-blue.carpets, furnitures, floral wallpapers and curtains - all in blue. Hanging on the walls, were the weird paintings of sun (or suns) shining above strange worlds, that did not resemble Earth. Panicked he dashed out of the nearest door, and landed back in the alcove with the Man in the Sun Mask. He hastily made his goodbyes and decided to spend some time under "normal" sun. `,
        ],
      },
      {
        label: 'Afternoon in Cremorne Gardens',
        phase: 'Day',
        prose: [
          `Singh revealed a personal connection to the park's owner, Thomas Simpson. He once worked for the proprietor as one of the house staff, only to be falsely accused of theft by Simpson's daughter, Abigail. As such, he was not keen to visit the Gardens. Instead, he arranged a meeting with the victim, Beulah Thrum. The young woman was still shaken by the ordeal, but it seemed she was mostly worried for the well-being of her fiancé, as he was almost "scared to death" by the monster. To aid the investigation, she gave Singh the coat that she had been wearing that night, ripped by the creature's claws.`,
          `In one of the pockets, the inquisitive Sikh found an unopened letter. Beulah must have forgotten about it with all the commotion. Inside was a short message written by an unknown person, indicating that Abigail Simpson was attempting to steal her lover, Simon!`,
          `Ludwig, undistracted by the numerous attractions of Cremorne Gardens, went straight to the promenade along the riverbank. There, he performed one of his blood rituals, letting his blood flow into the water as he tried to peer into the past. The current of the Thames was stronger than the young medium had anticipated. The world around him slipped out of focus. The visitors to the park, past and present alike, blurred into a flowing stream of indistinguishable shapes. The only constant, the only unchanging thing in the world, was the pair of cold eyes peering from beneath the promenade. And to his dread, Ludwig felt a profound connection to them.`,
          `A couple hundred yards away, Lord Richard was investigating the other part of Cremorne Gardens. He was walking Pitagoras on a leash through the park's alley, when his dog suddenly got entangled with an exceptionally yappy poodle, and its even yappier owner. The rescue came from an unexpected direction—Theodora Brathwaite unleashed Pitagoras, stating that "true hounds should never be leashed," and then scooped up the Lord before the owner of the poodle could say a word. Walking arm in arm, the Mastermind thanked Hargrave House for cleaning up St. James Street so she could patrol it, but also raised a concern about keeping a ghost (George) within the house's walls. A chill ran down Lord Bellow's spine, despite the warm summer afternoon.`,
        ],
      },
      {
        label: 'Unwelcome visitor at Hargrave House',
        phase: 'Night',
        prose: [
          `Tired by the investigations, hunters retreated to Hargrave House to rest. The George remained vigilant, as his need of sleep disappeared along his physical body. When drifting through the corridors (aimlessly for sure), he happened to notice (by complete accident) that the door to Ludwig's bedroom were slightly ajar. He peeked in (driven by the sense of duty) and noticed that the Limehouse Lurker sat on the young medium chest! With his supernatural senses, vampire noticed the ghost and in an instant transformed into a black cloud of smoke and disapeared behind the open window into the night.`,
          `George roused Ludwig up - fortunately the boy was fine, but one of his books treating about ancient cultures was stolen!`,
        ],
      },
    ],
  },
  {
    id: 'session-03',
    title: 'Hunt for the Lurker',
    summary: `The Hunters close in on the Limehouse Lurker — but a new horror stalks London's streets, and the dream of a sapphire-throated goddess will not let them sleep.`,
    scenes: [
      {
        label: 'A New Day at Hargrave House',
        phase: 'Dawn',
        prose: [
          `The day began calmly and brightly, without any sudden events. Singh, a medium-height, dark-skinned Indian man with a turban and a thick beard, had been bustling around the Hargrave residence for quite some time, polishing objects in the room of George's ghost. George, once a jovial and boisterous man in a curled wig, now haunts Hargrave House as a ghost with a burned, terrifying face.`,
          `At the same time, Lord Richard, the epitome of a British gentleman with a pith helmet and a moustache, was eating a traditional English breakfast – beans on toast, sharing a sausage with his dog Pythagoras.`,
          `Meanwhile, Ludwig, pale and gaunt like a student, awoke upstairs, tangled in the bedclothes and surrounded by clots of blood. He vomited into the washbasin and went downstairs.`,
          `Ludwig summed up the current tasks: finding the lair of the child vampire and determining whether the fish-man really exists. Lord Richard mentioned his encounter with a vampire at the docks, believing that its lair was there. Singh reminded them of the third victim near the orphanage. They decided to split up.`,
        ],
      },
      {
        label: 'Limehouse Orphanage',
        phase: 'Day',
        prose: [
          `Lord Richard and Ludwig went to the orphanage in Limehouse. There they were taken to Director Chesterfield, a modest and stressed man who gratefully accepted a donation from Lord Richard. Ludwig, taking advantage of the director's distraction, looked through the student records and discovered that Chesterfield himself had been a resident of the orphanage, and also found an entry concerning Elmy Thorpe from 30 years ago.`,
          `Lord Richard asked about the body found behind the orphanage. The director confirmed that it was Charla Bell, found a week or two earlier, describing it as a "tragic accident." He said that the students had found the body. Lord Richard offered additional money to speak with the children, fearing that a vampire might be involved.`,
          `Chesterfield led them to three boys – Tom, John, and Jimmy – who were supposed to show them where the body had been found, then quickly left. The boys, clearly unfriendly, led the Hunters through a series of alleys and cellars. Suddenly, one of them pulled Ludwig aside, leaving Lord Richard alone in a narrow alley. It turned out to be a trap: the boys threw bricks from the roof, and Lord Richard was struck in the head, suffering a concussion.`,
          `Ludwig returned for his companion and, using blood magic, made an impossible leap onto the roof, catching one of the boys. The boy, tears in his eyes, explained that Charla Bell had been drained of her blood and that the "Limehouse Horror" (a vampire) had promised them protection and power in exchange for their service. The children also said that the vampire would have dealt with the Hunters himself by now if not for the sewer reconstruction, which had temporarily cut him off from the orphanage. Ludwig drove the street urchins away, then called a carriage for himself and his wounded companion, and they returned to Hargrave House.`,
        ],
      },
      {
        label: 'Meat Pies and a Disembodied Investigation',
        phase: 'Day',
        prose: [
          `Singh went to Cremorne Gardens. He stopped at the "Figg's Pigs" stall, which offered beautifully fragrant pork pies. The proprietor, Titus Figg, humming under his breath, served him and another gentleman beside him two portions of the still-hot pastry. After a few bites, both men realized that there was human flesh in the pastry! The stranger turned out to be a Scotland Yard detective, and when he showed his badge, Titus began to flee. The detective vaulted over the counter in a single leap, Singh followed, and they caught Mr. Figg in the back room, where Singh discovered with horror a human torso hanging from butcher's hooks. Titus Figg was arrested, but the rest of his family escaped. The Hunters must find the murderous cannibals before they attack again!`,
          `George continued his investigation into the Cremorne fish-man, following the owner of the park, Thomas Simpson. He followed him to a tent where Greco, the "seeing boy," performed. Greco turned out to be a genuine medium and sensed the presence of the ghost. He advised him to go to the old dock buildings, where he would meet a one-eyed man who shared his goal. George and Singh found the one-eyed fisherman, and the Fisherman confirmed that he had seen the beast haunting Cremorne Gardens. He described the Fish-Man as a three-metre-tall, scaly, slimy creature with claws and the smell of the sea. The Indian made a bet with him over who would capture the fish-man. They arranged to meet in Cremorne Gardens at night to corner it, and the fisherman gave Singh a key to the eastern gate.`,
        ],
      },
      {
        label: 'Hunt, Hunt, Hunt',
        phase: 'Dusk',
        prose: [
          `In the evening, Sir Anthony Wood, a friend of Lord Richard and a member of the prestigious Royal Society of Explorers, arrived at Hargrave House. When he heard what the Hunters were currently investigating, he recalled an Arthurian legend about Triton, who seduced and drowned a lady, for which he was cursed and imprisoned in a tree. He also gave Lord Richard whale bones carved with images of tritons – supposedly very popular among local sailors.`,
          `The Hunters gathered to discuss their plan of action. Singh and George would meet Abel to hunt the fish-man together, Ludwig would try to lure out the vampire by roaming the streets of London and using his connection with the Darkness, while Lord Richard would search for the vampire's lair itself.`,
        ],
      },
      {
        label: 'An Unexpected Encounter',
        phase: 'Night',
        prose: [
          `Ludwig went for a long walk through dark London, bleeding and deliberately tempting fate. His attention was drawn to a beggar woman who held out her hand in supplication. When Ludwig offered her his bloodied hand, to his horror, the woman grabbed it and licked it! She turned out to be Hortensia Figg, Titus's wife. She was tall and thin, and her left arm ended in a stump just below the elbow. She expressed concern for her children and gave Ludwig, in exchange for his "gift," an old book of children's rhymes – in which someone had carefully crossed out every mention of birds.`,
          `At the same time, Ludwig realized that Fate had played a trick on him – it had placed a horror in his path, but not the one he had expected! This meant that Lord Richard was in mortal danger!`,
        ],
      },
      {
        label: 'The End of the Limehouse Horror',
        phase: 'Night',
        prose: [
          `Analyzing all the clues, the Hunters concluded that the vampire had three lairs – beneath the places where the bodies had been found. Because of the sewer reconstruction, it could not move freely between them, and the strange blood spirals they had seen were a sign that it was nearby. Lord Richard decided that he would catch the beast that night. He went to the cellar of the Dog & Whistle tavern and was pleased to notice a "blood spiral" above a trapdoor in the floor. He entered the darkness with his trusty elephant gun. Unfortunately, it was of little use when the vampire unexpectedly attacked from the ceiling! Fortunately, loyal Pythagoras distracted the creature, and Lord Richard used a specially prepared rotating stake crossbow – one of the bolts struck the vampire in the heart. The vampire's child-sized body crumbled into dust. `,
        ],
      },
      {
        label: 'Skirmish by the Thames',
        phase: 'Night',
        prose: [
          `Singh (with a harpoon from Lord Richard) and George (who had assumed physical form) entered Cremorne Gardens. They heard a strange song and saw one-eyed Abel walking as if hypnotized toward the Thames. Singh pulled him away and saved him from drowning. George, in ethereal form, dove into the Thames searching for the creature, but instead found a beautiful emerald earring. Then a dark figure leapt from the bushes and attacked Singh and Abel! George, still in physical form and wearing polished armor, charged at the opponent. He felt its scaly body and heard a cry of pain, after which the creature jumped into the water and disappeared, leaving its discarded clothes behind. Singh and Abel's bet remained unresolved.`,
        ],
      },
      {
        label: 'Morning at Hargrave House',
        phase: 'Dawn',
        prose: [
          `The next morning, the Hunters greeted the day alive – which in itself was an achievement, considering the dangers they had faced. They had also dealt with the Limehouse Horror, and Jenny Johnson, the owner of an opium den, decided that in the future she would support Hargrave House whenever they needed help in East London.`,
          `And only the dreams that haunted them that night refused to leave them in peace:
          <ul>
          <li>Singh dreamed of a time when powerful Indians ruled the land alongside enormous reptilian creatures.</li>
          <li>Lord Richard dreamed of the founding of Londinium, Roman roads, and a young boy watching legionaries worship the goddess Cybele.</li>
          <li>Ludwig dreamed of luminous figures of ancient gods who were part of the world's "great circulatory system." One of the figures, with a sapphire-colored throat, turned to him: "I will need you" – it was Theodora Brathwaite.</li>
          </ul>`,
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
