import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import ReactPaginate from 'react-paginate'
import '../App.css'


const Pagination = ({ materialData, currentPage, setCurrentPage, totalDoc, itemsPerPage, setItemsPerPage }) => {

    const allPages = Math.ceil(totalDoc.total_doc / itemsPerPage);

    const handlePageClick = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const handlePerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0);
    };


    return (
        <div className='page-div'>
            <select value={itemsPerPage} onChange={handlePerPageChange}>
                <option value={10}>10/Page</option>
                <option value={15}>15/Page</option>
                <option value={30}>30/Page</option>
                <option value={50}>50/Page</option>
                <option value={75}>75/Page</option>
            </select>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={allPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={6}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageClassName={'singleItem'}
                breakClassName={'break-label'}
                previousClassName={currentPage === 1 ? 'disabled prev' : 'prev'}
                nextClassName={currentPage === allPages ? 'disabled next' : 'next'}
            />
        </div>
    )
}

export default Pagination