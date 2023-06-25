import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventOperations } from "./event.operations";

export interface IEventState {
  cities: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: IEventState = {
  cities: [],
  isLoading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EventOperations.getCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.getCity.fulfilled, (state, action) => {
      state.cities = action.payload.cities;
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.getCity.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.addCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.addCity.fulfilled, (state, action) => {
      state.cities = [...state.cities, action.payload];
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.addCity.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.updateCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.updateCity.fulfilled, (state, action) => {
      const updatedCity = action.payload;
      const cityIndex = state.cities.findIndex(
        (city: any) => city._id === updatedCity._id
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex] = updatedCity;
      }
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.updateCity.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.deleteCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.deleteCity.fulfilled, (state, action) => {
      state.cities = state.cities.filter(
        (city: any) => city._id !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.deleteCity.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.getEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.getEvent.fulfilled, (state, action) => {
      const { events, eventsParams } = action.payload;
      const cityId = eventsParams.cityId;
      const cityIndex = state.cities.findIndex(
        (city: any) => city._id === cityId
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = [...events];
      }
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.getEvent.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.addEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.addEvent.fulfilled, (state, action) => {
      const { cityId, events } = action.payload;
      const cityIndex = state.cities.findIndex(
        (city: any) => city._id === cityId
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = events;
      }
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.addEvent.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.updateEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.updateEvent.fulfilled, (state, action) => {
      const { cityId, updatedEvent } = action.payload;

      const cityIndex = state.cities.findIndex(
        (city: any) => city._id === cityId
      );

      if (cityIndex !== -1) {
        const events = state.cities[cityIndex].events;

        const eventIndex = events.findIndex(
          (event: any) => event.id === updatedEvent.id
        );

        if (eventIndex !== -1) {
          events[eventIndex] = updatedEvent;
        }
      }

      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.updateEvent.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(EventOperations.deleteEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EventOperations.deleteEvent.fulfilled, (state, action) => {
      const { cityId, events } = action.payload;
      const cityIndex = state.cities.findIndex(
        (city: any) => city._id === cityId
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = events;
      }
      state.isLoading = false;
    });
    builder.addCase(
      EventOperations.deleteEvent.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export default eventSlice.reducer;
