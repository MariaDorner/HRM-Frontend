import React, { useState } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Stack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { NameCell } from './Cells';

const data = mockUsers(20);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleShowProfile = employee => {
    // Set the selected employee and open the DrawerView
    setSelectedEmployee(employee);
    setShowDrawer(true);
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
        {/* ... (other columns) */}

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" showProfile={handleShowProfile} rowData={undefined} />
        </Column>

        {/* ... (other columns) */}
      </Table>

      {selectedEmployee && (
        <DrawerView
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          // employee={selectedEmployee}
        />
      )}
    </>
  );
};

export default DataTable;
