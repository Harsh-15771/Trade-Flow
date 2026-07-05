import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);

export function DoughnutChart({ data }) {
    return <Doughnut data={data} />
} 