import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { GetYearlySalesRequest } from "../../API/Order.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ title }) => {
    const [sales, setSales] = useState([]);

    const GetSales = async () => {
        const response = await GetYearlySalesRequest();
        setSales(response.data);
    }

    useEffect(() => {
        GetSales();
    }, []);

    const monthlySales = Array(12).fill(0);

    sales.forEach(item => {
        const monthIndex = item.month - 1;
        monthlySales[monthIndex] = item.salesCount;
    });

    const data = {
        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        datasets: [
            {
                label: "Satış Miktarı",
                data: monthlySales,
                backgroundColor: "rgba(0,157,255,0.7)",
                borderColor: "rgb(10,154,244)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "false",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
            <h3 className="text-center mb-3">{title}</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;