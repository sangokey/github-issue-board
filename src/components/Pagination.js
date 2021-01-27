import React from "react";

// Button from Bootstrap
import Button from "react-bootstrap/Button";

const Pagination = ({
  issuesPerPage,
  totalIssues,
  paginate,
  pageGroup,
  nextIssues,
  currentPage,
}) => {
  // Empty array to store page numbers
  const pageNumbers = [];

  // If page group is greater than 1 (greater than 100th issue)
  if (pageGroup > 1) {
    // Push 1 so user can go back to first page
    pageNumbers.push(1);
    // Push the page previous to start of new page group (10,20,30,...) so user can go back to previous page group
    pageNumbers.push((pageGroup - 1) * 10);
  }

  // initiate i = 0
  let i = 0;

  // Loop through from 1 + (pagegroup-1)*10 -> the ceiling of (total issues / issues per page) but add the (pagegroup-1) * 10. (this accounts for page groups with < 100 issues)
  for (
    i = 1 + (pageGroup - 1) * 10;
    i <= Math.ceil(totalIssues / issuesPerPage) + (pageGroup - 1) * 10;
    i++
  ) {
    // push i to pageNumbers
    pageNumbers.push(i);
  }

  // if there is a next issue group, push the next page (11,21,31,...)
  if (nextIssues) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul id="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <Button
                variant={`${currentPage === number ? "primary" : "light"}`}
                onClick={() => paginate(number)}
                href="#!"
              >
                {number}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
