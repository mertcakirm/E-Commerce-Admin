import { useEffect, useState } from "react";
import { GetLowStockProductsRequest } from "../../API/ProductApi.js";

const LowStock = ({ onProductClick }) => {
    const [products, setProducts] = useState([]);

    const GetProducts = async () => {
        const response = await GetLowStockProductsRequest(21);
        setProducts(response.data);
    };

    const lowStockProducts = products
        .map(product => ({
            ...product,
            totalStock: product.variants.reduce((acc, v) => acc + v.stock, 0)
        }))
        .filter(product => product.totalStock < 21)
        .sort((a, b) => a.totalStock - b.totalStock);

    useEffect(() => {
        GetProducts();
    }, []);

    return (
        <div className="col-lg-6 col-12" style={{ padding: '0% 2% 0% 1%' }}>
            <div className="site-icerik-shadow border shadow-sm rounded-5 py-5">
                <h3 className="text-center">Stoğu Azalan Ürünler</h3>
                <div className="table-responsive bg-transparent scroll-table2 mt-1">
                    <table className="table text-center ">
                        <thead>
                            <tr className="border-0">
                                <th style={{borderRadius: '30px 0 0 30px', border: '0', paddingLeft: '15px'}}>Ürün Kodu</th>
                                <th className="border-0">Ürün Kategorisi</th>
                                <th style={{borderRadius: ' 0 30px 30px 0 ', border: '0'}}>Stok Sayısı</th>
                            </tr>
                        </thead>
                        <tbody>
                        {lowStockProducts.map(product => (
                            <tr
                                key={product.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => onProductClick(product.id)}
                            >
                                <td scope="row">{product.id}</td>
                                <td>{product.name}</td>
                                <td
                                    style={{
                                        color: product.totalStock < 11 ? 'red' : 'orange',
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