import './App.css';
import NoteApp from './components/NoteApp';
import { NotesProvider } from './context/NotesContext';

export default function App() {

  return (
    <NotesProvider>
      <NoteApp />
    </NotesProvider>
  );
}