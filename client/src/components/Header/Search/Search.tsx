import React, { useState } from "react";

const Search = () => {
	const [search, setSearch] = useState("");

	return (
		<div className="search w-50 position-relative mx-auto">
			<input
				type="text"
				className="form-control me-2 w-100 my-2"
				value={search}
				placeholder="Поиск..."
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
};

export default Search;
