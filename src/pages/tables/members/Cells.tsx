import React from 'react';
import { Popover, Whisper, Table, CellProps, Button } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
const { Cell } = Table;

interface NameCellProps extends CellProps {
  dataKey: string; // Add dataKey prop
  onNameClick: (rowData: any) => void; // Add onNameClick prop
}

export const NameCell: React.FC<NameCellProps> = ({ rowData, dataKey, onNameClick, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {rowData.name}
      </p>
    </Popover>
  );

  const handleClick = () => {
    onNameClick(rowData); // Call the provided onNameClick callback
  };

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a onClick={handleClick}>{dataKey ? rowData[dataKey] : null}</a>
      </Whisper>
    </Cell>
  );
};

export const ImageCell = ({ rowData, dataKey, ...props }: CellProps) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData.avatar} width="38" />
    </div>
  </Cell>
);

const ActionCell = ({ onEditClick, rowData }) => {
  const handleEditClick = () => {
    onEditClick(rowData);
  };

  return (
    <div
      style={{
        width: 80,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <Button
        style={{
          width: 40,
          height: 30,
          padding: 4,
          margin: 3
        }}
        onClick={handleEditClick}
      >
        <EditIcon style={{ color: '#000039' }} />
      </Button>
    </div>
  );
};

export default ActionCell;
