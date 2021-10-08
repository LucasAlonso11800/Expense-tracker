type Param = string | number | null; 
type StringParam = string | null;
type NumberParam = number | null;

export const getMovementsConditional = (type: StringParam, amount: NumberParam, date: StringParam, categoryId: NumberParam, userId: NumberParam): string => {
    const where = [type, amount, date, categoryId].reduce((acc: string, param: Param, index: number) => {
        switch(index){
            case 0: {
                if(param) return acc + ` AND movement_type = "${type}"`
                return acc
            };
            case 1: {
                if(param) return acc + ` AND movement_amount = ${amount}`
                return acc
            };
            case 2: {
                if(param) return acc + ` AND movement_date = "${date}"`
                return acc
            };
            case 3: {
                if(param) return acc + ` AND movement_category_id = ${categoryId}`
                return acc
            }
            default: return acc
        }
    }, `WHERE movement_user_id = ${userId}`);

    return where;
};