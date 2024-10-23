import { TextInput } from "@mantine/core";

function SearchBox({
    searchQuery, 
    onSearch
}: {
    searchQuery: string, 
    onSearch: (searchQuery: string) => void }) {

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