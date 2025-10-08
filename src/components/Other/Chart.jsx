import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { GetMonthlyCategorySalesRequest, GetGeneralCategorySalesRequest } from "../../API/Order.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
                console.warn("Geçersiz type değeri:", type);
                return;
            }

            const dataFromApi = response.data.data;
            setSales(dataFromApi || []);
        } catch (error) {
            console.error("Hata:", error);
        }
    };

    useEffect(() => {
        getSalesChart();
    }, [type]);

    // API tipine göre etiketleri ve değerleri belirliyoruz
    const labels =
        type === "month"
            ? sales.map((item) => item.categoryName)
            : sales.map((item) => item.categoryName); // general response kategorilere göre

    const values =
        type === "month"
            ? sales.map((item) => item.orderCount) // monthly response count
            : sales.map((item) => item.orderCount); // general response count

    const totalSales = values.reduce((acc, val) => acc + val, 0);

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            cutout: "85%",
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ width: "250px", height: "250px", margin: "0 auto", position: "relative" }}>
            <h3 className="text-center mb-3">{title}</h3>
            <Doughnut data={data} options={options} />
            <div
                style={{
                    position: "absolute",
                    textAlign: "center",
                    width: "100%",
                    top: "65%",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                {totalSales}
            </div>
        </div>
    );
};

export default PieChart;