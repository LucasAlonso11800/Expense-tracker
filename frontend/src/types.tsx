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

export type ModalAction = 'Add' | 'Edit' | 'Delete' | null;

export type StringParam = string | null;
export type NumberParam = number | null;