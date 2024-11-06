// Çerez ayarlama fonksiyonu
export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Çerez okuma fonksiyonu
export function getCookies(...names) {
    const result = {};
    const cookies = document.cookie.split(';');

    names.forEach(name => {
        const nameEQ = name + "=";
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                result[name] = c.substring(nameEQ.length, c.length);
            }
        }
    });

    return result;
}


// Çerez silme fonksiyonu
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}