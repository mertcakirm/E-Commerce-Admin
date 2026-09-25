import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState, useMemo } from "react";
import { GetMonthlyCategorySalesRequest, GetGeneralCategorySalesRequest } from "../../API/Order.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const modernColors = [
    "#3B82F6", // Mavi
    "#10B981", // Zümrüt Yeşil
    "#F59E0B", // Kehribar Sarı
    "#8B5CF6", // Mor
    "#EC4899", // Pembe
    "#06B6D4", // Açık Mavi
    "#64748B", // Slate Gri
];

const PieChart = ({ title, type }) => {
    const [sales, setSales] = useState([]);

    const getSalesChart = async () => {
        try {
            let response;
            if (type === "month") {
                response = await GetMonthlyCategorySalesRequest();
            } else if (type === "general") {
                response = await GetGeneralCategorySalesRequest();
            } else {
                return;
            }

            const dataFromApi = response?.data?.data || [];
            setSales(dataFromApi);
        } catch (error) {
            console.error("Grafik verisi alınamadı:", error);
        }
    };

    useEffect(() => {
        getSalesChart();
    }, [type]);

    const labels = useMemo(() => sales.map((item) => item.categoryName), [sales]);
    const values = useMemo(() => sales.map((item) => item.orderCount), [sales]);
    const totalSales = useMemo(() => values.reduce((acc, val) => acc + val, 0), [values]);

    const data = {
        labels,
        datasets: [
            {
                data: values.length > 0 ? values : [1],
                backgroundColor: values.length > 0 ? modernColors : ["#E2E8F0"],
                borderWidth: 2,
                borderColor: "#ffffff",
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: values.length > 0,
                padding: 10,
                cornerRadius: 8,
            },
        },
    };

    return (
        <div className="d-flex flex-column align-items-center h-100 p-2">
            <h6 className="text-secondary fw-semibold text-uppercase text-center mb-3" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                {title}
            </h6>

            {/* Halka ve Ortadaki Sayaç */}
            <div style={{ position: "relative", width: "170px", height: "170px" }}>
                <Doughnut data={data} options={options} />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                    }}
                >
                    <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "#0F172A", lineHeight: 1 }}>
                        {totalSales.toLocaleString()}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "3px" }}>
                        Toplam
                    </span>
                </div>
            </div>

            {/* Minimal Kategori Listesi (İlk 3 Kategori) */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 w-100">
                {sales.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="badge bg-light text-dark border fw-normal" style={{ fontSize: "0.75rem" }}>
                        <span
                            className="d-inline-block rounded-circle me-1"
                            style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: modernColors[idx % modernColors.length]
                            }}
                        />
                        {item.categoryName}: {item.orderCount}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
