import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Typescript types for slice
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

// Used react-redux toolkit to create slice of store
const contactsSlice = createSlice({
  // Name of slice
  name: "contacts",
  // Initial state for slice
  initialState: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      status: "active",
    },
  ] as Contact[],
  // Defined actions for slice
  // Reducers take the current state and an action as arguments, and return a new state result
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
  },
});

// Export actions from slice
export const { addContact, removeContact, editContact } = contactsSlice.actions;

// Export selector from slice
export const selectContact = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
