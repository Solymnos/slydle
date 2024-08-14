import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : 'user',
    initialState : 
    {
        isAuthenticated : false,
        user: null,
        token : null,
        rank : 0,
        didItToday : false,
        lastDate : null,
        dailyTries : null,
        dailyScore : null,
        gameArray : [],
        answer : null
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
            const { didItToday, date, tries } = action.payload;
            state.didItToday = didItToday;
            if (didItToday)
            {
                state.lastDate = date
                state.dailyTries = tries;
            } else
            {
                state.lastDate = null;
                state.dailyTries = null;
                state.dailyScore = null;
                state.gameArray = [];
            }
        },
        setDailyScore(state, action)
        {
            const { score } = action.payload;
            state.dailyScore = score;
        },
        setGameArray(state, action)
        {
            const { gameArray } = action.payload;
            state.gameArray = gameArray;
        },
        setDailyAnswer(state, action)
        {
            const { answer } = action.payload;
            state.dailyAnswer = answer;
        }
    }
});

export const { setIsAuthenticated, setDaily, setDailyScore, setGameArray, setDailyAnswer } = userSlice.actions;
export default userSlice.reducer;