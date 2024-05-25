import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : 'user',
    initialState : 
    {
        isAuthenticated : false,
        loading : false,
        user: null,
        error : null,
    },
    reducers : 
    {
        setIsAuthenticated(state, action) 
        {
            const { isAuthenticated, user } = action.payload;
            
            state.isAuthenticated = isAuthenticated;
            if (isAuthenticated)
            {
                state.user = user;
            }
        }
    }
});

export const { setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;