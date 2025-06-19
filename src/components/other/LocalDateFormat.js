export function formatLocalDate(date, wTime = true) {
    const padZero = (num) => num.toString().padStart(2, "0");

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return (
        `${day}/${month}/${year}` + (wTime === true ? ` ${hours}:${minutes}` : "")
    );
}