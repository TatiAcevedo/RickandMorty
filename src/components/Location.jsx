
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentInfo from '../components/ResidentInfo';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const Location = ({ locationId }) => {
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then(response => {
        setLocation(response.data);
        setResidents(response.data.residents);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [locationId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const residentsPerPage = 5;
  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>Información de la ubicación</h2>
          {location && (
            <div>
              <h3>{location.name}</h3>
              <p><strong>Tipo:</strong> {location.type}</p>
              <p><strong>Dimensión:</strong> {location.dimension}</p>
              <p><strong>Cantidad de Residentes:</strong> {location.residents.length}</p>
            </div>
          )}
          <h2>Residentes</h2>
          {currentResidents.map(resident => (
            <ResidentInfo key={resident} url={resident} />
          ))}
          <Pagination
            currentPage={currentPage}
            itemsPerPage={residentsPerPage}
            totalItems={residents.length}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Location;
