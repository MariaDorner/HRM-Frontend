import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from 'rsuite';
import TrendIcon from '@rsuite/icons/Trend';
const Brand = props => {
  return (
    <Stack
      className="brand"
      style={{
        paddingTop: 30,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 15,
        borderBottom: '1px solid #d9d9d9',
        textAlign: 'left'
      }}
      {...props}
    >
      <Link to="/">
        <span
          style={{
            marginTop: 300,
            fontSize: 28,
            fontWeight: 700,
            color: '#004299',
            padding: 15
          }}
        >
          <TrendIcon style={{ paddingRight: 15, fontSize: 40 }} />
          HR System
        </span>
      </Link>
    </Stack>
  );
};

export default Brand;
