import { LSKEY, LSValue } from './LS-API.types';

export const lsAPI = {
  getData: (data: keyof LSKEY): LSValue => {
    const value = localStorage.getItem(data);
    return value ? (JSON.parse(value) as LSValue) : '';
  },

  setData: (key: keyof LSKEY, data: LSValue): void => {
    localStorage.setItem(key.toString(), JSON.stringify(data));
  },
};
