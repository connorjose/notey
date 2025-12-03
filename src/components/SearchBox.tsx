import { useEffect, useRef } from "react";
import { SidebarGroup, SidebarInput, SidebarGroupContent } from "./ui/sidebar";
import { useNotes } from "@/context/NotesContext";

// interface SearchBoxProps {
// }

function SearchBox(): JSX.Element {
    const { notes, setFilteredNotes } = useNotes();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
            note.content.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredNotes(filteredNotes);
    }
    
    const platform = window.bridge.platform;
    const isMac = platform === 'darwin';
    const searchAccelerator = isMac ? '⌘+F' : 'Ctrl+F';

    useEffect(() => {
        const handleAccelerator = (e: KeyboardEvent) => {
            if ((isMac && e.metaKey && e.key === 'f') || (!isMac && e.ctrlKey && e.key === 'f')) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        }
        window.addEventListener('keydown', handleAccelerator);
        return () => {
            window.removeEventListener('keydown', handleAccelerator);
        }
    }, [isMac]);

    return (
        <form>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarInput
                        inputRef={searchInputRef}
                        id="search"
                        placeholder={`Search notes (${searchAccelerator})`}
                        onChange={handleSearchChange}
                        className="border-0 focus:ring-0 focus-visible:ring-0 outline-none"
                    />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}

export default SearchBox;