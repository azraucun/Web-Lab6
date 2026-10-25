function FilterForm({ value, onFilterChange }) {
  return (
    // Enter'a basınca sayfanın yenilenmesini engelle
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Filter by title:{" "}
        <input
          type="text"
          value={value}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search posts.."
        />
      </label>
    </form>
  );
}

export default FilterForm;