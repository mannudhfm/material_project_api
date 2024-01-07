import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PeriodicTable from './PeriodicTable';
import '../App.css'
import Pagination from './Pagination';
import { BASE_URL, _fields } from '../utils';

function DataComponent() {
  const [materialData, setMaterialData] = useState([])
  const [totalDoc, setTotalDoc] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  const fetchmaterialData = useCallback(async () => {
    const activeEndPoint = searchInput !== '' ? `chemsys=${searchInput}` : ''
    try {
      const { data } = await axios.get(`${BASE_URL}/${activeEndPoint}&_page=${currentPage}&_per_page=${itemsPerPage}&_fields=${_fields}`);
      setMaterialData(data.data)
      setTotalDoc(data.meta)
      setIsLoading(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })

  const handleSearchEnter = () => {
    fetchmaterialData()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchmaterialData()
      console.log("clicked")
    }
  }

  useEffect(() => {
    fetchmaterialData()
  }, [currentPage, itemsPerPage])

  console.log(materialData)

  return (
    <div className='data-component'>
      <div>
        <h1>The Materials Project</h1>
      </div>
      <PeriodicTable searchInput={searchInput} setSearchInput={setSearchInput} handleSearchEnter={handleSearchEnter} handleKeyDown={handleKeyDown} />
      <div className='material-container'>
        <div className='data-header'>
          <p> {isLoading && searchInput !== '' ? `${totalDoc.total_doc} Materials Match your search...` : <p>{`All ${totalDoc.total_doc} Materials`}</p>}</p>
          <p>
            {isLoading && materialData.length > 1 ?
              /* <p>{`Showing ${currentPage === 1 ? '1' : (currentPage * itemsPerPage) - (itemsPerPage - 1)}-${currentPage * itemsPerPage}`}</p>  */
              <p>{`1-${currentPage * itemsPerPage}`}</p>
              : <h3>Loading...</h3>
            }
          </p>
        </div>
        <div className='material-data'>
          {materialData.length !== 0 &&
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
      <Pagination materialData={materialData} currentPage={currentPage} setCurrentPage={setCurrentPage} totalDoc={totalDoc} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
    </div>
  );
}

export default DataComponent;
