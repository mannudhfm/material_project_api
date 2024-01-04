import React, { useState } from 'react'
import '../App.css'
import data from '../periodic-table.json'

const colorMap = {
    "noble gas": "#FFBC42",
    "alkaline earth metal": "#EC674E",
    "diatomic nonmetal": "#D81159",
    "alkali metal": "#8F2D56",
    "transition metal": "#58586B",
    "post-transition metal": "#218380",
    lanthanide: "#4AABAF",
    metalloid: "#73D2DE",
};

const PeriodicTable = ({ searchInput, setSearchInput, handleSearchEnter }) => {

    const [activeSymbol, setActiveSymbol] = useState(false)

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleClick = (value) => {
        setSearchInput((prevValue) =>
            prevValue === undefined ? value :
                prevValue + "-" + value)
        setActiveSymbol(true)
    }

    return (
        <div className='pt-container'>
            <div className='search-container'>
                <div className='search-div'>
                    <p>Materials</p>
                    <input type="text"
                        placeholder='e.g. Li-Fe or Li,Fe or Li3Fe or mp-19017'
                        value={searchInput}
                        onChange={handleChange}
                    />
                    <p onClick={handleSearchEnter}>Search</p>
                </div>
            </div>
            <div className='periodic-table'>
                {data.elements.map((element) => (
                    <div
                        className={`element ${activeSymbol && searchInput.split("-").includes(element.symbol) ? "active_symbol" : "inActive_symbol"}`}
                        key={element.name}
                        onClick={() => handleClick(element.symbol)}
                        style={{
                            gridRow: element.ypos,
                            gridColumn: element.xpos,
                            borderColor: colorMap[element.category],
                        }}
                    >
                        <strong>{element.symbol}</strong>
                        <small className="number">{element.number}</small>
                        <small className="name">{element.name}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PeriodicTable