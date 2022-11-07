import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../components/Types/model';

export interface FavouriteCarListState {
  cars: ICar[]
}

/**
 * Default state object with initial values.
 */
const initialState: FavouriteCarListState = {
  cars : new Array()
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const carListSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCarList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      [...state.cars, action.payload]
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: FavouriteCarListState }) => state.user;

// Exports all actions
export const { setCarList } = carListSlice.actions;

export default carListSlice.reducer;