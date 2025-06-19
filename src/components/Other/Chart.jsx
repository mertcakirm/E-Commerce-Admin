import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({type, title}) => {
    const data = {
        labels: ["Pantolon", "T-Shirt", "Şort", "Ceket", "Ayakkabı"],
        datasets: [
            {
                data: [30, 40, 15, 25, 10], // Yüzdeler
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
            },
        ],

    };

    // Grafik seçenekleri
    const options = {
        responsive: true,
        plugins: {
            cutout: "85%",
            legend: {
                position: "false",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{width: "250px", height: "250px", margin: "0 auto", position: "relative"}}>
            <h3 className="text-center mb-3">{title}</h3>
            <Doughnut data={data} options={options}/>
            <div
                style={{
                    position: "absolute",
                    textAlign: 'center',
                    width: "100%",
                    top: "65%",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                385
            </div>
        </div>
    );
};

export default PieChart;
