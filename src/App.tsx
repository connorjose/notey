import './App.css';
import NoteApp from './components/NoteApp';
import { NotesProvider } from './context/NotesContext';

export default function App() {

  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <NotesProvider>
      <NoteApp />
    </NotesProvider>
  );
}