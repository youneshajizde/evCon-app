import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-500 bg-gray-200 rounded-[0.60rem] hover:bg-gray-300 focus:outline-none"
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 ${
              number === currentPage
                ? "text-white bg-blue-600"
                : "text-gray-700 bg-gray-100"
            } rounded-[0.60rem] hover:bg-blue-700 focus:outline-none`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-500 bg-gray-200 rounded-[0.60rem] hover:bg-gray-300 focus:outline-none"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
