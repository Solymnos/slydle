import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : 'user',
    initialState : 
    {
        isAuthenticated : false,
        loading : false,
        user: null,
        error : null,
        token : null,
        rank : 0,
        didItToday : false,
        lastDate : null
    },
    reducers : 
    {
        setIsAuthenticated(state, action) 
        {
            const { isAuthenticated, user, token, rank } = action.payload;
            
            state.isAuthenticated = isAuthenticated;
            if (isAuthenticated)
            {
                state.user = user;
                state.token = token;
                state.rank = rank;
            } else {
                state.user = null;
                state.token = null;
                state.rank = null;
            }
        },
        setDaily(state, action)
        {
            const { didItToday, date } = action.payload;
            state.didItToday = didItToday;
            if (didItToday)
            {
                state.lastDate = date
            } else
            {
                state.lastDate = null;
            }
        }
    }
});

export const { setIsAuthenticated, setDaily } = userSlice.actions;
export default userSlice.reducer;