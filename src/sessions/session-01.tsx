/**
 * Session 01 — "Fog on the Thames"
 *
 * This file is the full, customisable content for Session 1.
 * Use any of the session components below, or plain JSX / Tailwind classes.
 *
 * Available components (import from '@/components/session'):
 *   <Prose>              — a paragraph of narrative text
 *   <ProseSection>       — groups paragraphs under an optional heading
 *   <SessionImage>       — image with caption; placement: "full" | "center" | "left" | "right"
 *   <ClearFloat>         — clears float after a left/right image
 *   <PullQuote>          — styled blockquote / memorable line
 *   <HighlightBox>       — callout box; variant: "clue" | "danger" | "note" | "lore"
 *   <BulletList>         — styled bullet list
 *   <SessionDivider>     — ornamental divider, optional label prop
 */

import {
  Prose,
  ProseSection,
  SessionImage,
  ClearFloat,
  PullQuote,
  HighlightBox,
  BulletList,
  SessionDivider,
} from '@/components/session'

export default function Session01Content() {
  return (
    <div className="space-y-6">

      {/* ── Opening ─────────────────────────────────────────────── */}
      <ProseSection heading="Prologue">
        <Prose>
          The letter arrived without postage, slipped beneath three separate doors on the same
          fog-choked Tuesday morning. Each recipient — a journalist, a physician, and a disgraced
          inspector — found the same words written in a cramped, urgent hand: <em>"Come to the
          Diogenes Club. Ask for Mr. Voss. Do not delay."</em>
        </Prose>
        <Prose>
          None of them knew the others. None of them knew Mr. Voss. And yet, by half past nine,
          all three sat in the club's Stranger's Room, eyeing one another across a table of cold
          tea and unanswered questions.
        </Prose>
      </ProseSection>

      <PullQuote attribution="The letter, unsigned">
        "There are things happening beneath this city that no constable will investigate and no
        newspaper will print. I require people who are not yet afraid."
      </PullQuote>

      <SessionDivider label="Scene I — The Diogenes Club" />

      {/* ── Scene I ─────────────────────────────────────────────── */}
      <ProseSection>
        <Prose>
          Mr. Voss proved to be a small, precise man with ink-stained fingers and the eyes of
          someone who had not slept in several days. He spread a map of Whitechapel across the
          table and pointed to a cluster of marks along the waterfront.
        </Prose>
        <Prose>
          Seven people had vanished from the Wapping docks in the past three weeks. The police
          had logged them as runaways or river accidents. Voss believed otherwise.
        </Prose>
      </ProseSection>

      <HighlightBox variant="clue" title="Information from Voss">
        <BulletList
          items={[
            'Seven disappearances, all within 400 yards of Wapping High Street',
            'Each victim was last seen near Warehouse 14 — now supposedly derelict',
            'A dockworker reported hearing "a sound like a clock running backwards" the night before each disappearance',
            'Voss has a contact — a street child named Pip — who claims to have seen hooded figures',
          ]}
        />
      </HighlightBox>

      <SessionDivider label="Scene II — Warehouse 14" />

      {/* ── Scene II ────────────────────────────────────────────── */}
      <ProseSection>
        {/* Example: right-floated image with text wrapping */}
        <SessionImage
          src="/images/sessions/session-01-warehouse.jpg"
          alt="A derelict Victorian warehouse at night"
          caption="Warehouse 14, Wapping High Street — as sketched by Evelyn Ashworth"
          placement="right"
        />

        <Prose>
          The warehouse smelled of river mud and something else — something sweet and wrong, like
          flowers left too long in standing water. The investigators found the ground floor empty
          save for scattered crates and a trail of black ichor leading toward a trapdoor.
        </Prose>
        <Prose>
          Below, in a vaulted cellar lit by a single lantern, they found the evidence of ritual:
          chalk circles, burned offerings, and a brass box engraved with a symbol none of them
          recognised — an inverted clock face, its hands pointing to the same hour.
        </Prose>

        <ClearFloat />
      </ProseSection>

      <HighlightBox variant="danger" title="Encounter — The Rooftop Figure">
        As the investigators prepared to leave, a hooded figure was spotted on the warehouse roof.
        It did not flee. It watched. When Silas raised his lantern, the figure turned and stepped
        backward off the edge — and was not heard to land.
      </HighlightBox>

      <SessionDivider label="Scene III — Recovery" />

      <ProseSection>
        <Prose>
          The brass cipher-box was taken to Dr. Vane's surgery on Harley Street. Initial
          examination revealed a hidden compartment containing a strip of paper covered in
          substitution cipher. The cipher remains unsolved.
        </Prose>
      </ProseSection>

      <HighlightBox variant="clue" title="Item Recovered — The Brass Cipher-Box">
        A small brass box, approximately 4 inches by 2 inches. The lid bears an inverted clock
        symbol. Inside: a folded strip of paper in substitution cipher, and traces of the same
        black ichor found on the warehouse floor. The box itself appears to be of recent
        manufacture, despite its antique styling.
      </HighlightBox>

      <SessionDivider />

      {/* ── Session Notes ────────────────────────────────────────── */}
      <HighlightBox variant="note" title="Session Notes">
        First session. Players established their characters' voices well — Evelyn's instinct to
        photograph everything, Vane's clinical detachment masking genuine unease, Silas's
        professional scepticism cracking at the rooftop encounter. The cipher-box will be the
        thread into Session 2.
      </HighlightBox>

    </div>
  )
}
