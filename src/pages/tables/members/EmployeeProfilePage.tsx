// EmployeeProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from './Profile';

const EmployeeProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);

  // Fetch employee data based on the ID
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`); // Adjust the API endpoint accordingly
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleBackClick = () => {
    navigate('/employees'); // Navigate back to the list of employees
  };

  return (
    <div>
      {employeeData && <Profile employeeId={id} isEditingProp={false} employees={[employeeData]} />}
      <button onClick={handleBackClick}>Close</button>
    </div>
  );
};

export default EmployeeProfilePage;
