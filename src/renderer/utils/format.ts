import { trim, split } from 'lodash';

const SLASH = '/';

export const isOddNum = (num: number) => num % 2 === 1;
export const formatPath = (path: string) => trim(path, ` ${SLASH}`);
export const isCollectionPath = (path: string) => {
  const formattedPath = formatPath(path);
  return isOddNum(split(formattedPath, SLASH).length);
};
