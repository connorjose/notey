import './App.css';
import '@mantine/core/styles.css'
import '@mantine/tiptap/styles.css'

import NOTES from '../data/noteData';
import NoteApp from './components/NoteApp';
import { MantineProvider } from '@mantine/core';

function App() {
  // TODO: Add state logic in components for text and note selection
  // State to store: saved text --> eventually in memory through electron
  // mock some tabs of text in JSON
  // This could be intalised here or in a service? Probably service

  return (
    <MantineProvider>{<NoteApp userNotes={NOTES} />}</MantineProvider>
  );
  
}

export default App
