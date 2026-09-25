import { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { GetYearlySalesRequest } from "../../API/Order.js";
import { FiTrendingUp, FiShoppingBag, FiCalendar } from "react-icons/fi";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MONTH_NAMES = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const BarChart = ({ title = "Yıllık Satış Analizi" }) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetSales = async () => {
        try {
            setLoading(true);
            const response = await GetYearlySalesRequest();
            setSales(response?.data || []);
        } catch (error) {
            console.error("Satış verisi alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetSales();
    }, []);

    const monthlySales = useMemo(() => {
        const result = Array(12).fill(0);
        sales.forEach(item => {
            if (item?.month >= 1 && item?.month <= 12) {
                result[item.month - 1] = Number(item.salesCount || 0);
            }
        });
        return result;
    }, [sales]);

    const totalSales = useMemo(() => {
        return monthlySales.reduce((sum, val) => sum + val, 0);
    }, [monthlySales]);

    const bestMonth = useMemo(() => {
        const maxVal = Math.max(...monthlySales, 0);
        if (maxVal === 0) return "-";
        const idx = monthlySales.indexOf(maxVal);
        return MONTH_NAMES[idx];
    }, [monthlySales]);

    const data = {
        labels: MONTH_NAMES,
        datasets: [
            {
                label: "Satış Adedi",
                data: monthlySales,
                backgroundColor: "rgba(37, 99, 235, 0.85)",
                hoverBackgroundColor: "#2563eb",
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 24,
                maxBarThickness: 32,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#0f172a",
                titleColor: "#f8fafc",
                bodyColor: "#f8fafc",
                padding: 12,
                cornerRadius: 10,
                boxPadding: 4,
                titleFont: {
                    size: 13,
                    weight: "600",
                },
                bodyFont: {
                    size: 13,
                    weight: "500",
                },
                callbacks: {
                    label: (context) => ` ${context.parsed.y} Adet Satış`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: "#64748b",
                    font: {
                        size: 12,
                        weight: "500",
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#f1f5f9",
                    drawBorder: false,
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 11,
                    },
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                width: "100%",
            }}
        >
            {/* ÜST BAŞLIK VE HIZLI METRİKLER */}
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <FiTrendingUp size={20} />
                    </div>
                    <div>
                        <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
                            {title}
                        </h5>
                        <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
                            Aylık bazda tamamlanan sipariş hacmi
                        </small>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    {/* Toplam Satış Rozeti */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "10px",
                            padding: "6px 12px",
                            fontSize: "0.82rem",
                        }}
                    >
                        <FiShoppingBag size={14} className="text-primary" />
                        <span className="text-secondary">Toplam:</span>
                        <strong className="text-dark">{totalSales} Adet</strong>
                    </div>

                    {/* Zirve Ay Rozeti */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "#ecfdf5",
                            border: "1px solid #a7f3d0",
                            borderRadius: "10px",
                            padding: "6px 12px",
                            fontSize: "0.82rem",
                        }}
                    >
                        <FiCalendar size={14} className="text-success" />
                        <span className="text-secondary">En Yüksek:</span>
                        <strong className="text-success">{bestMonth}</strong>
                    </div>
                </div>
            </div>

            {/* GRAFİK CANVAS ALANI */}
            <div style={{ height: "320px", position: "relative", width: "100%" }}>
                {loading ? (
                    <div className="d-flex align-items-center justify-content-center h-100 text-muted" style={{ fontSize: "0.88rem" }}>
                        Grafik verisi yükleniyor...
                    </div>
                ) : (
                    <Bar data={data} options={options} />
                )}
            </div>
        </div>
    );
};

export default BarChart;
