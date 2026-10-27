import {
  LayoutDashboard,
  Package,
  Boxes,
  ChartNoAxesCombined,
  Settings,
  Armchair
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Inventory", icon: Boxes },
  { name: "Reports", icon: ChartNoAxesCombined },
  { name: "Settings", icon: Settings }
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Armchair size={25} />
        </div>
        <div>
          <h2>ML Furniture</h2>
          <p>MANAGEMENT SYSTEM</p>
        </div>
      </div>

      <div className="sidebar-label">MENU</div>

      <nav className="nav-menu">
        {navigation.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`nav-link ${page === name ? "active" : ""}`}
            onClick={() => setPage(name)}
          >
            <Icon size={19} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">
            <Armchair size={19} />
          </div>
          <strong>Make your space better.</strong>
          <p>Manage your furniture collection in one place.</p>
        </div>

        <div className="profile">
          <div className="avatar">ML</div>
          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Store Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}