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
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
            p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    );
}

export default SearchBox;