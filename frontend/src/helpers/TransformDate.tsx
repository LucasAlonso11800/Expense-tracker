export const transformDate = (date: string) => {
    return `${date.substring(8)}/${date.substring(5, 7)}/${date.substring(0, 4)}`
};

export const transformDateBack = (date: string) => {
    return `${date.substring(6)}-${date.substring(3, 5)}-${date.substring(0, 2)}`
};