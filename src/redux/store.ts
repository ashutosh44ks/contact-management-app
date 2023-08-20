import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";

// Used react-redux toolkit to create store
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// Typescript types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;