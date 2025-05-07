import './App.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import { MantineProvider, Container, Flex, createTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { INote } from './models/INote';
import NotePanel from './components/NotePanel';
import NoteArea from './components/NoteArea';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<number>(0);
  const theme = createTheme({
    primaryColor: 'gray',
    colors: {
      gray: [
        '#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', '#ced4da',
        '#adb5bd', '#868e96', '#495057', '#343a40', '#212529',
      ],
    },
    primaryShade: { light: 6, dark: 4 },
    breakpoints: {
      xs: '30em',
      sm: '48em',
      md: '64em',
      lg: '74em',
      xl: '90em',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNotes = (_: any, loadedNotes: INote[]) => {
    // console.log('event', event);
    setNotes(loadedNotes);
  };

  useEffect(() => {
    window.bridge.on("note-data", handleNotes);

    return () => {
      window.bridge.off("note-data", handleNotes);
    };
  }, []);

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
    let notes: INote[] = await window.bridge.invoke('delete-note', noteId);
    if (notes.length === 0) {
      notes = await addNote();
    }

    setNotes(notes);
    setSelectedNote(() => {
      return notes.length > 0 ? Math.max(notes.length - 1, 0) : 0;
    });
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Container fluid className="app-container">
            <Flex gap="xl" direction="row" justify="center" align="flex-start">
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