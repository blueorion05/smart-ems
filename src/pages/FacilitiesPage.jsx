import { useEffect, useState } from "react";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import { navItems } from "../data/superAdminData";
import "../styles/superadmin.css";

const initialFacilities = [
  {
    id: "b-a",
    name: "Building A",
    location: "North Campus",
    type: "Office",
    status: "Active",
    devices: 145,
    kwh: "12,456",
  },
  {
    id: "b-b",
    name: "Building B",
    location: "South Campus",
    type: "Laboratory",
    status: "Active",
    devices: 98,
    kwh: "9,832",
  },
  {
    id: "b-c",
    name: "Building C",
    location: "East Campus",
    type: "Manufacturing",
    status: "Maintenance",
    devices: 234,
    kwh: "15,678",
  },
  {
    id: "b-d",
    name: "Building D",
    location: "West Campus",
    type: "Warehouse",
    status: "Active",
    devices: 67,
    kwh: "5,432",
  },
  {
    id: "b-e",
    name: "Building E",
    location: "Central Campus",
    type: "Office",
    status: "Active",
    devices: 156,
    kwh: "11,234",
  },
];

export default function FacilitiesPage() {
  const [activeNav, setActiveNav] = useState("facilities");
  const [timeLabel, setTimeLabel] = useState("");
  const [facilities, setFacilities] = useState(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: "",
    location: "",
    type: "Office",
    status: "Active",
    devices: 0,
    kwh: "0",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeLabel(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddFacility = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewFacility({
      name: "",
      location: "",
      type: "Office",
      status: "Active",
      devices: 0,
      kwh: "0",
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `b-${Date.now()}`;
    const facilityToAdd = {
      ...newFacility,
      id: newId,
      devices: parseInt(newFacility.devices) || 0,
    };
    setFacilities([...facilities, facilityToAdd]);
    handleModalClose();
  };

  const handleEdit = (name) => {
    alert(`Editing details for ${name}...`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      setFacilities(facilities.filter((f) => f.id !== id));
    }
  };

  const totalFacilities = facilities.length;
  const activeCount = facilities.filter((f) => f.status === "Active").length;
  const maintenanceCount = facilities.filter(
    (f) => f.status === "Maintenance",
  ).length;
  const totalDevices = facilities.reduce((sum, f) => sum + f.devices, 0);

  return (
    <div className="sems-admin">
      <SuperAdminSidebar
        items={navItems}
        activeId={activeNav}
        onSelect={setActiveNav}
      />

      <div className="sems-main">
        <SuperAdminHeader
          timeLabel={timeLabel}
          userName="Energy Admin"
          userRole="Administrator"
        />

        <main className="sems-content facilities-content">
          <div
            className="content-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ color: "var(--yellow)" }}>Facility Management</h2>
              <p>Manage facilities and connected devices</p>
            </div>
            <button className="btn-primary" onClick={handleAddFacility}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  fill="currentColor"
                />
              </svg>
              Add Facility
            </button>
          </div>

          <div className="fac-stats-grid">
            <div className="fac-stat-card">
              <div className="fac-stat-icon" style={{ color: "var(--yellow)" }}>
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    d="M3 21V3h18v18H3zm2-2h14V5H5v14zm3-8h2v2H8v-2zm0-4h2v2H8V7zm6 4h2v2h-2v-2zm0-4h2v2h-2V7z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="fac-stat-info">
                <div
                  className="fac-stat-count"
                  style={{ color: "var(--yellow)" }}
                >
                  {totalFacilities}
                </div>
                <div className="fac-stat-label">Total Facilities</div>
              </div>
            </div>

            <div className="fac-stat-card">
              <div className="fac-stat-icon" style={{ color: "#1dd1a1" }}>
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="fac-stat-info">
                <div className="fac-stat-count" style={{ color: "#1dd1a1" }}>
                  {activeCount}
                </div>
                <div className="fac-stat-label">Active</div>
              </div>
            </div>

            <div className="fac-stat-card">
              <div className="fac-stat-icon" style={{ color: "#ff9f1a" }}>
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="fac-stat-info">
                <div className="fac-stat-count" style={{ color: "#ff9f1a" }}>
                  {maintenanceCount}
                </div>
                <div className="fac-stat-label">Maintenance</div>
              </div>
            </div>

            <div className="fac-stat-card">
              <div className="fac-stat-icon" style={{ color: "var(--yellow)" }}>
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="fac-stat-info">
                <div
                  className="fac-stat-count"
                  style={{ color: "var(--yellow)" }}
                >
                  {totalDevices}
                </div>
                <div className="fac-stat-label">Total Devices</div>
              </div>
            </div>
          </div>

          <section className="fac-section">
            <h3 className="fac-section-title">All Facilities</h3>
            <div className="fac-table-wrapper">
              <table className="fac-table">
                <thead>
                  <tr>
                    <th>Facility Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Connected Devices</th>
                    <th>Monthly kWh</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.map((fac) => (
                    <tr key={fac.id}>
                      <td>
                        <div className="fac-name-cell">
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            style={{ color: "var(--yellow)" }}
                          >
                            <path
                              d="M3 21V3h18v18H3zm2-2h14V5H5v14zm3-8h2v2H8v-2zm0-4h2v2H8V7zm6 4h2v2h-2v-2zm0-4h2v2h-2V7z"
                              fill="currentColor"
                            />
                          </svg>
                          <span>{fac.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="fac-loc-cell">
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            style={{
                              color: "rgba(255,255,255,0.4)",
                              flexShrink: 0,
                            }}
                          >
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                              fill="currentColor"
                            />
                          </svg>
                          {fac.location}
                        </div>
                      </td>
                      <td style={{ color: "rgba(255,255,255,0.8)" }}>
                        {fac.type}
                      </td>
                      <td>
                        <span
                          className={`fac-badge fac-badge-${fac.status.toLowerCase()}`}
                        >
                          {fac.status}
                        </span>
                      </td>
                      <td style={{ color: "var(--yellow)" }}>{fac.devices}</td>
                      <td style={{ color: "#fff" }}>{fac.kwh}</td>
                      <td>
                        <div className="fac-actions">
                          <button
                            className="fac-btn-edit"
                            onClick={() => handleEdit(fac.name)}
                            title="Edit"
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18">
                              <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                          <button
                            className="fac-btn-delete"
                            onClick={() => handleDelete(fac.id, fac.name)}
                            title="Delete"
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18">
                              <path
                                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {facilities.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "24px",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        No facilities found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Add Facility Modal */}
      {isModalOpen && (
        <div className="fac-modal-overlay">
          <div className="fac-modal">
            <div className="fac-modal-header">
              <h3>Add New Facility</h3>
              <button className="fac-modal-close" onClick={handleModalClose}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="fac-modal-body">
              <div className="fac-form-group">
                <label>Facility Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Building F"
                  value={newFacility.name}
                  onChange={(e) =>
                    setNewFacility({ ...newFacility, name: e.target.value })
                  }
                  className="fac-form-input"
                />
              </div>

              <div className="fac-form-row">
                <div className="fac-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. North Campus"
                    value={newFacility.location}
                    onChange={(e) =>
                      setNewFacility({
                        ...newFacility,
                        location: e.target.value,
                      })
                    }
                    className="fac-form-input"
                  />
                </div>
                <div className="fac-form-group">
                  <label>Facility Type</label>
                  <select
                    value={newFacility.type}
                    onChange={(e) =>
                      setNewFacility({ ...newFacility, type: e.target.value })
                    }
                    className="fac-form-select"
                  >
                    <option>Office</option>
                    <option>Laboratory</option>
                    <option>Manufacturing</option>
                    <option>Warehouse</option>
                  </select>
                </div>
              </div>

              <div className="fac-form-row">
                <div className="fac-form-group">
                  <label>Initial Status</label>
                  <select
                    value={newFacility.status}
                    onChange={(e) =>
                      setNewFacility({ ...newFacility, status: e.target.value })
                    }
                    className="fac-form-select"
                  >
                    <option>Active</option>
                    <option>Maintenance</option>
                    <option>Offline</option>
                  </select>
                </div>
                <div className="fac-form-group">
                  <label>Connected Devices</label>
                  <input
                    type="number"
                    min="0"
                    value={newFacility.devices}
                    onChange={(e) =>
                      setNewFacility({
                        ...newFacility,
                        devices: e.target.value,
                      })
                    }
                    className="fac-form-input"
                  />
                </div>
              </div>

              <div className="fac-modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
