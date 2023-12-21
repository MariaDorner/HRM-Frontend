import React from 'react';
import { Popover, Whisper, IconButton, Table, CellProps } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

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
        width: 0,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData[dataKey!]} width="40" />
    </div>
  </Cell>
);

export const ActionCell = props => {
  return (
    <Cell {...props} className="link-group">
      <IconButton appearance="subtle" icon={<MoreIcon />} />
    </Cell>
  );
};
