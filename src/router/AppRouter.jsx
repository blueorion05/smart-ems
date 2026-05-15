import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SuperAdminPage from "../pages/SuperAdminPage";
import EnergyMonitoringPage from "../pages/EnergyMonitoringPage";
import FuelMonitoringPage from "../pages/FuelMonitoringPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import ControlPanelPage from "../pages/ControlPanelPage";
import ReportsPage from "../pages/ReportsPage";
import FacilitiesPage from "../pages/FacilitiesPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/superadmin" element={<SuperAdminPage />} />
      <Route path="/energy-monitoring" element={<EnergyMonitoringPage />} />
      <Route path="/fuel-monitoring" element={<FuelMonitoringPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/control-panel" element={<ControlPanelPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
