import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
  labels: ["2023", "2024", "2025", "2026"],
  datasets: [
    {
      label: "Fees Collected",
      data: [12000, 19000, 15000, 22000],
      backgroundColor: "rgba(63, 81, 181, 0.8)",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#333",
        font: { size: 13, weight: 500 },
      },
    },
    tooltip: {
      backgroundColor: "rgba(63,81,181,0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: { color: "#555", font: { size: 12 } },
      grid: { display: false },
    },
    y: {
      ticks: { color: "#555", font: { size: 12 } },
      grid: { color: "rgba(0,0,0,0.05)" },
    },
  },
};

const ChartCard = () => (
  <Card
    elevation={4}
    sx={{
      borderRadius: 4,
      p: 2,
      background: "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(240,240,255,0.9))",
      backdropFilter: "blur(12px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 10px 30px rgba(63,81,181,0.2)",
        transform: "translateY(-3px)",
      },
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Fees Collected (Annually)
        </Typography>
      </Box>

      <Box sx={{ height: 280 }}>
        <Bar data={data} options={options} />
      </Box>
    </CardContent>
  </Card>
);

export default ChartCard;
