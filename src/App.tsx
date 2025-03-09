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

  const changeSelectedNote = (noteId: number) => {
    setSelectedNote(noteId);
  };

  const updateNote = (updatedNote: INote) => {
    window.bridge.invoke('edit-note', updatedNote);
    setNotes((prevNotes) =>
      prevNotes?.map((note, idx) =>
        idx === selectedNote ? updatedNote : note
      )
    );
  };

  const addNote = async () => {
    const notes: INote[] = await window.bridge.invoke('add-note', {
      title: 'Untitled',
      content: '',
    });
    setNotes(notes);
    changeSelectedNote(notes.length - 1);

    return notes;
  };

  const deleteNote = async (noteId: number) => {
    let newNotes = await window.bridge.invoke('delete-note', noteId);
    if (newNotes.length === 0) {
      newNotes = await addNote();
    }

    setNotes(newNotes);
    setSelectedNote(() => {
      return newNotes.length > 0 ? Math.max(newNotes.length - 1, 0) : 0;
    });
  };

  return (
    <MantineProvider>
      <Container fluid>
            <Flex gap="xl" direction="row" justify={Center} align={Center}>
                <NotePanel 
                  notes={notes} 
                  selectedNote={selectedNote} 
                  changeSelectedNote={changeSelectedNote} 
                  addNote={addNote} 
                  deleteNote={deleteNote}
                />
                {selectedNoteData && (
                    <NoteArea note={selectedNoteData} onNoteUpdate={updateNote} />
                )}
            </Flex>
        </Container>
    </MantineProvider>
  );
}

export default App;