export const formatNumber = (value: number) => {
    if (Number.isInteger(value)){
        const result = new Intl.NumberFormat('es-ES').format(value) + ",00"; 
        if(result.length === 7) return `${result.substring(0, 1)}.${result.substring(1)}`
        return result
    } 
    if (/\.\d$/.test(value.toString())){
        const result = new Intl.NumberFormat('es-ES').format(value) + "0"; 
        if(result.length === 7) return `${result.substring(0, 1)}.${result.substring(1)}`
        return result
    } 
    
    const result = new Intl.NumberFormat('es-ES').format(value); 
    if(result.length === 7) return `${result.substring(0, 1)}.${result.substring(1)}`;
    return result
};