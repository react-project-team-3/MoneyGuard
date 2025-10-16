import axios from 'axios';

//Get all transactions for logged in user
export const getTransactionsApi = async (token) => {
    const res = await axios.get(
        '/api/transactions',
        { 
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
    return res.data;
};

//Update transaction
export const updateTransactionsApi = async (transactionId, updateData, token) => {
    const res = await axios.patch(
        `/api/transactions/${transactionId}`, 
        updateData, 
        { 
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
    return res.data;
}

//Create new transaction for logged in user
export const addTransactionsApi = async (transactionsData, token) => {
    const res = await axios.post(
        `/api/transactions`,
        transactionsData,
        { 
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
    return res.data;
}

//Remove transaction
export const removeTransactionsApi = async (transactionId, token) =>{
    const res = await axios.delete(
        `/api/transactions/${transactionId}`,
        { 
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
    return res.data;
}

//Get transactions summary for period
export const transactionsSummApi = async (date, token) => {
    const res = await axios.get(
        `https://wallet.b.goit.study/api/transactions-summary?month=${date.month}&year=${date.year}`,
        { 
            headers: {"Authorization" : `Bearer ${token}`} 
        });
    return res.data;
};