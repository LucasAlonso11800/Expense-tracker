type Param = string | number | null;
type StringParam = string | null;
type NumberParam = number | null;

export const getMovementsConditional = (type: StringParam, dateFrom: string, dateTo: string, categoryId: NumberParam, userId: number): string => {
    const where = [type, dateFrom, categoryId].reduce((acc: string, param: Param, index: number) => {
        switch (index) {
            case 0: {
                if (param) return acc + ` AND movement_type = "${type}"`
                return acc
            };
            case 1: {
                return acc + ` AND movement_date >= "${dateFrom}" AND movement_date <= "${dateTo}"`
            };
            case 2: {
                if (param) return acc + ` AND movement_category_id = ${categoryId}`
                return acc
            }
            default: return acc
        }
    }, `WHERE movement_user_id = ${userId}`);

    return where;
};