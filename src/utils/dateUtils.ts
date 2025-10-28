import { format } from 'date-fns';

export const dateUtils = {
	formatDate: (date: Date | string, formatStr: string = 'dd.MM.yyyy'): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return format(dateObj, formatStr, );
	},
	
	formatDateTime: (date: Date | string): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return format(dateObj, 'dd.MM.yyyy HH:mm');
	},
};