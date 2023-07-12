
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentInfo = ({ url }) => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => setResident(response.data))
      .catch(error => console.log(error));
  }, [url]);

  if (!resident) {
    return <div>Loading...</div>;
  }

  const getStatusText = () => {
    if (resident.status === 'Alive') {
      return 'Vivo';
    } else if (resident.status === 'Dead') {
      return 'Muerto';
    } else {
      return 'Desconocido';
    }
  };

  return (
    <div>
      <img src={resident.image} alt={resident.name} />
      <h3>{resident.name}</h3>
      <p><strong>Status:</strong> {getStatusText()}</p>
      <p><strong>Lugar de Origen:</strong> {resident.origin.name}</p>
      <p><strong>Episodios:</strong> {resident.episode.length}</p>
    </div>
  );
};

export default ResidentInfo;