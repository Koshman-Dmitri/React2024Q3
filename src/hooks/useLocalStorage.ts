import { useEffect, useState } from 'react';
import { lsAPI } from '../services';

const initValue = lsAPI.getData('prevSearch_KD');

export const useLocalStorage = (): readonly [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(value);
    lsAPI.setData('prevSearch_KD', value);

    return () => {
      'No need to save on unmount. Link to admin`s message: https://discord.com/channels/794806036506607647/812644828164521984/1261223984087961610';
    };
  }, [value]);

  return [value, setValue] as const;
};
