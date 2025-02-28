import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

interface SearchBoxProps {
    searchQuery: string,
    onSearch: (searchQuery: string) => void
    addNote: () => void
}

function SearchBox({
    searchQuery, 
    onSearch,
    addNote
}: SearchBoxProps): JSX.Element {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <Flex align="center" justify="space-between">
            <TextInput 
                size="sm"
                placeholder="Search notes"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <ActionIcon size="input-sm" variant="transparent" aria-label="Settings" onClick={addNote}>
                <IconSquarePlus size={85} />
            </ActionIcon>
        </Flex>
    );
}

export default SearchBox;