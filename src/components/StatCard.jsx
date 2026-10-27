export default function StatCard({ icon, label, value, note, tone = "green" }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <div className={`stat-icon ${tone}`}>{icon}</div>
      </div>

      <h2 className="stat-value">{value}</h2>
      <p className="stat-note">{note}</p>
    </article>
  );
}