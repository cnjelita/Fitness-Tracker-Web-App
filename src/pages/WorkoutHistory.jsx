import { useAppContext } from "../context/AppContext";
import "./WorkoutHistory.css";

const TYPE_EMOJI = {
  Running: "🏃",
  Cycling: "🚴",
  Swimming: "🏊",
  "Weight Training": "🏋️",
  HIIT: "⚡",
  Yoga: "🧘",
  Walking: "🚶",
  Other: "💪",
};

export default function WorkoutHistory() {
  const { state } = useAppContext();

  if (!state.currentUser) {
    return (
      <div className="history-page">
        <p className="not-logged">Please log in to see your workout history.</p>
      </div>
    );
  }

  const myWorkouts = state.workouts
    .filter((w) => w.userId === state.currentUser.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="history-page">
      <div className="page-header">
        <h1 className="page-title">Workout History</h1>
        <p className="page-subtitle">
          {myWorkouts.length} workout{myWorkouts.length !== 1 ? "s" : ""} logged
        </p>
      </div>

      {myWorkouts.length === 0 ? (
        <div className="history-empty glass-card">
          <span style={{ fontSize: "3rem" }}>📭</span>
          <p>No workouts yet. Add your first session!</p>
        </div>
      ) : (
        <div className="history-table-wrapper glass-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {myWorkouts.map((w, idx) => (
                <tr key={w.id}>
                  <td className="row-num">{idx + 1}</td>
                  <td className="row-type">
                    <span className="type-emoji">
                      {TYPE_EMOJI[w.type] || "💪"}
                    </span>
                    {w.type}
                  </td>
                  <td className="row-date">{w.date}</td>
                  <td className="row-duration">
                    <span className="duration-badge">{w.duration} min</span>
                  </td>
                  <td className="row-notes">{w.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
