import './App.css';
import NOTES from './data/noteData.ts';
import NoteApp from './components/NoteApp';

function App() {
  // TODO: Add state logic in components for text and note selection
  // State to store: saved text --> eventually in memory through electron
  // mock some tabs of text in JSON
  // This could be intalised here or in a service? Probably service

  return (
    <NoteApp notes={NOTES} />
  );
  
}

export default App
