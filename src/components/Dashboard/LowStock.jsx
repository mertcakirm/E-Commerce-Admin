import { useEffect, useState, useMemo } from "react";
import { GetLowStockProductsRequest } from "../../API/ProductApi.js";
import { FiAlertTriangle } from "react-icons/fi";

const LowStock = ({ onProductClick }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetProducts = async () => {
        try {
            setLoading(true);
            const response = await GetLowStockProductsRequest(21);
            setProducts(response?.data || []);
        } catch (error) {
            console.error("Kritik stok verileri alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    const lowStockProducts = useMemo(() => {
        return products
            .map(product => ({
                ...product,
                totalStock: product.variants?.reduce((acc, v) => acc + (v.stock || 0), 0) ?? 0
            }))
            .filter(product => product.totalStock < 21)
            .sort((a, b) => a.totalStock - b.totalStock);
    }, [products]);

    useEffect(() => {
        GetProducts();
    }, []);

    return (
        <div className="d-flex flex-column h-100">
            {/* Başlık Alanı */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                    <div 
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{ width: "36px", height: "36px", backgroundColor: "#fef2f2", color: "#ef4444" }}
                    >
                        <FiAlertTriangle size={18} />
                    </div>
                    <div>
                        <h6 className="m-0 fw-bold text-dark">Kritik Stok Uyarıları</h6>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                            20 adedin altındaki ürünler
                        </small>
                    </div>
                </div>
                <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill fw-semibold" style={{ fontSize: "0.75rem" }}>
                    {lowStockProducts.length} Ürün
                </span>
            </div>

            {/* Tablo Alanı */}
            <div className="table-responsive p-0 m-0 border-0 bg-transparent flex-grow-1" style={{ maxHeight: "330px", overflowY: "auto" }}>
                <table className="table align-middle m-0 table-hover">
                    <thead style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#ffffff" }}>
                        <tr className="border-bottom text-secondary" style={{ fontSize: "0.78rem" }}>
                            <th className="bg-white py-2 ps-2 text-uppercase">Kod</th>
                            <th className="bg-white py-2 text-uppercase">Ürün Adı</th>
                            <th className="bg-white py-2 text-end pe-2 text-uppercase">Kalan Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-muted">
                                    Yükleniyor...
                                </td>
                            </tr>
                        ) : lowStockProducts.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-muted">
                                    Kritik stok seviyesinde ürün bulunmuyor.
                                </td>
                            </tr>
                        ) : (
                            lowStockProducts.map(product => {
                                const isCritical = product.totalStock < 10;
                                return (
                                    <tr
                                        key={product.id}
                                        style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                                        onClick={() => onProductClick(product.id)}
                                        title="Detaylar için tıklayın"
                                    >
                                        <td className="ps-2 fw-semibold text-muted" style={{ fontSize: "0.85rem" }}>
                                            #{product.id}
                                        </td>
                                        <td className="fw-medium text-dark" style={{ fontSize: "0.9rem" }}>
                                            {product.name}
                                        </td>
                                        <td className="text-end pe-2">
                                            <span 
                                                className={`badge rounded-pill px-2.5 py-1 ${
                                                    isCritical 
                                                        ? 'bg-danger-subtle text-danger border border-danger-subtle' 
                                                        : 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                                                }`}
                                                style={{ fontSize: "0.8rem", fontWeight: "600" }}
                                            >
                                                {product.totalStock} Adet
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LowStock;
