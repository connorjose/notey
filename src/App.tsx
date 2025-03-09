import './App.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import { MantineProvider, Center, Container, Flex } from '@mantine/core';
import { useState } from 'react';
import { INote } from './models/INote';
import NotePanel from './components/NotePanel';
import NoteArea from './components/NoteArea';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNotes = (event: any, loadedNotes: INote[]) => {
    // console.log('event', event);
    setNotes(loadedNotes);
  };

  window.bridge.on('note-data', handleNotes);

  const selectedNoteData = notes?.[selectedNote];

  const handleNoteChange = (noteId: number) => {
    setSelectedNote(noteId);
  };

  const handleNoteUpdate = (updatedNote: INote) => {
    window.bridge.invoke('edit-note', updatedNote);
    setNotes((prevNotes) =>
      prevNotes?.map((note, idx) =>
        idx === selectedNote ? updatedNote : note
      )
    );
  };

  const handleAddNote = async () => {
    const notes: INote[] = await window.bridge.invoke('add-note', {
      title: 'Untitled',
      content: '',
    });
    setNotes(notes);
    handleNoteChange(notes.length - 1);
  };

  const handleDeleteNote = async (noteId: number) => {
    const newNotes = await window.bridge.invoke('delete-note', noteId);
    setNotes(newNotes);
    setSelectedNote(
      selectedNote === notes.length - 1 ? selectedNote - 1 : selectedNote
    );
  };

  return (
    <MantineProvider>
      <Container fluid>
            <Flex gap="xl" direction="row" justify={Center} align={Center}>
                <NotePanel 
                  notes={notes} 
                  selectedNote={selectedNote} 
                  onNoteSelect={handleNoteChange} 
                  onNoteAdd={handleAddNote} 
                  onNoteDelete={handleDeleteNote}
                />
                {selectedNoteData && (
                    <NoteArea note={selectedNoteData} onNoteUpdate={handleNoteUpdate} />
                )}
            </Flex>
        </Container>
    </MantineProvider>
  );
}

export default App;