import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PeriodicTable from './PeriodicTable';
import '../App.css'
import Pagination from './Pagination';
import { BASE_URL, _fields } from '../utils';
import { useNavigate } from 'react-router-dom';

function DataComponent() {
  const [materialData, setMaterialData] = useState([])
  const [totalDoc, setTotalDoc] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [clickEnter, setClickEnter] = useState(false);
  const containsNumbers = /\d/.test(searchInput);

  const navigate = useNavigate();

  const totalItems = totalDoc.total_doc
  const itemsPerPageChanged = itemsPerPage === 10

  const endPoint = containsNumbers ? `formula=${searchInput}` : `chemsys=${searchInput}`

  const activeEndPoint = searchInput !== '' ? endPoint : ''

  const fetchmaterialData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${activeEndPoint}&_page=${currentPage}&_per_page=${itemsPerPage}&_fields=${_fields}`);
      setMaterialData(data.data)
      setTotalDoc(data.meta)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })

  const handleSearchEnter = () => {
    fetchmaterialData()
    setClickEnter(!clickEnter)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchmaterialData()
      setClickEnter(!clickEnter)
    }
  }

  useEffect(() => {
    fetchmaterialData()
  }, [itemsPerPage, currentPage])

  return (
    <div to='' className='data-component' style={{ textDecoration: "none", color: "black" }}>
      <div>
        <h1>The Materials Project</h1>
      </div>
      <PeriodicTable searchInput={searchInput} setSearchInput={setSearchInput} handleSearchEnter={handleSearchEnter} handleKeyDown={handleKeyDown} />
      <div className='material-container'>
        <div className='data-header'>
          <div>
            {isLoading ?
              <h3>Loading...</h3> :
              <div>
                {clickEnter && searchInput !== '' && isLoading
                  ?
                  <h3>{materialData.length} Materials Match your search</h3>
                  :
                  <h3>All <span>{`${totalDoc.total_doc} Materials`}</span></h3>
                }
              </div>
            }
            {!isLoading &&
              <div>
                <h4>Showing {
                  (currentPage === 1)
                    ? `${materialData.length === 0 ? "0" : currentPage} - ${Math.min(currentPage * itemsPerPage, totalItems)}`
                    : `${currentPage * itemsPerPage - itemsPerPage + 1}- ${Math.min(currentPage * itemsPerPage, totalItems)}`
                }</h4>
              </div>
            }
          </div>
        </div>
        <div className='material-data'>
          {!isLoading && materialData.length !== 0 &&
            <div className='data_field'>
              <table border={1}>
                <thead>
                  <tr>
                    <th className='th'>Material ID</th>
                    <th className='th'>Formula</th>
                    <th className='th'>Crystal System</th>
                    <th className='th'>Space Group System</th>
                    <th className='th'>Sites</th>
                    <th className='th'>Energy Above Hull</th>
                    <th className='th'>Band Gap</th>
                    <th className='th'>Species</th>
                    <th className='th'>Density</th>
                    <th className='th'>Ordering</th>
                  </tr>
                </thead>
                <tbody>
                  {materialData
                    /* .slice(currentPage * 10 - itemsPerPage, currentPage * itemsPerPage) */
                    .map((ele, index) => (
                      <tr key={index}>
                        <td>{ele.material_id}</td>
                        <td>{ele.formula_pretty}</td>
                        <td>{ele.symmetry.crystal_system}</td>
                        <td>{ele.symmetry.symbol}</td>
                        <td>{ele.nsites}</td>
                        <td>{ele.energy_above_hull.toFixed(2)}</td>
                        <td>{ele.band_gap.toFixed(2)}</td>
                        <td>{ele.possible_species}</td>
                        <td>{ele.density.toFixed()}</td>
                        <td>{ele.ordering}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
      {materialData.length !== 0 &&
        <Pagination materialData={materialData} currentPage={currentPage} setCurrentPage={setCurrentPage} totalDoc={totalDoc} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
      }
    </div>
  );
}

export default DataComponent;
