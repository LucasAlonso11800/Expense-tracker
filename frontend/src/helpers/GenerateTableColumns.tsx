import { GridColumns } from "@material-ui/data-grid";
import { transformDate } from "./TransformDate";

const getWidth = (title: string): number => {
    switch (title) {
        case 'Date': return 150;
        case 'Type': return 150;
        case 'Amount': return 150;
        case 'Description': return 400;
        case 'Category': return 150;
        default: return 0
    }
};

const getType = (type: string): string => {
    if (type === 'I') return 'In';
    if (type === 'O') return 'Out';
    return type
};

export const generateTableColumns = (titles: string[]): GridColumns => {
    return titles.map(title => (
        {
            headerName: title,
            field: title.toLowerCase(),
            width: getWidth(title),
            valueGetter: (params) => {
                if (title === 'Date'){
                    return transformDate(params.value as string);
                } 
                if (title === 'Type'){
                    return getType(params.value as string);
                } 
                return params.value
            },
            renderCell: (params) => {
                if (title === 'Amount') {
                    if (params.row.type === 'I') return <p style={{ color: '#090' }}>${params.value}</p>
                    if (params.row.type === 'O') return <p style={{ color: '#900' }}>- ${params.value}</p>
                }
                return params.value
            }
        }
    ));
};