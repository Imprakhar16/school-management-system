import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Fees Collected",
      data: [12000, 19000, 15000, 22000],
      backgroundColor: "#3f51b5",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
  },
};

const ChartCard = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Fees Collected (Monthly)
      </Typography>
      <Bar data={data} options={options} />
    </CardContent>
  </Card>
);

export default ChartCard;
