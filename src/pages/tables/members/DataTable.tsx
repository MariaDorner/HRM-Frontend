import React, { useState } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Stack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { ImageCell, ActionCell, NameCell } from './Cells';
import { useNavigate } from 'react-router-dom';
import EmployeeProfilePage from './EmployeeProfilePage';

import './DataTable.css';

const data = mockUsers(20);
const navigate = useNavigate();

console.log(data);
const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  //const [selectedEmployee, setSelectedEmployeeId] = useState<any | null>(null); // Updated state
  //const [isEditing, setIsEditing] = useState(false); // Added state for editing mode
  const handleNameClick = (rowData: any) => {
    setSelectedEmployeeId(rowData.id);
    setIsEditing(false); // Set to false when opening the modal to view details
    // Navigate to the EmployeeProfilePage
    navigate(`/employee-profile/${rowData.id}`);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
      return item.name.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  };

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Add Member
        </Button>

        <Stack spacing={6}>
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        height={Math.max(getHeight(window) - 200, 400)}
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={80} align="center">
          <HeaderCell>Avatar</HeaderCell>
          <ImageCell rowData={data} dataKey="avatar" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" onNameClick={x => handleNameClick(x)} />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Department</HeaderCell>
          <Cell dataKey="department" />
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={120}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <ActionCell dataKey="id" onEditClick={() => handleEditClick()} />
        </Column>
      </Table>

      <DrawerView open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DataTable;
function setSelectedEmployeeId(id: any) {
  throw new Error('Function not implemented.');
}

function setIsEditing(arg0: boolean) {
  throw new Error('Function not implemented.');
}
