import { LSKEY, LSValue } from './LS-API.types';

export const lsAPI = {
  getData: (data: keyof LSKEY): LSValue | null => {
    const value = localStorage.getItem(data);
    return value ? (JSON.parse(value) as LSValue) : null;
  },

  setData: (key: keyof LSKEY, data: LSValue): void => {
    localStorage.setItem(key.toString(), JSON.stringify(data));
  },
};
