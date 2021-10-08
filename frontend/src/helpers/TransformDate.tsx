export const transformDate = (date: string) => {
    return `${date.substring(8)}/${date.substring(5, 7)}/${date.substring(0, 4)}`
};