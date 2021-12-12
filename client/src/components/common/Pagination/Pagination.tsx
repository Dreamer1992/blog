import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface IProps {
	total: number;
	callback: (page: number) => void;
}

const Pagination: FC<IProps> = ({ total, callback }) => {
	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(1);

	const pages = [...Array(total)].map((_, i) => i + 1);

	const isActive = (index: number) => {
		if (index === currentPage) return "active";
	};

	const handleChangePage = (page: number) => {
		if (page === 0 || page > total) return;

		history.push(`?page=${page}`);
		callback(page);
	};

	useEffect(() => {
		const page = history.location.search.slice(6) || 1;

		if (Number(page) < 1 || Number(page) > total) return;

		setCurrentPage(Number(page));
	}, [history.location.search, total]);

	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination">
					{
						<li className={`page-item ${currentPage <= 1 && "disabled"}`}
							style={{ cursor: "pointer" }}
							onClick={() => handleChangePage(currentPage - 1)}
						>
								<span className="page-link" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</span>
						</li>
					}

					{
						pages.map(page => (
							<li key={page}
								className={`page-item ${isActive(page)}`}
								style={{ cursor: "pointer" }}
								onClick={() => handleChangePage(page)}
							>
								<span className="page-link">{page}</span>
							</li>
						))
					}

					{
						<li className={`page-item ${currentPage >= total && "disabled"}`}
							style={{ cursor: "pointer" }}
							onClick={() => handleChangePage(currentPage + 1)}
						>
								<span className="page-link" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</span>
						</li>
					}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;