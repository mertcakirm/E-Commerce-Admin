import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { GetMonthlyCategorySalesRequest } from "../../API/Order.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title }) => {
    const [sales, setSales] = useState([]);

    const getMonthlySalesChart = async () => {
        try {
            const response = await GetMonthlyCategorySalesRequest();
            // API'den gelen data
            const dataFromApi = response.data.data;
            setSales(dataFromApi);
        } catch (error) {
            console.error("Hata:", error);
        }
    };

    useEffect(() => {
        getMonthlySalesChart();
    }, []);

    // API’den gelen veriye göre labels ve dataset oluşturuyoruz
    const data = {
        labels: sales.map((item) => item.categoryName),
        datasets: [
            {
                data: sales.map((item) => item.totalAmount), // toplam satış tutarı
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
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

    // Toplam satışı hesaplamak için
    const totalAmount = sales.reduce((acc, item) => acc + item.totalAmount, 0);

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
                {totalAmount}
            </div>
        </div>
    );
};

export default PieChart;