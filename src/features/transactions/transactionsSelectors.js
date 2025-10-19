export const selectItems = (state) => state.transactions.items;
export const selectBalance = (state) => state.transactions.transactionsSummary.periodTotal;
export const selectLoading = (state) => state.transactions.loading;
export const selectLoadingSummary = (state) => state.transactions.loadingSummary;
export const selectError = (state) => state.transactions.error;
export const selectErrorSummary = (state) => state.transactions.errorSummary;
