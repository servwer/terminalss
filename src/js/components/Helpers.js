import format from 'format-number';

export const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const betFormatNumber = (number = '') => {
    return format({
        negativeLeftOut: false,
        integerSeparator: ' ',
        truncate: 2,
        decimal: ',',
        padRight: 2
    })(number);
};
