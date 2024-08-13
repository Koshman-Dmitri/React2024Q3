import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../interfaces';

const initialState: IFormInput = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  isTerms: false,
  img: '',
  country: '',
};

const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    submitForm: (_, action: PayloadAction<IFormInput>) => action.payload,
  },
});

export const { submitForm } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
