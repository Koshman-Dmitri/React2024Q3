import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../interfaces';

const initialState: IFormInput = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  isTerms: false,
  img: '',
  country: '',
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    submitForm: (_, action: PayloadAction<IFormInput>) => action.payload,
  },
});

export const { submitForm } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
