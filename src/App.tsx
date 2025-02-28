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

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const handleNotes = (event: any, loadedNotes: INote[]) => {
  //     // console.log('event', event);
  //     setNotes(loadedNotes);
  //   };

  //   window.bridge.on('note-data', handleNotes);

  //   return () => {
  //     window.bridge.off('note-data', handleNotes);
  //   };
  // }, []); // Empty dependency array ensures this runs only once

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
    setNotes((prevNotes) =>
      prevNotes?.map((note, idx) =>
        idx === selectedNote ? updatedNote : note
      )
    );
  };

  const handleAddNote = async () => {
    console.log('Add note');
    const notes = await window.bridge.invoke('add-note', {
      title: 'New Note',
      content: '',
    });
    console.log(notes);
    setNotes(notes);
  };

  return (
    <MantineProvider>
      <Container fluid>
            <Flex gap="xl" direction="row" justify={Center} align={Center}>
                <NotePanel notes={notes} selectedNote={selectedNote} onNoteSelect={handleNoteChange} onNoteAdd={handleAddNote} />
                {selectedNoteData && (
                    <NoteArea note={selectedNoteData} onNoteUpdate={handleNoteUpdate} />
                )}
            </Flex>
        </Container>
    </MantineProvider>
  );
}

export default App;