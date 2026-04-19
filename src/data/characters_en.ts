import { characters } from './characters'
import type { Character } from '@/types'

/**
 * English character text data.
 *
 * This file contains all translatable text fields (name, alias, occupation,
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

export const charactersEn: CharacterText[] = [
  {
    id: 'george-montegu',
    name: 'George Montegu',
    occupation: 'The Unquiet',
    description:
      'A ghost of a murdered member of the Hargrave House. A young man dressed in period clothing and smelling of smoke and ash.',
    background:
      'You were a resident of Hargrave House many decades ago, but now, ghosty-ghost, you’re dead. In fact, you met an untimely end as the result of a betrayal by one of your contemporaries. The arrival of the traitor’s descendant in London has awakened you, restless spirit, and anchored you to Hargrave House, which you’ll haunt until you can exact your revenge by destroying said descendant. In the meantime, you find yourself drawn yet again to the dark work done by Hargrave House, and these new Hunters could certainly use your help. You might even be able to summon the energy needed to temporarily slip your spectral bonds and stalk the streets of London once again.',
    conditions: ['One of many'],
    masks: [
      {
        category: 'The Mask of The Past',
        masks: [
          { name: 'Narrate a flashback to when you were alive that shows you battling and destroying a monstrous threat on behalf of Hargrave House.', masked: true },
          { name: 'Narrate a flashback to when you were alive that shows you having an intimate moment with the Hunter who would eventually betray you. Name them.' },
          { name: 'Narrate a flashback to when you were alive that shows Hargrave House’s chief nemesis during those days.' },
          { name: 'Narrate a flashback showing how the Hunter who would eventually betray you fell in with Hargrave House’s nemesis.' },
          { name: 'Narrate a flashback showing the betrayal.' },
          { name: 'Narrate a flashback showing how the betrayal resulted in your death.' },
          { name: 'The Keeper narrates a scene in the present-day in which we see the descendant of the Hunter who betrayed you. Name them.' },
        ],
      },
      {
        category: 'The Mask of The Future',
        masks: [
          { name: 'The Moss-Covered Gate' },
          { name: 'The Darkened Threshold' },
          { name: 'The Cosmic Passage' },
          { name: 'The Blood-Soaked Portal' },
        ],
      },
    ],
  },
  {
    id: 'singh',
    name: 'Singh',
    occupation: 'The Factotum',
    description:
      'A sikh from a long line of servants to the Montegu family. Always impeccably dressed and perfectly groomed, Singh is the epitome of calm loyalty.',
    background:
      'You had a life before you entered the service of your Employer, but the details of that life are unimportant. All that matters now is the person you serve, and Hargrave House, where you will grow ancient and die—if you’re lucky. More likely your Employer’s colleagues, these Hunters, will be the end of you, overturning things that should remain hidden and goading-on terrors that dwell in dark places. You’ll do your best to help them, of course, to keep them alive, because without them, what are you, really? ',
    masks: [
      {
        category: 'The Mask of The Past',
        masks: [
          { name: 'Narrate a flashback to your young adulthood, before you were a servant, that shows your most significant professional triumph.' },
          { name: 'Narrate a flashback to your young adulthood, before you were a servant, that shows what a charmed life you lived.' },
          { name: 'Narrate a flashback to the event that eventually forced you into servitude.' },
          { name: 'Narrate a flashback to when you were more of a family member to your employer than someone of their own flesh and blood.' },
          { name: 'Narrate a flashback to when your employer behaved in a way that was utterly indifferent to your dignity.' },
          { name: 'Narrate a flashback that shows how you had to engage in emotional labor in order to please or soothe your employer.' },
          { name: 'Narrate a flashback to the first time you saved your employer’s life.' },
        ],
      },
      {
        category: 'The Mask of The Future',
        masks: [
          { name: 'The Gilded Door' },
          { name: 'The Moss-Covered Gate' },
          { name: 'The Darkened Threshold' },
          { name: 'The Cosmic Passage' },
          { name: 'The Blood-Soaked Portal' },
        ],
      },
    ],
  },
  {
    id: 'ludwig-virchow',
    name: 'Ludwig Virchow',
    occupation: 'The Vessel',
    description:
      'Ludwig came to London from Pomerania. He\'s young, frail, and proud of his mustache. He lies to his mother that he studies at Royal College of Surgeons.',
    background:
      "For as long as you can remember, dark entities have been near. They lurk just inside your peripheral vision, just at the mirror’s edge. When you close your eyes, you can actually feel them: their cold breath, their oily touch… an occasional feverish embrace. They want to be inside you; they want to rub against your guts and deposit their power. Others are drawn to you as well: those who would use you to master these dark things in order to serve their own agenda. Some of these interlopers, these usurpers, can be of use, such as the Hunters with whom you share a home. Others, like the coven, are best avoided. In either case, you are no one’s object, tool, or weapon; you are no mere bystander. Your fate is yours to shape.",
    conditions: ['Most Beloved','Marked by the vampire'],
    masks: [
      {
        category: 'The Mask of The Past',
        masks: [
          { name: 'Narrate a flashback to the time when you were in your mother’s womb that shows, even then, dark entities were interested in you.' },
          { name: 'Narrate a flashback to your childhood that shows the first time you encountered a dark entity.' },
          { name: 'Narrate a flashback to your young adulthood that shows your first sexual encounter with a dark entity.' },
          { name: 'Narrate a flashback to your young adulthood that shows a time when you used your supernatural affinities for selfish purposes.' },
          { name: 'Narrate a flashback to your young adulthood that shows when you first met the leader of the coven. Name them.' },
          { name: 'Narrate a flashback to your young adulthood that shows part of your initiation into the coven. Name the coven.' },
          { name: 'Narrate a flashback to an event that influenced you to leave the coven for good.' },
        ],
      },
      {
        category: 'The Mask of The Future',
        masks: [
          { name: 'The Gilded Door', masked: true },
          { name: 'The Moss-Covered Gate' },
          { name: 'The Darkened Threshold' },
          { name: 'The Cosmic Passage' },
          { name: 'The Blood-Soaked Portal' },
        ],
      },
    ],
  },
  {
    id: 'lord-bellows',
    name: 'Lord Richard Abelard Jonathan Bellows III',
    occupation: 'The Explorer',
    description:
      'In late 30s and already legendary explorer. Self-important, righteously arrogant. Always wears his cork hat and raiding boots.',
    background:
      "You were born into a world of fantastic wealth and privilege. You could have spent your days cosseted by luxury, with nothing more pressing than deciding what to wear to that evening’s dinner party. But you chose a different life; you chose to serve your queen. You leveraged your wealth and connections to explore the world, to chart unknown territory. And now you have a mountain range named after you—a fitting honor, considering you tower over other Britons. Your strength, your intellect, your cunning—none can match it. None except… the Mastermind. The Mastermind, who plots ceaselessly against Her Majesty, whose mind and resources dwarf your own. You have conquered every trial the gods have placed before you, but the Mastermind is something altogether different. And your new work, your work with Hargrave House, is connected to them in some way. You spend your days and nights exploring the true heart of darkness—the monsters that stalk the streets of London—but none are so monstrous as your opponent, the one who sits on the other side of the chessboard. Will Great Britain still be standing when the grand game is over?",
    conditions: ['Disappointed by chaos'],
    masks: [
      {
        category: 'The Mask of The Past',
        masks: [
          { name: 'Narrate a flashback to the time when the Explorer first arrived at your village. Was it a joyous moment? Was there something ominous about it?' },
          { name: 'Narrate a flashback that shows your friendship with the Explorer. What kind of relationship was it? Parent and child? Teacher and pupil? Master and servant?' },
          { name: 'Narrate a flashback to when your village suffered an atrocity at the hands of the Explorer. How did you help inflict this atrocity?' },
          { name: 'Narrate a flashback showing how you faced a reckoning for the crimes you helped the Explorer commit against your village.' },
          { name: 'Narrate a flashback to the recent past showing how the village still suffers the consequences of the Explorer’s occupation.' },
          { name: 'Narrate a flashback showing your arrival in London.' },
          { name: 'Narrate a flashback to the time when you first met the Mastermind.' },
        ],
      },
      {
        category: 'The Mask of The Future',
        masks: [
          { name: 'The Gilded Door' },
          { name: 'The Moss-Covered Gate' },
          { name: 'The Darkened Threshold' },
          { name: 'The Cosmic Passage' },
          { name: 'The Blood-Soaked Portal' },
        ],
      },
    ],
  },
  {
    id: 'theodora-brathwaite',
    name: 'Theodora Brathwaite',
    occupation: 'The Mastermind',
    description:
      'Theodora Brathwaite is a stately, middle-aged black woman, always impeccably dressed and never seen without her signature sapphire choker.',
    background:
      "She is a native of Montserrat, and a completely self-made woman, having built her vast fortune first as a pirate queen and later as a legitimate merchant. She arrived in London in her ate-20s, already fabulously wealthy.",
    traits: ['Wealthy', 'Dangerous', 'Connected'],
  },

  // St James's Street Ghosts
  {
    id: 'harold-beale',
    name: 'Harold Beale',
    occupation: 'a husband and father',
    description:
      'Patchy beard. Constantly fiddling. Worried about the cost of things.',
    background:
      'Harold, a bookkeeper and amateur mathematician, moved his young family to St. James’s Street just a year ago, after getting a shockingly-good deal on the townhouse.',
    traits: ['Worried', 'Restless', 'Meticulous'],
  },
  {
    id: 'alice-beale',
    name: 'Alice Beale',
    occupation: 'a wife and mother',
    description:
      'Sweet disposition. Lovely, but faded. Simple tartan dress.',
    background:
      "Alice follows Harold’s lead in most things, but thinks he’s not taking Ginny’s death seriously enough. It was he who gave the story to The Illustrated Police News after Scotland Yard came up empty￾handed—a sad attempt to make a bit of money off their tragedy.",
    traits: ['Quiet', 'Faded', 'Disillusioned'],
  },
  {
    id: 'roger-beale',
    name: 'Roger Beale',
    occupation: 'a young son',
    description:
      'Ruddy-cheeked. Sailor’s outfit. Learning to swear.',
    background:
      "Nine-year-old Roger is a bit of a brat, to be honest, but finds the idea of a haunting to be wonderfully exciting, and frequently gives ghost tours of the townhouse to his friends.",
    traits: ['Adventurous', 'Curious', 'Bratty'],
  },
  {
    id: 'mary-alice-beale',
    name: 'Mary-Alice Beale',
    occupation: 'a baby daughter',
    description:
      'Quite bald for her age, really. And fat—what a fat little monkey she is!',
    background:
      "Listen to how she babbles—don’t you wonder what they’re thinking about when they babble like that?",
    traits: ['Adorable', 'Inquisitive', 'Fat']
  },
  {
    id: 'pythagoras',
    name: 'Pythagoras',
    occupation: 'a dog',
    description:
      'Greyhound. Brindle',
    background:
      "Used to be quite lazy, but ever since moving to St. James’s Street, spends most of his time nervously patrolling the house.",
    traits: ['Loyal', 'Friendly', 'Alert'],
    },
    {
    id: 'irma-thicket',
    name: 'Irma Thicket',
    occupation: 'a cook',
    description:
      'Square-framed. Jowly. Smells of onion and tobacco',
    background:
      "Irma has lived at 18 St. James’s Street longer than anyone, having worked for the previous family, the Buckleys. She is reluctant to talk about the things she’s seen, but is genuinely sad and terrified about what happened to Ginny Hess",
    traits: ['Superstitious', 'Blunt', 'Distressed'],
    },
    {
    id: 'constance-head',
    name: 'Constance Head',
    occupation: 'a neighbor',
    description:
      'Peering eyes. Too-tight corset. Streaks of gray in her hair',
    background:
      "Constance is a widow, and the Beales’ neighbor. Like Mrs. Thicket, she knows things about the house on 18 St. James’s Street, having lived next door most of her adult life. She’s certainly happy to tell what she knows in exchange for some juicy gossip.",
    traits: ['Gossipy', 'Nosy', 'Knowledgeable'],
    },

    // Limehouse Lurker
    {
    id: 'chen-bao',
    name: 'Chen Bao',
    alias: 'Jen Johnson',
    occupation: 'a community leader',
    description:
      'Soothing disposition. Dark taffeta gown. Hair propped up in an oriental bun with jade hairpin.',
    background:
      "Jen runs a successful opium den and is the unofficial leader of the small Chinese immigrant community in Limehouse. She takes her role seriously, and looks after almost anyone who comes to her for help.",
    traits: ['Calm', 'Resourceful', 'Protective'],
    },
    {
    id: 'sun-mask',
    name: 'The Man in the Sun Mask',
    occupation: 'a patron of the opium den',
    description:
      'Gold smoking jacket and yellow silk pants. Soft slippers on his feet. A sun-shaped half-mask obscuring his identity.',
    background:
      "JThe Man in the Sun Mask claims to be a member of the Royal Family, or some other important member of society, depending on when you ask him; he says he wears the mask to hide his identity.",
    traits: ['Cryptic', 'Mellow','Nonchalant'],
    },
    {
    id: 'rory-bell',
    name: 'Rory Bell',
    occupation: 'a husband',
    description:
      'Covered in soot. Sour smell. Hangdog look',
    background:
      "Rory is a stevedore at Regent’s Canal Dock. He wants to go to the police about his wife Charla’s murder, but Jen Johnson is putting a lot of pressure on him to be quiet and let her handle the matter",
    traits: ['Apologetic', 'Abashed','Uneducated'],
    },
    {
    id: 'franklin-horsford',
    name: 'Franklin Horsford',
    occupation: 'a Dog $ Whistle owner',
    description:
      'Sweaty forehead. Hairy arms. Black apron',
    background:
      "Franklin does a brisk business at The Dog & Whistle, and he agrees with Jen that no good will come of getting the authorities involved in the current troubles. ",
    traits: ['Friendly', 'Frank', 'No-nonsense'],
    },
    {
    id: 'elma-thorpe',
    name: 'Elma Thorpe',
    occupation: 'a Dog & Whistle patron',
    description:
      'Unkempt gray hair. Wrapped in a blanket, complaining of cold. Just finishing her drink',
    background:
      "Elma is a regular at The Dog & Whistle. She sees a lot around the Canal Dock, and she’ll talk about what she knows if you buy her a drink.",
    traits: ['Drunk', 'Vulgar', 'Streetwise'],
    },
    {
    id: 'lin-bohai',
    name: 'Lin Bohai',
    occupation: 'a sailor',
    description:
      'Handsome grin. Briny smell. Dingy sailor’s whites',
    background:
      "Lin Bohai was a friend and shipmate of Zhao Donghai. Their ship is set to sail in a week; he’d like to find out what happened to his friend before that.",
    traits: ['Compassionate', 'Gambler', 'Well-traveled'],
    },
    {
    id: 'lawrence-chesterfield',
    name: 'Lawrence Chesterfield',
    occupation: 'a headmaster',
    description:
      'Fidgety. Brown three-piece suit. Voice always starts low but ends high.',
    background:
      "Lawrence is the headmaster of the Limehouse School. He is overworked, exasperated, and doing his best to quell rumors of blood-sucking monsters.",
    traits: ['Strict', 'Formal', 'Exhausted'],
    },
    {
    id: 'limehouse-lurker',
    name: 'The Limehouse Lurker',
    occupation: 'a vampire',
    description:
      'Child-sized. Pale and gaunt. Always lurking in the rafters`s shadows.',
    background:
      "The vampire is physically a child but that doesn't mean it's young. Vampires never physically age beyond how old they were when they were \"turned,\" and an old vampire has to be handled in a very different way from a young one…",
    traits: ['Blood-thirsty', 'Dangerous', 'Hidden in shadows'],
    },
    {
    id: 'red-katherine',
    name: 'Red Katherine',
    occupation: 'a prostitute',
    description:
      'A storm of red curls. Pretty, but aged beyond her years. Earthy complexion',
    background:
      "Sister/partner/friend of Soft Jimmy, who was murdered by the Limehouse Lurker. Works as a prostitute in Limehouse. Has been marked by the Lurker along with Ludwig.",
    traits: ['Opium addicted', 'Nervous', 'Trusting'],
    },
    {
    id: 'big-bertha',
    name: 'Big Bertha',
    occupation: 'a prostitute',
    description:
      'Obese and huge. Heavy makeup. You can drown in her cleavage.',
    background:
      "A prostitute from Limehouse. Very much to Sikh's taste. She let the Limehouse Lurker into the opium den.",
    traits: ['Huggy', 'Huge'],
    },
    
]

/**
 * Merges character base data with English text to produce full Character objects.
 */
export function getCharactersEn(): Character[] {
  return characters.map((char) => {
    const text = charactersEn.find((c) => c.id === char.id)
    if (!text) {
      throw new Error(`Missing English text for character: ${char.id}`)
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
