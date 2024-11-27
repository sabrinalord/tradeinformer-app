export function formatDate(dateString: string, locale: string = "en-US"): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = { 
        year: "numeric", 
        month: "long",   
        day: "numeric", 
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
}