import { Bar } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];
const borderColor = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

const getBgColor = (index) => {
  return backgroundColor[index % 7];
};

const getBorderColor = (index) => {
  return borderColor[index % 7];
};

const BarChart = ({ data }) => {
  const formattedData = {
    labels: data.map((row) => row.title),
    datasets: [
      {
        label: "Value",
        data: data.map((row) => row.value),
        backgroundColor: data.map((row, index) => getBgColor(index)),
        borderColor: data.map((row, index) => getBorderColor(index)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={formattedData} options={options} />;
};

export default BarChart;
