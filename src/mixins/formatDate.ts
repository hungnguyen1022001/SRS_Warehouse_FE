import moment from 'moment';

export const formatDateTime = (date: any) => {
    if (!date) return null
    const dateLocal = new Date(date);
    return moment(dateLocal).format('DD/MM/YYYY HH:mm');
}

export const formatDate = (date: any) => {
    if (!date) return null
    const dateLocal = new Date(date);
    return moment(dateLocal).format('DD/MM/YYYY');
}