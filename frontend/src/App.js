import React from 'react';
import DataComponent from './Components/DataComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className='APP'>
        <Routes>
          <Route path='/materials/summary' exact element={<DataComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
