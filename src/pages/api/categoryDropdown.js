export const categoryDropdown = async () => {
    try {
        const response = await fetch("http://213.142.159.49:8083/api/category/get/all");
        if (!response.ok) {
            throw new Error("Kategoriler alınırken hata oluştu");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
