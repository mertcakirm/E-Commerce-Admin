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

export const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = () => reject(new Error("Dosya okuma hatası"));
        reader.readAsDataURL(file);
    });
};