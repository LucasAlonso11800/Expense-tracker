import { GridColumns } from "@material-ui/data-grid";
import { transformDate, transformDateBack } from "./TransformDate";

const getWidth = (title: string): number => {
    switch (title) {
        case 'Date': return 150;
        case 'Type': return 150;
        case 'Amount': return 150;
        case 'Description': return 400;
        case 'Category': return 150;
        case 'Name': return 250;
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
                if (title === 'Date') {
                    return transformDate(params.value as string);
                }
                if (title === 'Type') {
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
            },
            sortComparator: (v1, v2) => {
                if (typeof v1 === 'number' && typeof v2 === 'number') return v1 - v2;
                if (typeof v1 === 'string' && typeof v2 === 'string') {
                    if (/\d{4}-\d{2}-\d{2}/.test(transformDateBack(v1)) && /\d{4}-\d{2}-\d{2}/.test(transformDateBack(v2))) {
                        return parseInt(transformDateBack(v1).replace(/-/g, '')) - parseInt(transformDateBack(v2).replace(/-/g, ''))
                    }

                    let first = "";
                    for (let i = 0; i < v1.length; i++) {
                        first += v1[i].charCodeAt(0).toString(2) + " ";
                    }
                    let second = "";
                    for (let i = 0; i < v2.length; i++) {
                        second += v2[i].charCodeAt(0).toString(2) + " ";
                    }
                    return parseInt(first, 2) - parseInt(second, 2)
                }
                return 1
            }
        }
    ));
};