import './App.css';
import { useEffect, useState } from 'react';
import { INote } from './models/INote';
import NotePanel from './components/NotePanel';
import NoteArea from './components/NoteArea';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<number>(0);

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
      <div>
          <div className="p-10 h-full w-full min-h-3/12 min-w-min flex flex-row">
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
          </div>
      </div>
  );
}

export default App;