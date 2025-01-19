import React from 'react';
import Header from './components/header/header';
import SearchFilter from './components/searchFilter/searchFilter';
import EmployeeTable from './components/employeeTable/employeeTable';

const App: React.FC = () => {
  return (

  
   <div className="md:container md:mx-auto">
    < Header/>
    <SearchFilter/>
    <EmployeeTable/>
    </div>
 
 
  );
};

export default App;
