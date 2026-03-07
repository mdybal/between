import type { Character } from '@/types'

export const characters: Character[] = [
  {
    id: 'evelyn-ashworth',
    name: 'Evelyn Ashworth',
    type: 'player',
    occupation: 'Investigative Journalist',
    description:
      'A sharp-tongued correspondent for The Illustrated London News, Evelyn uses her press credentials to go where others dare not.',
    background:
      'Born to a respectable but impoverished family in Bath, Evelyn clawed her way into Fleet Street through sheer tenacity. Her investigations into the East End slums brought her into contact with the strange and the terrible.',
    traits: ['Perceptive', 'Stubborn', 'Compassionate', 'Reckless'],
    status: 'active',
  },
  {
    id: 'cornelius-vane',
    name: 'Dr. Cornelius Vane',
    alias: 'The Doctor',
    type: 'player',
    occupation: 'Alienist & Occult Scholar',
    description:
      'A physician of the mind who has seen too much to dismiss the supernatural. His Harley Street practice is a front for deeper research.',
    background:
      'Trained in Vienna under Charcot, Vane returned to London haunted by what he witnessed in the asylums of Europe. He now studies the intersection of madness and the occult.',
    traits: ['Methodical', 'Secretive', 'Empathetic', 'Haunted'],
    status: 'active',
  },
  {
    id: 'silas-morrow',
    name: 'Silas Morrow',
    type: 'player',
    occupation: 'Former Inspector, Metropolitan Police',
    description:
      'Dismissed from the force after reporting supernatural occurrences, Silas now operates as a private inquiry agent with nothing left to lose.',
    background:
      'Twenty years on the force left Silas with a network of informants and a deep distrust of authority. The case that ended his career also opened his eyes to what lurks beneath London\'s respectable surface.',
    traits: ['Tenacious', 'Cynical', 'Loyal', 'Weathered'],
    status: 'active',
  },
  {
    id: 'lady-pemberton',
    name: 'Lady Cecilia Pemberton',
    type: 'npc',
    occupation: 'Society Hostess',
    description:
      'A widow of considerable means and questionable taste in guests. Her Mayfair townhouse is a nexus of rumour and intrigue.',
    background:
      'Widowed young, Lady Pemberton has cultivated a salon that attracts artists, politicians, and occultists in equal measure. Whether she is a victim or a conspirator remains unclear.',
    traits: ['Charming', 'Evasive', 'Frightened', 'Well-connected'],
    status: 'active',
  },
]
