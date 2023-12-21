import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from 'rsuite';

const Brand = props => {
  return (
    <Stack className="brand" {...props}>
      <Link to="/">
        <span style={{ marginLeft: 20, fontSize: 32, fontWeight: 700 }}>HR System</span>
      </Link>
    </Stack>
  );
};

export default Brand;
