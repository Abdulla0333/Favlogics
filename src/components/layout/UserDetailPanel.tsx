import { type KeyboardEvent, useState } from 'react'
import { AccordionSection, DetailsIcon, Drawer, LabeledRow } from '@/components/ui'
import { DetailsPanelSkeleton } from '@/components/loading/panels/DetailsPanelSkeleton'
import type { Conversation, DummyUser } from '@/types'

interface UserDetailPanelProps {
  conversation: Conversation | null
  userDetails: DummyUser | null
  isLoading: boolean
  isOpen: boolean
  onToggle: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
  isMobile?: boolean
}
const DEFAULT_LABELS = ['Closed Won', 'Chicago']
const DEFAULT_NOTES = ['Strong potential for future upgrades']

export function UserDetailPanel({
  conversation,
  userDetails,
  isLoading,
  isOpen,
  onToggle,
  mobileOpen = false,
  onMobileClose,
  isMobile = false,
}: UserDetailPanelProps) {
  const [chatDataOpen, setChatDataOpen] = useState(true)
  const [contactDataOpen, setContactDataOpen] = useState(true)
  const [labelsOpen, setLabelsOpen] = useState(true)
  const [notesOpen, setNotesOpen] = useState(true)
  const [otherChatsOpen, setOtherChatsOpen] = useState(true)
  const [showAllContact, setShowAllContact] = useState(false)
  const [labels, setLabels] = useState(DEFAULT_LABELS)
  const [notes, setNotes] = useState(DEFAULT_NOTES)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [draftNote, setDraftNote] = useState('')

  if (isMobile) {
    return (
      <Drawer
        variant="details"
        open={mobileOpen}
        onClose={onMobileClose}
        closeLabel="Close details panel"
      >
        <aside className="dashboard-panel details-panel details-panel--drawer flex h-full max-h-[88dvh] w-full flex-col">
          <PanelHeader onClose={onMobileClose} closeLabel="Close details panel" />
          {conversation ? (
            <PanelBody
              conversation={conversation}
              userDetails={userDetails}
              isLoading={isLoading}
              chatDataOpen={chatDataOpen}
              setChatDataOpen={setChatDataOpen}
              contactDataOpen={contactDataOpen}
              setContactDataOpen={setContactDataOpen}
              labelsOpen={labelsOpen}
              setLabelsOpen={setLabelsOpen}
              notesOpen={notesOpen}
              setNotesOpen={setNotesOpen}
              otherChatsOpen={otherChatsOpen}
              setOtherChatsOpen={setOtherChatsOpen}
              showAllContact={showAllContact}
              setShowAllContact={setShowAllContact}
              labels={labels}
              setLabels={setLabels}
              notes={notes}
              setNotes={setNotes}
              isAddingNote={isAddingNote}
              setIsAddingNote={setIsAddingNote}
              draftNote={draftNote}
              setDraftNote={setDraftNote}
            />
          ) : (
            <div className="details-panel-content flex flex-1 items-center justify-center text-[13px] text-[var(--dash-text-muted)]">
              Select a conversation to view details
            </div>
          )}
        </aside>
      </Drawer>
    )
  }

  if (!isOpen) {
    return (
      <div className="hidden h-full shrink-0 xl:flex">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Show details panel"
          aria-expanded={false}
          className="dashboard-panel details-panel details-panel--collapsed flex h-full w-9 items-start justify-center pt-3 transition"
        >
          <DetailsIcon name="minimize-panel" className="details-icon details-icon--panel" />
        </button>
      </div>
    )
  }

  if (!conversation) {
    return (
      <aside className="dashboard-panel details-panel hidden h-full shrink-0 xl:flex xl:w-[294px]" />
    )
  }

  return (
    <aside className="dashboard-panel details-panel hidden h-full min-w-0 w-[250px] shrink-0 flex-col xl:flex xl:w-[294px]">
      <PanelHeader onClose={onToggle} closeLabel="Hide details panel" />
      <PanelBody
        conversation={conversation}
        userDetails={userDetails}
        isLoading={isLoading}
        chatDataOpen={chatDataOpen}
        setChatDataOpen={setChatDataOpen}
        contactDataOpen={contactDataOpen}
        setContactDataOpen={setContactDataOpen}
        labelsOpen={labelsOpen}
        setLabelsOpen={setLabelsOpen}
        notesOpen={notesOpen}
        setNotesOpen={setNotesOpen}
        otherChatsOpen={otherChatsOpen}
        setOtherChatsOpen={setOtherChatsOpen}
        showAllContact={showAllContact}
        setShowAllContact={setShowAllContact}
        labels={labels}
        setLabels={setLabels}
        notes={notes}
        setNotes={setNotes}
        isAddingNote={isAddingNote}
        setIsAddingNote={setIsAddingNote}
        draftNote={draftNote}
        setDraftNote={setDraftNote}
      />
    </aside>
  )
}

function PanelHeader({
  onClose,
  closeLabel,
}: {
  onClose?: () => void
  closeLabel: string
}) {
  return (
    <div className="details-panel-header">
      <h3 className="details-panel-title">Details</h3>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        aria-expanded={true}
        className="details-panel-toggle"
      >
        <DetailsIcon name="minimize-panel" className="details-icon details-icon--panel" />
      </button>
    </div>
  )
}

interface PanelBodyProps {
  conversation: Conversation
  userDetails: DummyUser | null
  isLoading: boolean
  chatDataOpen: boolean
  setChatDataOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  contactDataOpen: boolean
  setContactDataOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  labelsOpen: boolean
  setLabelsOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  notesOpen: boolean
  setNotesOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  otherChatsOpen: boolean
  setOtherChatsOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  showAllContact: boolean
  setShowAllContact: (value: boolean | ((prev: boolean) => boolean)) => void
  labels: string[]
  setLabels: (value: string[] | ((prev: string[]) => string[])) => void
  notes: string[]
  setNotes: (value: string[] | ((prev: string[]) => string[])) => void
  isAddingNote: boolean
  setIsAddingNote: (value: boolean) => void
  draftNote: string
  setDraftNote: (value: string) => void
}

function PanelBody({
  conversation,
  userDetails,
  isLoading,
  chatDataOpen,
  setChatDataOpen,
  contactDataOpen,
  setContactDataOpen,
  labelsOpen,
  setLabelsOpen,
  notesOpen,
  setNotesOpen,
  otherChatsOpen,
  setOtherChatsOpen,
  showAllContact,
  setShowAllContact,
  labels,
  setLabels,
  notes,
  setNotes,
  isAddingNote,
  setIsAddingNote,
  draftNote,
  setDraftNote,
}: PanelBodyProps) {
  const [firstName = '', ...rest] = conversation.name.split(' ')
  const lastName = rest.join(' ')

  function handleAddLabel() {
    const nextLabel = window.prompt('Add label')
    if (!nextLabel?.trim()) return
    setLabels((current) =>
      current.includes(nextLabel.trim())
        ? current
        : [...current, nextLabel.trim()],
    )
  }

  function saveDraftNote() {
    const trimmed = draftNote.trim()
    if (!trimmed) {
      setIsAddingNote(false)
      setDraftNote('')
      return
    }

    setNotes((current) => [...current, trimmed])
    setDraftNote('')
    setIsAddingNote(false)
  }

  function handleNoteKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveDraftNote()
    }

    if (event.key === 'Escape') {
      setIsAddingNote(false)
      setDraftNote('')
    }
  }

  return (
    <div className="details-panel-content scrollbar-thin">
      {isLoading ? (
        <DetailsPanelSkeleton />
      ) : (
        <>
          <AccordionSection
            label="Chat Data"
            open={chatDataOpen}
            onToggle={() => setChatDataOpen((prev) => !prev)}
            className="details-section--first"
          >
            <div className="details-section-stack">
              <LabeledRow label="Assignee" valueWeight="regular">
                <DetailsIcon name="assignee" className="details-icon details-icon--row" />
                <span className="details-inline-value">James West</span>
              </LabeledRow>
              <LabeledRow label="Team" valueWeight="regular">
                <DetailsIcon name="team" className="details-icon details-icon--row" />
                <span className="details-inline-value">Sales Team</span>
              </LabeledRow>
            </div>
          </AccordionSection>

          <AccordionSection
            label="Contact Data"
            open={contactDataOpen}
            onToggle={() => setContactDataOpen((prev) => !prev)}
          >
            <div className="details-section-stack">
              <LabeledRow
                label="First Name"
                value={userDetails?.firstName ?? firstName}
              />
              <LabeledRow
                label="Last Name"
                value={userDetails?.lastName ?? lastName}
              />
              <LabeledRow
                label="Phone number"
                value={userDetails?.phone ?? conversation.phone}
              />
              <LabeledRow
                label="Email"
                value={userDetails?.email ?? conversation.email}
                valueWeight="semibold"
              />
              {showAllContact && (
                <>
                  <LabeledRow
                    label="Username"
                    value={userDetails?.username ?? '—'}
                  />
                  <LabeledRow
                    label="Company"
                    value={userDetails?.company.name ?? conversation.company}
                  />
                  <LabeledRow
                    label="Role"
                    value={userDetails?.company.title ?? conversation.role}
                  />
                  <LabeledRow
                    label="Department"
                    value={userDetails?.company.department ?? conversation.department}
                  />
                </>
              )}
              <button
                type="button"
                onClick={() => setShowAllContact((prev) => !prev)}
                className="details-see-all"
              >
                {showAllContact ? 'See less' : 'See all'}
              </button>
            </div>
          </AccordionSection>

          <AccordionSection
            label="Contact Labels"
            open={labelsOpen}
            onToggle={() => setLabelsOpen((prev) => !prev)}
          >
            <div className="details-labels">
              {labels.map((label) => (
                <span key={label} className="details-label-pill">
                  <DetailsIcon name="tag" className="details-icon details-icon--tag" />
                  {label}
                </span>
              ))}
              <button
                type="button"
                aria-label="Add label"
                onClick={handleAddLabel}
                className="details-label-add"
              >
                <DetailsIcon name="add-label" className="details-icon details-icon--add" />
              </button>
            </div>
          </AccordionSection>

          <AccordionSection
            label="Notes"
            open={notesOpen}
            onToggle={() => setNotesOpen((prev) => !prev)}
          >
            <NotesSection
              isAddingNote={isAddingNote}
              setIsAddingNote={setIsAddingNote}
              draftNote={draftNote}
              setDraftNote={setDraftNote}
              notes={notes}
              onSave={saveDraftNote}
              onKeyDown={handleNoteKeyDown}
            />
          </AccordionSection>

          <AccordionSection
            label="Other Chats"
            open={otherChatsOpen}
            onToggle={() => setOtherChatsOpen((prev) => !prev)}
            className="details-section--last"
          >
            <OtherChatsSection />
          </AccordionSection>
        </>
      )}
    </div>
  )
}

function NotesSection({
  isAddingNote,
  setIsAddingNote,
  draftNote,
  setDraftNote,
  notes,
  onSave,
  onKeyDown,
}: {
  isAddingNote: boolean
  setIsAddingNote: (value: boolean) => void
  draftNote: string
  setDraftNote: (value: string) => void
  notes: string[]
  onSave: () => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="details-notes">
      {isAddingNote ? (
        <input
          type="text"
          value={draftNote}
          onChange={(event) => setDraftNote(event.target.value)}
          onBlur={onSave}
          onKeyDown={onKeyDown}
          placeholder="Add a note"
          autoFocus
          className="details-note-input"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsAddingNote(true)}
          className="details-note details-note--placeholder"
        >
          Add a note
        </button>
      )}
      {notes.map((note) => (
        <p key={note} className="details-note">
          {note}
        </p>
      ))}
    </div>
  )
}

function OtherChatsSection() {
  return (
    <div className="details-other-chat">
      <div className="details-other-chat-main">
        <span className="details-instagram-wrap">
          <DetailsIcon name="instagram" className="details-icon details-icon--instagram" />
        </span>
        <div className="details-other-chat-copy">
          <p className="details-other-chat-title">Fit4Life</p>
          <p className="details-other-chat-preview">On my way!</p>
        </div>
      </div>
      <span className="details-other-chat-date">08/08/25</span>
    </div>
  )
}
