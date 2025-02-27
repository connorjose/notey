import './App.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import NoteApp from './components/NoteApp';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { INote } from './models/INote';

function App() {
  const [notes, setNotes] = useState<INote[]>();
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

  return (
    <MantineProvider>
      <NoteApp 
        notes={notes ?? []} 
        selectedNote={selectedNote}
        onNoteSelect={handleNoteChange}
        onNoteUpdate={handleNoteUpdate}
      />
    </MantineProvider>
  );
}

export default App;