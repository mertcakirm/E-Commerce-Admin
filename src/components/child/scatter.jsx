import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Gerekli bileşenleri kaydet
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({type,title}) => {
    // Grafik verisi
    const data = {
        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
        datasets: [
            {
                label: "Satış Miktarı",
                data: [50, 70, 40, 90, 60,100,150,23,25,12,68,46], // Değerler
                backgroundColor: "rgba(0,157,255,0.7)",
                borderColor: "rgb(10,154,244)",
                borderWidth: 1,
            },
        ],
    };

    // Grafik seçenekleri
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
                    display: false, // X ekseni çizgilerini kaldır
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true, // Y ekseni çizgilerini göster
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
