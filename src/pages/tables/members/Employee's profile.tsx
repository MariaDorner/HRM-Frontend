import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EmployeeProfileProps {
  // Add any props needed for the profile
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch employee data based on the ID and display the profile

  const handleBackClick = () => {
    navigate('/employees'); // Navigate back to the list of employees
  };

  return (
    <div>
      {/* Display employee profile content here */}
      <h1>Employee Profile - {id}</h1>
      <button onClick={handleBackClick}>Close</button>
    </div>
  );
};

export default EmployeeProfile;
