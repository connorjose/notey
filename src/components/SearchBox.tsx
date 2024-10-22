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
        <div className="search-container">
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search"/>
        </div>
    );
}

export default SearchBox;