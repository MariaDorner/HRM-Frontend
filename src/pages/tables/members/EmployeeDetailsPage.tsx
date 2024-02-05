import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from './Profile'; // Update with the correct path
import { mockUsers } from '@/data/mock'; // Update with the correct path

const data = mockUsers(20);

interface EmployeeDetailsPageProps {}

const EmployeeDetailsPage: React.FC<EmployeeDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  // Handle the case where the employeeId is not valid or doesn't exist

  const employeeId = parseInt(id, 10);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${employeeId}`);
      const data = await response.json();
      setUserData(data?.data?.user);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!id) {
    navigate('/error-404'); // Redirect to 404 page
    return null;
  }
  return (
    <div>
      <Profile employeeId={employeeId} isEditingProp={false} employees={userData} />
    </div>
  );
};

export default EmployeeDetailsPage;
