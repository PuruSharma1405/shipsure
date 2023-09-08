export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-UK', {day: 'numeric', month: 'short', year:'numeric'})
}