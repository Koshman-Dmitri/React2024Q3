import { useEffect, useState } from 'react';
import { lsAPI } from '../services/LS-API/LS-API';

export const useLocalStorage = (): readonly [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const initValue = lsAPI.getData('prevSearch_KD');
    setValue(initValue);
  }, []);

  useEffect(() => {
    setValue(value);
    lsAPI.setData('prevSearch_KD', value);
  }, [value]);

  return [value, setValue] as const;
};
