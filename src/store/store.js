// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'; 


const authSlice = createSlice({
    name:'auth',
    initialState:{
      isLoggedIn:false,
      token : null,
      userId:null,
    },
    reducers:{
      login: (state,action)=>{
        state.isLoggedIn= true;
        state.token =action.payload.token;
        state.userId = action.payload.userId;
      },
      logout: (state)=>{
        state.isLoggedIn = false;
        state.token =null;
        state.userId = null;
      },
    },

})

export const{login,logout} = authSlice.actions;
export const authReducer = authSlice.reducer;

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;

const store = configureStore({
  reducer:{
    auth: authReducer,
    expenses: expensesReducer,
  }
});



export default store;
