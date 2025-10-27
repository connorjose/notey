
interface SearchBoxProps {
    searchQuery: string,
    onSearch: (searchQuery: string) => void
    addNote: () => void,
    toggleSearchBoxFocus: React.RefObject<HTMLInputElement>
}

function SearchBox({
    searchQuery, 
    onSearch,
    addNote,
    toggleSearchBoxFocus
}: SearchBoxProps): JSX.Element {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    const platform = window.bridge.platform;
    const isMac = platform === 'darwin';
    const searchAccelerator = isMac ? '⌘+F' : 'Ctrl+F';

    return (
        <div>
            <input 
                placeholder={`Search notes ${searchAccelerator}`}
                value={searchQuery}
                onChange={handleSearchChange}
                ref={toggleSearchBoxFocus}
            />
            <button onClick={addNote}>Add note</button>
        </div>
    );
}

// <ActionIcon size="input-sm" variant="gradient" aria-label="Settings" onClick={addNote} className="add-note-button">
//     <IconSquarePlus size={85} />
// </ActionIcon>
export default SearchBox;