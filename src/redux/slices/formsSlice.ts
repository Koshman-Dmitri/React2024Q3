import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../interfaces';

const initialState: IFormInput[] = [];

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<IFormInput>) => {
      state.push(action.payload);
    },
  },
});

export const { submitForm } = formsSlice.actions;

export default formsSlice.reducer;
