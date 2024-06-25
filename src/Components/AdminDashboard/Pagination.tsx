import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./index.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  setPage: (page: number) => void;
  interviewsData: any;
  setPaginatedData: any;
  perPage: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
  setPage,
  interviewsData,
  setPaginatedData,
  perPage,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [currentpage, setCurrentpage] = useState<number | undefined>();

  console.log(currentPage, typeof currentpage, pages);

  useEffect(() => {
    const newPages: any = [];
    const maxPages = 3; // Maximum number of visible pages in the middle

    if (totalPages <= maxPages) {
      // If total pages are less than or equal to maxPages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        newPages.push(i);
      }
    } else {
      // Calculate startPage and endPage for pages in the middle
      const startPage = Math.max((currentpage || 1) - 1, 1);
      const endPage = Math.min((currentpage || 1) + 1, totalPages);

      // Add previous button if startPage is greater than 1
      if (startPage > 1) {
        newPages.push(1);
        if (startPage > 2) {
          newPages.push("...");
        }
      }

      // Add pages in the middle
      for (let i = startPage; i <= endPage; i++) {
        newPages.push(i);
      }

      // Add next button if endPage is less than totalPages
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          newPages.push("...");
        }
        newPages.push(totalPages);
      }
    }

    setPages(newPages);
  }, [currentpage, totalPages]);

  useEffect(() => {
    setCurrentpage(Number(currentPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    if (page !== currentpage && page >= 1 && page <= totalPages) {
      const lecturdata = interviewsData.slice(startIndex, endIndex);
      setPaginatedData(lecturdata);
      setPage(page);
      setCurrentpage(page);
      onChange(page);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li>
          <Button
            isDisabled={currentpage === 1}
            w="auto"
            borderRadius="6px"
            h="32px"
            className="page-link"
            bg="white"
            color="rgb(107,114,128)"
            border="1px solid rgb(209,213,219)"
            onClick={() => handlePageChange((currentpage || 1) - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
        </li>

        {pages.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <Button
                bg={currentpage === page ? "rgb(37,54,235)" : "white"}
                color={currentpage === page ? "white" : "rgb(107,114,128)"}
                w="auto"
                borderRadius="6px"
                h="32px"
                className="page-link"
                border="1px solid rgb(209,213,219)"
                onClick={() => handlePageChange(page)}
                _hover={{ bg: "blue.200" }}
              >
                {page}
              </Button>
            ) : (
              <Box
                bg="white"
                color="rgb(107,114,128)"
                w="30px"
                borderRadius="6px"
                h="32px"
                lineHeight="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="25px"
              >
                {page}
              </Box>
            )}
          </li>
        ))}
        <li>
          <Button
            isDisabled={currentpage === pages.length}
            w="auto"
            borderRadius="6px"
            h="32px"
            className="page-link"
            bg="white"
            color="rgb(107,114,128)"
            border="1px solid rgb(209,213,219)"
            onClick={() => handlePageChange(Number(currentpage) + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </li>
        {/* ... */}
      </ul>
    </nav>
  );
};

export default Pagination;
