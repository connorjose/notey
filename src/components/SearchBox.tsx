import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

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

    return (
        <Flex align="center" justify="space-between">
            <TextInput 
                size="sm"
                placeholder="Search notes (Ctrl + F)"
                value={searchQuery}
                onChange={handleSearchChange}
                ref={toggleSearchBoxFocus}
                styles={{
                    wrapper: {
                        paddingRight: '0.5rem',
                    }
                }}
            />
            <ActionIcon size="input-sm" variant="gradient" aria-label="Settings" onClick={addNote} className="add-note-button">
                <IconSquarePlus size={85} />
            </ActionIcon>
        </Flex>
    );
}

export default SearchBox;