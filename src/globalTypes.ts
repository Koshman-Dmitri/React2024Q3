import { IFormInput } from './redux/interfaces';

export type FromType = 'react-hook-form' | 'uncontrolled-form';

export type NavigationState = {
  data: IFormInput;
  from: FromType;
};
