import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      status: "active",
    },
  ] as Contact[],
  reducers: {
    addContact(
      state,
      action: {
        type: string;
        payload: {
          firstName: string;
          lastName: string;
          status: string;
        };
      }
    ) {
      state.push({
        id: Math.random(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        status: action.payload.status,
      });
    },
    removeContact(
      state,
      action: {
        type: string;
        payload: {
          id: number;
        };
      }
    ) {
      return state.filter((contact) => contact.id !== action.payload.id);
    },
    editContact(
      state,
      action: {
        type: string;
        payload: {
          id: number;
          firstName: string;
          lastName: string;
          status: string;
        };
      }
    ) {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state[index].firstName = action.payload.firstName;
      state[index].lastName = action.payload.lastName;
      state[index].status = action.payload.status;
    },
    // todoToggled(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload);
    //   todo.completed = !todo.completed;
    // },
  },
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;

export const selectContact = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
