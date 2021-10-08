export type MovementType = {
    id: number
    type: 'I' | 'O'
    amount: number
    date: string  
    description: string
    category: string
};

export type CategoryType = {
    id: number
    name: string
}; 

export type StringParam = string | null;
export type NumberParam = number | null;