import {
  GridCellValue,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY hh:mm:ss';
const PARSED_DATE_FORMAT = 'YYYY-MM-DDThh:mm:ss';

export const dateFormatter = (params: GridValueFormatterParams) => {
  return params.value && dayjs(params.value as number).format(DATE_FORMAT);
};

export const dateParser = (cellValue: GridCellValue) => {
  return cellValue && dayjs(cellValue as Date).format(PARSED_DATE_FORMAT);
};

export const dateGetter = (params: GridValueGetterParams) =>
  params.value && new Date(params.value as number);
