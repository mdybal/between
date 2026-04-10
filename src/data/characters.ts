import type { Character } from '@/types'

export const characters: Character[] = [
  {
    id: 'evelyn-ashworth',
    name: 'Evelyn Ashworth',
    type: 'hunter',
    occupation: 'Investigative Journalist',
    description:
      'A sharp-tongued correspondent for The Illustrated London News, Evelyn uses her press credentials to go where others dare not.',
    background:
      'Born to a respectable but impoverished family in Bath, Evelyn clawed her way into Fleet Street through sheer tenacity. Her investigations into the East End slums brought her into contact with the strange and the terrible.',
    traits: ['Perceptive', 'Stubborn', 'Compassionate', 'Reckless'],
    conditions: ['Shaken', 'Obsessed'],
    privateQuarters: [
      { name: 'Press Credentials', used: false },
      { name: 'Pocket Revolver', used: true },
      { name: 'Leather Satchel', used: false },
      { name: 'Coded Notebook', used: true },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Daughter', used: true },
          { name: 'The Street Urchin', used: false },
          { name: 'The Debutante', used: false },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Fearless Reporter', used: false },
          { name: 'The Socialite', used: true },
        ],
      },
    ],
    status: 'active',
  },
  {
    id: 'cornelius-vane',
    name: 'Dr. Cornelius Vane',
    alias: 'The Doctor',
    type: 'hunter',
    occupation: 'Alienist & Occult Scholar',
    description:
      'A physician of the mind who has seen too much to dismiss the supernatural. His Harley Street practice is a front for deeper research.',
    background:
      'Trained in Vienna under Charcot, Vane returned to London haunted by what he witnessed in the asylums of Europe. He now studies the intersection of madness and the occult.',
    traits: ['Methodical', 'Secretive', 'Empathetic', 'Haunted'],
    conditions: ['Haunted'],
    privateQuarters: [
      { name: 'Medical Bag', used: false },
      { name: 'Occult Tome', used: true },
      { name: 'Laudanum Vial', used: true },
      { name: 'Silver Scalpel', used: false },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Grieving Widower', used: false },
          { name: 'The Eager Student', used: false },
          { name: 'The Broken Soldier', used: true },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Respectable Physician', used: true },
          { name: 'The Occult Seeker', used: false },
        ],
      },
    ],
    status: 'active',
  },
  {
    id: 'silas-morrow',
    name: 'Silas Morrow',
    type: 'hunter',
    occupation: 'Former Inspector, Metropolitan Police',
    description:
      'Dismissed from the force after reporting supernatural occurrences, Silas now operates as a private inquiry agent with nothing left to lose.',
    background:
      'Twenty years on the force left Silas with a network of informants and a deep distrust of authority. The case that ended his career also opened his eyes to what lurks beneath London\'s respectable surface.',
    traits: ['Tenacious', 'Cynical', 'Loyal', 'Weathered'],
    conditions: [],
    privateQuarters: [
      { name: 'Police Whistle', used: false },
      { name: 'Service Revolver', used: false },
      { name: 'Informant Ledger', used: true },
      { name: 'Lock-pick Set', used: false },
    ],
    masks: [
      {
        category: 'Mask of Past',
        masks: [
          { name: 'The Loyal Constable', used: false },
          { name: 'The Haunted Detective', used: false },
          { name: 'The Disgraced Inspector', used: false },
        ],
      },
      {
        category: 'Mask of Junos',
        masks: [
          { name: 'The Gruff Informant', used: false },
          { name: 'The Weary Veteran', used: false },
        ],
      },
    ],
    status: 'active',
  },
  {
    id: 'theodora-brathwaite',
    name: 'Theodora Brathwaite',
    type: 'npc',
    subtype: 'antagonist',
    occupation: 'The Antagonist',
    description:
      'A shadowy figure whose true motives remain obscured. Known only by reputation and whispered warnings.',
    background:
      'Little is known of Theodora Brathwaite\'s origins. She moves through London\'s underworld with unsettling ease, leaving chaos in her wake.',
    traits: ['Calculating', 'Elusive', 'Dangerous'],
    imageUrl: '/img/characters/theodora.svg',
  },
  {
    id: 'lady-pemberton',
    name: 'Lady Cecilia Pemberton',
    type: 'npc',
    subtype: 'neutral',
    occupation: 'Society Hostess',
    description:
      'A widow of considerable means and questionable taste in guests. Her Mayfair townhouse is a nexus of rumour and intrigue.',
    background:
      'Widowed young, Lady Pemberton has cultivated a salon that attracts artists, politicians, and occultists in equal measure. Whether she is a victim or a conspirator remains unclear.',
    traits: ['Charming', 'Evasive', 'Frightened', 'Well-connected'],
  },
  {
    id: 'alfred',
    name: 'Alfred Pennyworth',
    type: 'npc',
    subtype: 'ally',
    occupation: 'Gardener & Handyman',
    description:
      'A loyal and resourceful manservant who has served the Ashworth family for decades. His knowledge of the estate and its secrets is invaluable.',
    background:
      'Alfred has been with the Ashworths since before Evelyn was born. He is fiercely protective of the family and has a deep understanding of the estate\'s history and hidden passages.',
    traits: ['Dependable', 'Resourceful', 'Discreet'],
  },
]
