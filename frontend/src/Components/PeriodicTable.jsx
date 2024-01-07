import React, { useEffect, useState } from 'react'
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

const PeriodicTable = ({ searchInput, setSearchInput, handleSearchEnter, handleKeyDown }) => {
    const [selectedElement, setSelectedElement] = useState('Only Elements')
    const [activeSymbol, setActiveSymbol] = useState(false)
    const elementsArray = ["Only Elements", "Atleast Elements", "Formula"]
    const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "(", ")"]
    const separatorOne = selectedElement === elementsArray[0] && "-"
    const separatorTwo = selectedElement === elementsArray[1] && ","
    const separatorThree = selectedElement === elementsArray[2] && ""

    const [separator, setSeparator] = useState(separatorOne)

    // const doNotShowSymbol = selectedElement === elementsArray[1]

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleClick = (value) => {

        if (searchInput.includes(value)) {
            setSearchInput((prevValue) =>
                prevValue.replace(new RegExp(`${value}?`), '')
            )
        } else {
            setSearchInput((prevValue) =>
                prevValue ? `${prevValue}${separatorOne || separatorTwo || separatorThree}${value}` : value)
        }
        setActiveSymbol(true)

    }

    const handleClickElement = (ele) => {
        setSelectedElement(ele)
        setSearchInput('')
        // if (selectedElement === elementsArray[1]) {
        //     setSeparator(separatorTwo)
        // } else if (selectedElement === elementsArray[2]) {
        //     setSeparator(separatorThree)
        // }
    }

    // const handleStarClick = () => {
    //     setSearchInput(prevValue => [...prevValue, "*"]);
    // }

    const handleNumberClick = (num) => {
        setSearchInput(prevValue => [...prevValue, num]);
    }

    // useEffect(() => {
    //     searchInput.replace(/[-,]$/, '')
    // }, [selectedElement])
    return (
        <div className='pt-container'>
            <div className='search-container'>
                <div className='search-div'>
                    <p>Materials</p>
                    <input type="text"
                        placeholder='e.g. Li-Fe or Li,Fe or Li3Fe or mp-19017'
                        value={searchInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearchEnter}
                        disabled={searchInput === ''}
                    >Search</button>
                </div>
            </div>
            <div className='periodic-table'>
                <div>
                    <div className='pt-elements'>
                        {elementsArray.map((element, i) => (
                            <p key={i} className={`${(selectedElement === element) ? 'active-element' : 'not-active-element'}`} onClick={() => handleClickElement(element)}>{element}</p>
                        ))}
                    </div>
                    <div className="box-star">
                        <h2>*</h2>
                    </div>
                    <div className='child-elements'>
                        {selectedElement === elementsArray[0] &&
                            <div className='selected-0'>
                                <p className='child-ele'>Select elements to search for materials with <b>only</b> these elements</p>
                            </div>
                        }
                        {selectedElement === elementsArray[1] &&
                            <div className='selected-1'>
                                <p className='child-ele'>Select elements to search for materials with <b>at least</b> these elements</p>
                            </div>
                        }
                        {selectedElement === elementsArray[2] &&
                            <div className='selected-2'>
                                <div className='formula-numbers'>
                                    {numbersArray.map((num) => (
                                        <p key={num} onClick={() => handleNumberClick(num)}>{num}</p>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {data.elements.map((element) => (
                    <div
                        className={`element ${activeSymbol && searchInput.split("-" || "," || "").includes(element.symbol) ? "active_symbol" : "inActive_symbol"}`}
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