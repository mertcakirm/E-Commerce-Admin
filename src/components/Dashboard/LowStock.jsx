
const LowStock = ({ onProductClick }) => {
    const productsData = [
        {
            id: 21,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 2, small: 3, large: 1, xlarge: 1, xsmall: 2}
        },
        {
            id: 2,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 1, small: 1, large: 1, xlarge: 1, xsmall: 1}
        },
        {
            id: 3,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 4,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 5,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 6,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 19,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 7,
            name: "search",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 699,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 8,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 5, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 9,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 10,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 11,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 12,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 13,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 14,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 15,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 16,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 17,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
        {
            id: 18,
            name: "T-Shirt",
            Kategori: "Üst Giyim",
            stok: 64,
            harcama: "30000",
            fiyat: 399,
            img: "https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg",
            stoklar: {medium: 9, small: 2, large: 5, xlarge: 1, xsmall: 2}
        },
    ];


    const lowStockProducts = productsData
        .map(product => ({
            ...product,
            totalStock: Object.values(product.stoklar).reduce((acc, curr) => acc + curr, 0)
        }))
        .filter(product => product.totalStock < 20)
        .sort((a, b) => a.totalStock - b.totalStock);

    return (
        <div className="col-lg-6 col-12" style={{padding: '0% 2% 0% 1%'}}>
            <div className="site-icerik-shadow py-5">
                <h3 className="text-center">Stoğu Azalan Ürünler</h3>
                <div className="table-responsive scroll-table2 mt-1">
                    <table className="table text-center table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Ürün Kodu</th>
                            <th scope="col">Ürün Kategorisi</th>
                            <th scope="col">Stok Sayısı</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lowStockProducts.map(product => (
                            <tr
                                key={product.id}
                                style={{cursor: 'pointer'}}
                                onClick={() => onProductClick(product.id)}
                            >
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td
                                    style={{
                                        color: product.totalStock < 10 ? 'red' : 'orange',
                                        fontWeight: '700'
                                    }}
                                >
                                    {product.totalStock}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LowStock;