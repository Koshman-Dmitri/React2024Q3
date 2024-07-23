import { ApiElement } from '../services/ST-API/api.types';

export const createCsvHref = (data: ApiElement[]): string => {
  if (!data.length) return '';

  const content: string[] = [];

  const tableHeader = Object.keys(data[0]).join(';');
  content.push(tableHeader);

  data.forEach((obj) => {
    const values = Object.values(obj).map((el) => {
      if (typeof el === 'object') {
        return el === null ? 'No info' : Object.values(el)[1];
      }
      return el;
    });

    content.push(values.join(';'));
  });

  return encodeURI(`data:text/csv;charset=utf-8,${content.join('\n')}`);
};
