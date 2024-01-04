import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import '../App.css'


const Pagination = ({ materials, materialIdData, currentPage, setCurrentPage }) => {

    const handleClick = (page) => {
        if (
            page >= 1 &&
            page <= materialIdData.length / 10 &&
            page !== currentPage
        )
            setCurrentPage(page);
    };

    return (
        <div className='page-div'>
            {materialIdData.length > 0 && (
                <div className='page-sec'>
                    <button
                        className={currentPage > 1 ? "" : "disabled_class"}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <b>
                            <FaArrowLeft />
                            Prev
                        </b>
                    </button>
                    <div>
                        {[...Array(materials.length / 10)].map((_, i) => {
                            return (
                                <span
                                    key={i}
                                    className={currentPage === i + 1 ? "pageNumber selected_page" : "pageNumber unSelectedPage"}
                                    onClick={() => handleClick(i + 1)}
                                >
                                    {i + 1}
                                </span>
                            );
                        })}
                    </div>
                    <button
                        className={currentPage < materialIdData.length / 10 ? "" : "disabled_class"}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === materialIdData.length / 10}
                    >
                        <b>
                            Next
                            <FaArrowRight />
                        </b>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Pagination