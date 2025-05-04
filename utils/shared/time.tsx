export const formatDateInYYYYMMDD = (date: Date): string | null => {
    if (!date || typeof date === 'number' || typeof date === 'string') return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/** Formats the date in "DD-MMM-YYYY" format */
export function formatDateInDDMMMYYYY(
    time: number | Date | string,
    isLarge?: boolean,
    showYear: boolean = true,
    twoDigit?: boolean,
    showWeekDay: boolean = false,
): string | null {
    if (time) {
        const date = typeof time === 'number' ? new Date(time * 1000) : new Date(time);
        const options: Intl.DateTimeFormatOptions = {
            day: twoDigit ? '2-digit' : 'numeric',
            month: isLarge ? 'long' : 'short',
            ...(showWeekDay && { weekday: 'short' }),
            ...(showYear && { year: 'numeric' }),
        };
        return date?.toLocaleDateString('en-GB', options);
    } else {
        return null;
    }
}
