// rideSlice.js
import { createSlice } from '@reduxjs/toolkit';

const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    rideRequest: null,
    currentRide: null,
    loading: false,
    acceptedRide: null,
  },
  reducers: {
    setRideRequest: (state, action) => {
      state.rideRequest = action.payload;
    },
    setCurrentRide: (state, action) => {
      state.currentRide = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
      },
    setAcceptedRide: (state, action) => {
      state.acceptedRide = action.payload;
    },
  },
});

export const { setRideRequest, setCurrentRide, setLoading, setAcceptedRide  } = rideSlice.actions;
export default rideSlice.reducer;
