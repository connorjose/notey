import { SidebarContent, SidebarGroup, SidebarInput } from "./ui/sidebar";
import { useNotes } from "@/context/NotesContext";

// interface SearchBoxProps {
// }

function SearchBox(): JSX.Element {

    const { notes, setFilteredNotes } = useNotes();

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

    return (
        <form>
            <SidebarGroup>
                <SidebarContent>
                    <SidebarInput
                        id="search"
                        placeholder={`Search notes (${searchAccelerator})`}
                        onChange={handleSearchChange}
                        // ref={toggleSearchBoxFocus}
                    />
                </SidebarContent>
            </SidebarGroup>
        </form>
    );
}

export default SearchBox;