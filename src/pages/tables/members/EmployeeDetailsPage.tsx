import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from './Profile'; // Update with the correct path
import { mockUsers } from '@/data/mock'; // Update with the correct path

const data = mockUsers(20);

interface EmployeeDetailsPageProps {}

const EmployeeDetailsPage: React.FC<EmployeeDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle the case where the employeeId is not valid or doesn't exist
  if (!id) {
    navigate('/error-404'); // Redirect to 404 page
    return null;
  }

  const employeeId = parseInt(id, 10);

  return (
    <div>
      <Profile employeeId={employeeId} employees={data} />
    </div>
  );
};

export default EmployeeDetailsPage;
