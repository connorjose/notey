import { TextInput } from "@mantine/core";

interface SearchBoxProps {
    searchQuery: string,
    onSearch: (searchQuery: string) => void
}

function SearchBox({
    searchQuery, 
    onSearch
}: SearchBoxProps): JSX.Element {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <TextInput 
            placeholder="Search notes"
            value={searchQuery}
            onChange={handleSearchChange}
        />
    );
}

export default SearchBox;