import React, { createContext, useReducer, useEffect, ReactNode, useContext } from "react";
import { INote } from "@/models/INote";
import NoteService from "@/services/NoteService";

type State = {
    notes: INote[];
    selectedIndex: number
}

type Action =
  | { type: 'SET_NOTES'; payload: INote[] }
  | { type: 'ADD_NOTES'; payload: INote[] }
  | { type: 'EDIT_NOTE'; payload: { index: number; note: INote } }
  | { type: 'DELETE_NOTES'; payload: INote[] }
  | { type: 'SET_SELECTED_INDEX'; payload: number };

const initState: State = { notes: [], selectedIndex: 0 }

function notesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTES':
      return { ...state, notes: action.payload, selectedIndex: action.payload.length - 1 };
    case 'EDIT_NOTE': {
      const newNotes = [...state.notes];
      newNotes[action.payload.index] = action.payload.note;
      return { ...state, notes: newNotes };
    }
    case 'DELETE_NOTES':
      return { ...state, notes: action.payload, selectedIndex: Math.max(action.payload.length - 1, 0) };
    case 'SET_SELECTED_INDEX':
      return { ...state, selectedIndex: action.payload };
    default:
      return state;
  }
}

type ContextValue = {
  notes: INote[];
  selectedIndex: number;
  setNotes: (notes: INote[]) => void;
  addNote: () => Promise<INote[]>;
  editNote: (index: number, note: INote) => Promise<void>;
  deleteNote: (id: number) => Promise<INote[]>;
  setSelectedIndex: (i: number) => void;
};

const NotesContext = createContext<ContextValue | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notesReducer, initState);

  // subscribe to initial data from main process
  useEffect(() => {
    const handler = (_: any, notes: INote[]) => dispatch({ type: 'SET_NOTES', payload: notes });
    NoteService.onNotes(handler);
    return () => NoteService.offNotes(handler);
  }, []);

  const setNotes = (notes: INote[]) => dispatch({ type: 'SET_NOTES', payload: notes });

  const addNote = async () => {
    const notes = await NoteService.addNote({ title: 'Untitled', content: '' });
    dispatch({ type: 'ADD_NOTES', payload: notes });
    return notes;
  };

  const editNote = async (index: number, note: INote) => {
    await NoteService.editNote(note);
    dispatch({ type: 'EDIT_NOTE', payload: { index, note } });
  };

  const deleteNote = async (id: number) => {
    const notes = await NoteService.deleteNote(id);
    dispatch({ type: 'DELETE_NOTES', payload: notes });
    return notes;
  };

  const setSelectedIndex = (i: number) => dispatch({ type: 'SET_SELECTED_INDEX', payload: i });

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        selectedIndex: state.selectedIndex,
        setNotes,
        addNote,
        editNote,
        deleteNote,
        setSelectedIndex
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): ContextValue => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}