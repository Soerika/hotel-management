import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { getDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ lastweekPayments }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    let data = {};
    lastweekPayments.forEach(({ _id, count }) => {
      data[getDay(new Date(_id))] = count;
    });

    let weeks = [0, 1, 2, 3, 4, 5, 6];
    weeks.forEach((item) => {
      const isHas = data.hasOwnProperty(item);
      if (!isHas) {
        data[item] = 0;
      }
    });
    data = Object.values(data);
    setChartData({
      labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
      datasets: [
        {
          label: "Unit $",
          data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Last week's revenue chart",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
