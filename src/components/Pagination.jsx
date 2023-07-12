
import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className="pagination">
      {renderPageNumbers()}
    </ul>
  );
};

export default Pagination;
