import { createSlice } from '@reduxjs/toolkit';
import countries from '../../utils/countriesList';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export default countriesSlice.reducer;
