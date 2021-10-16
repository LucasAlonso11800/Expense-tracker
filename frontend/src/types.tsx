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
    root: 'Y' | 'N'
};

export type AccountType = {
    id: number
    name: string
    root: 'Y' | 'N'
};


export type ModalAction =
    'Add' | 'Edit' | 'Delete' |
    'AddCategory' | 'EditCategory' | 'DeleteCategory' | 'CategoriesTable' |
    'AddAccount' | 'EditAccount' | 'DeleteAccount' | 'AccountsTable' | null;

export type StringParam = string | null;
export type NumberParam = number | null;