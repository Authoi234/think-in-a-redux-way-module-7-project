import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransactions, deleteTransactions, editTransactions, getTransactions } from "./transactionApi";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}
};

// asyng thunk functions
export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async () => {
    const transactions = await getTransactions();
    return transactions;
});

export const createTransaction = createAsyncThunk("transaction/createTransaction", async (data) => {
    const transaction = await addTransactions(data);
    return transaction;
});

export const changeTransaction = createAsyncThunk("transaction/changeTransaction", async ({id ,data}) => {
    const transaction = await editTransactions(id ,data);
    return transaction;
});

export const removeTransaction = createAsyncThunk("transaction/removeTransaction", async (id) => {
    const transaction = await deleteTransactions(id);
    return transaction;
});

const transactionSlice = createSlice(
    {
        name: "transaction",
        initialState,
        reducers: {
            editActive: (state, action) => {
                state.editing = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchTransactions.pending, (state, action) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(fetchTransactions.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.transactions = action.payload;
                })
                .addCase(fetchTransactions.rejected, (state, action) => {
                    state.error=action.error?.message;
                    state.isError=true;
                    state.isLoading=false;
                    state.transactions=[]
                })
                .addCase(createTransaction.pending, (state, action) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(createTransaction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.transactions.push(action.payload);
                })
                .addCase(createTransaction.rejected, (state, action) => {
                    state.error=action.error?.message;
                    state.isError=true;
                    state.isLoading=false;
                })
                .addCase(changeTransaction.pending, (state, action) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(changeTransaction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);

                    state.transactions[indexToUpdate] = action.payload
                })
                .addCase(changeTransaction.rejected, (state, action) => {
                    state.error=action.error?.message;
                    state.isError=true;
                    state.isLoading=false;
                })
                .addCase(removeTransaction.pending, (state, action) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(removeTransaction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.transactions = state.transactions.filter(t => t.id !== action.meta.arg);
                })
                .addCase(removeTransaction.rejected, (state, action) => {
                    state.error=action.error?.message;
                    state.isError=true;
                    state.isLoading=false;
                })
        }
    }
)

export default transactionSlice.reducer;
export const {editActive} = transactionSlice.actions;