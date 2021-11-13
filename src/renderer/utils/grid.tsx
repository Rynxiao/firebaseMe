import React from 'react';
import { Entity } from 'renderer/states/types';
import {
  map,
  get,
  keys,
  camelCase,
  upperFirst,
  isNumber,
  isDate,
} from 'lodash';
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateGetter } from './date';

const deleteCol = {
  headerName: 'Actions',
  field: 'actions',
  type: 'actions',
  getActions: (params: GridRowParams) => [
    <GridActionsCellItem
      icon={<DeleteIcon />}
      onClick={() => {
        console.log('params', params);
      }}
      label="Delete"
    />,
  ],
} as GridColDef;

const ID = 'id';
const LAST_UPDATE_TIME = 'lastUpdateTime';
const CREATE_TIME = 'createTime';

const getType = (value: any) => {
  if (isDate(value)) {
    return 'date';
  }

  if (isNumber(value)) {
    return 'number';
  }

  return 'string';
};

const generateCol = (key: string, value: any) => {
  const col = {
    field: key,
    headerName: upperFirst(camelCase(key)),
    type: getType(value),
    editable: true,
  } as GridColDef;

  if (key === ID) {
    return { ...col, minWidth: 200, editable: false };
  }

  if (key === LAST_UPDATE_TIME || key === CREATE_TIME) {
    return {
      ...col,
      minWidth: 200,
      type: 'dateTime',
      valueGetter: dateGetter,
    };
  }

  return col;
};

export const generateGridColumns = (entityList: Entity[]): GridColDef[] => {
  const first = get(entityList, '0', {});
  const cols = map(keys(first), (key) =>
    generateCol(key, first[key])
  ) as GridColDef[];
  cols.push(deleteCol);
  return cols;
};
