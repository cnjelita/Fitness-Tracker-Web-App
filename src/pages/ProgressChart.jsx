import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useAppContext } from "../context/AppContext";
import "./ProgressChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "rgba(255,255,255,0.7)", font: { size: 12 } },
    },
    tooltip: {
      backgroundColor: "rgba(10,10,20,0.9)",
      borderColor: "rgba(124,58,237,0.5)",
      borderWidth: 1,
      titleColor: "#fff",
      bodyColor: "rgba(255,255,255,0.7)",
    },
  },
  scales: {
    x: {
      ticks: { color: "rgba(255,255,255,0.45)", maxRotation: 45 },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
    y: {
      ticks: { color: "rgba(255,255,255,0.45)" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
  },
};

export default function ProgressChart() {
  const { state } = useAppContext();

  if (!state.currentUser) {
    return (
      <div className="chart-page">
        <p className="not-logged">Please log in to view your progress.</p>
      </div>
    );
  }

  const myWorkouts = state.workouts
    .filter((w) => w.userId === state.currentUser.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = myWorkouts.map((w) => w.date);
  const durations = myWorkouts.map((w) => w.duration);

  const lineData = {
    labels,
    datasets: [
      {
        label: "Duration (min)",
        data: durations,
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167,139,250,0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#a78bfa",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Per workout type totals
  const typeMap = myWorkouts.reduce((acc, w) => {
    acc[w.type] = (acc[w.type] || 0) + w.duration;
    return acc;
  }, {});
  const typeLabels = Object.keys(typeMap);
  const typeValues = typeLabels.map((t) => typeMap[t]);

  const COLORS = [
    "#a78bfa", "#60a5fa", "#34d399", "#f59e0b",
    "#f472b6", "#fb7185", "#38bdf8", "#4ade80",
  ];

  const barData = {
    labels: typeLabels,
    datasets: [
      {
        label: "Total Duration (min)",
        data: typeValues,
        backgroundColor: typeLabels.map((_, i) => COLORS[i % COLORS.length]),
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="chart-page">
      <div className="page-header">
        <h1 className="page-title">Progress</h1>
        <p className="page-subtitle">Your workout trends over time</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h2 className="chart-title">Duration Over Time</h2>
          <div className="chart-wrapper">
            {myWorkouts.length === 0 ? (
              <p className="chart-empty">No data yet.</p>
            ) : (
              <Line
                data={lineData}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    title: { display: false },
                  },
                }}
              />
            )}
          </div>
        </div>

        <div className="chart-card glass-card">
          <h2 className="chart-title">Duration by Activity</h2>
          <div className="chart-wrapper">
            {myWorkouts.length === 0 ? (
              <p className="chart-empty">No data yet.</p>
            ) : (
              <Bar
                data={barData}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { display: false },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
