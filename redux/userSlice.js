/**
 * Sharing data across screens:
 *   These libraries define what farmer data is shared across screens and
 *   defines how we can change or update that farmer data.  This uses React
 *   Redux.
 */
 import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//  import { RootState } from '../../app/store'
 
//  import  { Farmer } from '../types';
 
 // Defines the initial farmers.
 const initialState = [];
 
 // A Slice represents all the farmer information we share and the methods we
 // want for updating farmers.
export const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
     // Sharing data across screens:
     //   When a new farmer signs up for the app, we want to make sure they are
     //   listed in the full farmer list.  How do we add that so the farmer is
     //   listed in the farmer list screen?
          append: (state, content) => {
               const user = content.payload;
               state.push(user);
          },
     // Sometimes a farmer wants to change their profile information.
     //
     // Sharing data across screens:
     //   How do we update a single farmer's profile information so it shows up
     //   correctly in the farmer list screen?
          update: (state, content) => {
               const { email, user } = content.payload;
               for (var i =0; i < state.length; ++i) {
                    if (state[i].email == email) {
                         state[i] = {
                         ...state[i],
                         ...user,
                         }
                    }
               }
          },
     },
});
 
 // Sharing data across screens:
 //   other components can only access reducers if we export them.  We must
 //   export every reducer that will be called from another component.
 export const { init, append, update } = userSlice.actions;
 
 export default userSlice.reducer;