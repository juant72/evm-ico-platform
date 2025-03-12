import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "line" | "bar" | "pie" | "doughnut";

interface ChartProps {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number | string;
  width?: number | string;
  className?: string;
}

/**
 * Reusable chart component that supports different chart types
 *
 * @param type - Type of chart to display
 * @param data - Chart data
 * @param options - Chart options
 * @param height - Chart height
 * @param width - Chart width
 * @param className - Additional class for the container
 */
const Chart = ({
  type,
  data,
  options = {},
  height,
  width,
  className = "",
}: ChartProps) => {
  // Default dark theme options
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e5e7eb", // text-gray-200
        },
      },
      tooltip: {
        backgroundColor: "#1f2937", // bg-gray-800
        titleColor: "#f9fafb", // text-gray-50
        bodyColor: "#e5e7eb", // text-gray-200
        borderColor: "#4b5563", // border-gray-600
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
      },
    },
    scales:
      type === "line" || type === "bar"
        ? {
            x: {
              grid: {
                color: "#374151", // border-gray-700
              },
              ticks: {
                color: "#9ca3af", // text-gray-400
              },
            },
            y: {
              grid: {
                color: "#374151", // border-gray-700
              },
              ticks: {
                color: "#9ca3af", // text-gray-400
              },
            },
          }
        : undefined,
  };

  // Merge the default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  // Chart style with dimensions
  const chartStyle = {
    height: height,
    width: width,
  };

  // Render appropriate chart type
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={mergedOptions} />;
      case "bar":
        return <Bar data={data} options={mergedOptions} />;
      case "pie":
        return <Pie data={data} options={mergedOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={mergedOptions} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className={`chart-container ${className}`} style={chartStyle}>
      {renderChart()}
    </div>
  );
};

export default Chart;
