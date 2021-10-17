const startOfTheMonth = new Date().setDate(1);
export const dateFrom = new Date(startOfTheMonth).toISOString().substring(0, 10);
export const dateTo = new Date().toISOString().substring(0, 10);