// src/styles/ellipsis.ts

import { SxProps } from '@mui/material';

export const ellipsisCell: SxProps = {
  whiteSpace: 'nowrap',
  minWidth: 100,
  maxWidth: 200,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'inline-block',
  verticalAlign: 'middle',
};
