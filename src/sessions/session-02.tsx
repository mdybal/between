/**
 * Session 02 — "The Clockwork Séance"
 *
 * Full customisable content for Session 2.
 * See session-01.tsx for component documentation.
 */

import {
  Prose,
  ProseSection,
  SessionImage,
  PullQuote,
  HighlightBox,
  BulletList,
  SessionDivider,
} from '@/components/session'

export default function Session02Content() {
  return (
    <div className="space-y-6">

      <ProseSection heading="Previously…">
        <Prose>
          The investigators recovered a brass cipher-box from a derelict warehouse in Wapping,
          witnessed a hooded figure vanish from a rooftop, and began decoding a substitution
          cipher that pointed toward a fashionable address in Mayfair.
        </Prose>
      </ProseSection>

      <SessionDivider label="Scene I — Lady Pemberton's Soirée" />

      <ProseSection>
        <SessionImage
          src="/images/sessions/session-02-parlour.jpg"
          alt="A candlelit Victorian parlour"
          caption="The drawing room at 14 Cavendish Square"
          placement="full"
        />

        <Prose>
          The cipher resolved to an address: 14 Cavendish Square, and a date — the following
          Thursday. Evelyn secured invitations through her editor's connections. The soirée was
          hosted by Lady Cecilia Pemberton, a widow of considerable means and, it emerged,
          considerable credulity regarding the supernatural.
        </Prose>
        <Prose>
          The evening's entertainment was a séance conducted by one Madame Isolde, a medium of
          Continental reputation. Thirty guests gathered in the darkened drawing room. The
          investigators positioned themselves at different points around the table.
        </Prose>
      </ProseSection>

      <PullQuote attribution="Madame Isolde, moments before her death">
        "He is here. He has always been here. He calls himself the Architect, and he says —
        he says you should not have opened the box."
      </PullQuote>

      <SessionDivider label="Scene II — The Medium's Death" />

      <ProseSection>
        <Prose>
          Madame Isolde died at the table. No wound, no poison — the physician present could
          find no cause. Her eyes were open and her expression was one of absolute terror. In
          her clenched fist, the investigators found a playing card: the Architect of a standard
          tarot deck, defaced with the same inverted clock symbol from the cipher-box.
        </Prose>
      </ProseSection>

      <HighlightBox variant="danger" title="Incident — Death of Madame Isolde">
        Cause of death: unknown. No physical trauma. The medium appeared to die of fright during
        the séance. Metropolitan Police were called; the investigators have approximately 20
        minutes before their presence becomes difficult to explain.
      </HighlightBox>

      <SessionDivider label="Scene III — The Hidden Passage" />

      <ProseSection>
        <Prose>
          While the other guests were occupied with the police's arrival, Silas noticed a
          draught from behind the fireplace. A concealed door, operated by a mechanism hidden
          in the mantelpiece carving, opened onto a narrow passage leading to a basement room.
        </Prose>
        <Prose>
          The room had been used recently. A writing desk held correspondence in the same cipher
          as the box. A locked cabinet contained three items: a photograph of a man the
          investigators did not recognise, a vial of black ichor, and a folded letter addressed
          simply to <em>"When They Come."</em>
        </Prose>
      </ProseSection>

      <HighlightBox variant="clue" title="Items Found in the Hidden Room">
        <BulletList
          items={[
            'Correspondence in the same substitution cipher — partially decoded, references "the Architect\'s design" and a date six weeks hence',
            'A photograph: a tall man in formal dress, face partially obscured, standing before what appears to be a large mechanical device',
            'A vial of black ichor — identical to the substance found in Wapping',
            'A sealed letter addressed "When They Come" — the investigators chose not to open it',
          ]}
        />
      </HighlightBox>

      <HighlightBox variant="lore" title="First Mention — The Architect of Ruin">
        The name "The Architect of Ruin" appears for the first time in the decoded correspondence.
        The phrase is used reverentially, as a title rather than a description. Whoever — or
        whatever — this entity is, those who serve it do so with devotion bordering on worship.
      </HighlightBox>

      <SessionDivider />

      <HighlightBox variant="note" title="Session Notes">
        The séance scene landed well — the moment of Isolde's death was genuinely unsettling.
        The players are now invested in the Architect mystery. The sealed letter is a good
        dangling thread; they'll want to open it eventually. Lady Pemberton's reaction to the
        hidden room (genuine shock, or performance?) is worth developing.
      </HighlightBox>

    </div>
  )
}
