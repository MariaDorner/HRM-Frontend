import React from 'react';
import { Button } from 'rsuite';

export const NameCell = ({ rowData, dataKey, ...props }) => {
  const handleClick = () => {
    // Pass the employee data to the function that handles showing the profile
    props.showProfile(rowData);
  };

  return (
    <Button appearance="link" onClick={handleClick}>
      {rowData[dataKey]}
    </Button>
  );
};
