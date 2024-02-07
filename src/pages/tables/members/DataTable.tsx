import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, Table, Button, DOMHelper, Stack, Toggle } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import ActionCell, { ImageCell, NameCell } from './Cells';
import './DataTable.css';

const data = mockUsers(20).map(user => ({
  ...user,
  isActive: user.id % 2 === 0
}));

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedEmployee, setSelectedEmployeeId] = useState<any | null>(null); // Updated state

  const navigate = useNavigate(); // Add useNavigate hook

  const CustomToggle = ({ checked, onChange }) => (
    <label className={`toggle-label ${checked ? 'active' : 'inactive'}`}>
      <Toggle checked={checked} onChange={onChange} />
    </label>
  );

  const ActiveIndicator = ({ value, rowData, onChange }) => (
    <div>
      <CustomToggle checked={value} onChange={v => onChange(v, rowData)} />
    </div>
  );

  const handleToggleChange = (value, rowData) => {
    // Handle the change of the "Active" status here (e.g., update your data or make an API call)
    console.log(`Employee ${rowData.id} is now ${value ? 'Active' : 'Inactive'}`);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handleNameClick = (rowData: any) => {
    setSelectedEmployeeId(rowData.id);
    navigate(`/employees/${rowData.id}`);
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
          Add Employee
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
        style={{ borderCollapse: 'collapse', width: '100%' }}
        height={Math.max(getHeight(window) - 200, 400)}
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={50} align="center">
          <HeaderCell> </HeaderCell>
          <Cell dataKey="edit" />
        </Column>

        <Column width={50} align="center">
          <HeaderCell>Active</HeaderCell>
          <Cell>
            {rowData => (
              <ActiveIndicator
                value={rowData.isActive}
                rowData={rowData}
                onChange={handleToggleChange}
              />
            )}
          </Cell>
        </Column>

        <Column width={50} align="center">
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
          <HeaderCell>...</HeaderCell>
          <ActionCell rowData={data} onEditClick={x => handleNameClick(x)} />
        </Column>
      </Table>

      <DrawerView open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DataTable;
