import { useAppContext } from "../context/AppContext";
import "./Dashboard.css";

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="stat-card glass-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state } = useAppContext();
  const myWorkouts = state.workouts.filter(
    (w) => w.userId === state.currentUser.id
  );

  const totalWorkouts = myWorkouts.length;
  const totalDuration = myWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const avgDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  const typeCount = myWorkouts.reduce((acc, w) => {
    acc[w.type] = (acc[w.type] || 0) + 1;
    return acc;
  }, {});
  const favourite =
    Object.keys(typeCount).sort((a, b) => typeCount[b] - typeCount[a])[0] ||
    "—";

  const recentWorkouts = [...myWorkouts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <h1 className="dashboard-title">
          Good work,{" "}
          <span className="name-gradient">{state.currentUser.name}!</span>
        </h1>
        <p className="dashboard-subtitle">Here&apos;s your fitness overview.</p>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <StatCard
          icon="🏋️"
          label="Total Workouts"
          value={totalWorkouts}
          sub="sessions logged"
        />
        <StatCard
          icon="⏱️"
          label="Total Duration"
          value={`${totalDuration} min`}
          sub={`≈ ${Math.round(totalDuration / 60)} hours`}
        />
        <StatCard
          icon="📐"
          label="Avg Duration"
          value={`${avgDuration} min`}
          sub="per session"
        />
        <StatCard
          icon="⭐"
          label="Top Activity"
          value={favourite}
          sub="most frequent"
        />
      </div>

      {/* Recent Activity */}
      <div className="recent-section">
        <h2 className="section-title">Recent Activity</h2>
        {recentWorkouts.length === 0 ? (
          <p className="empty-state">No workouts yet. Add one to get started!</p>
        ) : (
          <div className="recent-list">
            {recentWorkouts.map((w) => (
              <div className="recent-item glass-card" key={w.id}>
                <div className="recent-left">
                  <span className="recent-type">{w.type}</span>
                  <span className="recent-date">{w.date}</span>
                </div>
                <div className="recent-right">
                  <span className="recent-duration">{w.duration} min</span>
                  {w.notes && (
                    <span className="recent-notes">{w.notes}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
