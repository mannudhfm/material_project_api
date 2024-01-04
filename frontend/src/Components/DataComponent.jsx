import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PeriodicTable from './PeriodicTable';
import '../App.css'
import Pagination from './Pagination';
import { _fields } from '../utils';

function DataComponent() {
  const [materials, setMaterials] = useState([]);
  const [materialIdData, setMaterialIdData] = useState([])
  const [totalDoc, setTotalDoc] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const fetchData = useCallback(async () => {
    const activeEndPoint = searchInput !== '' ? `chemsys=${searchInput}` : "_limit=20"
    try {
      const { data } = await axios.get(`http://localhost:3001/materials/summary/${activeEndPoint}`);
      setMaterials(data.data);
      setTotalDoc(data.meta)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [fetchData])


  const fetchMaterialIdData = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/materials/summary/${id}/material_id=${id}&_fields=${_fields}`);
      setMaterialIdData((prevData) => ([
        ...prevData,
        data
      ]))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [materials.length])

  const fetchIdSequentially = useCallback(async () => {
    const material_id = materials.map(element => element.material_id)
    for (let i = 0; i < materials.length; i++) {
      await fetchMaterialIdData(material_id[i])
    }
  }, [materials.length, fetchMaterialIdData])


  // console.log(materials)
  console.log(materialIdData)

  useEffect(() => {
    fetchData()
    fetchIdSequentially()
  }, [fetchData, fetchIdSequentially])

  const handleSearchEnter = () => {
    fetchData()
    fetchIdSequentially()
    setMaterialIdData(materialIdData)
  }

  return (
    <div className='data-component'>
      <h1>Materials Project Data</h1>
      <PeriodicTable searchInput={searchInput} setSearchInput={setSearchInput} handleSearchEnter={handleSearchEnter} />
      <div className='material-container'>
        <div className='data-header'>
          <p><b>{materials.length} Materials</b>
            <b>{totalDoc.total_doc}</b>
          </p>
        </div>
        <div className='material-data'>
          <div className='id_field'>
            <table border={1}>
              <thead>
                <tr>
                  <th className='th'>Material ID</th>
                </tr>
              </thead>
              <tbody>
                {materials.slice(currentPage * 10 - 10, currentPage * 10).map((element) => (
                  <tr key={element.material_id} className='ele-data'>
                    <td>{element.material_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='data_field'>
            <table border={1}>
              <thead>
                <tr>
                  <th className='th'>Formula</th>
                  <th className='th'>Crystal System</th>
                  <th className='th'>Space Group System</th>
                  <th className='th'>Sites</th>
                  <th className='th'>Energy Above Hull</th>
                  <th className='th'>Band Gap</th>
                </tr>
              </thead>
              <tbody>
                {materialIdData && materialIdData.slice(currentPage * 10 - 10, currentPage * 10).map((ele, index) => (
                  <tr key={index}>
                    <td>{ele.data[0].formula_pretty}</td>
                    <td>{ele.data[0].symmetry.crystal_system}</td>
                    <td>{ele.data[0].symmetry.symbol}</td>
                    <td>{ele.data[0].nsites}</td>
                    <td>{ele.data[0].energy_above_hull.toFixed(2)}</td>
                    <td>{ele.data[0].band_gap.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Pagination materialIdData={materialIdData} materials={materials} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
}

export default DataComponent;
