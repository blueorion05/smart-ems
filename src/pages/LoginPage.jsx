import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import RoleCard from "../components/RoleCard";
import Toast from "../components/Toast";
import { demoRoles } from "../data/demoRoles";
import { fakeLogin } from "../data/fakeAuth";
import "../styles/login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRoleId, setSelectedRoleId] = useState(demoRoles[0].id);
  const [form, setForm] = useState({
    email: demoRoles[0].credentials.email,
    password: demoRoles[0].credentials.password,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");

  const selectedRole = useMemo(
    () => demoRoles.find((role) => role.id === selectedRoleId),
    [selectedRoleId],
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRoleId(role.id);
    setForm({
      email: role.credentials.email,
      password: role.credentials.password,
    });
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};

    if (!emailRegex.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const loginWithCredentials = async ({ email, password, roleId }) => {
    setLoading(true);
    setErrors({});

    try {
      const result = await fakeLogin({
        email,
        password,
        selectedRoleId: roleId,
      });

      setToast(`Welcome back, ${result.roleName}. Access granted.`);

      if (result.roleId === "admin") {
        // Route SuperAdmin users to the control center dashboard.
        navigate("/superadmin");
      }
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    if (!selectedRole) return;

    handleRoleSelect(selectedRole);
    loginWithCredentials({
      email: selectedRole.credentials.email,
      password: selectedRole.credentials.password,
      roleId: selectedRole.id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    await loginWithCredentials({
      email: form.email,
      password: form.password,
      roleId: selectedRoleId,
    });
  };

  return (
    <div className="login-shell">
      <section className="brand-panel">
        <div className="brand-top">
          <Logo />
          <div className="brand-headline">
            <h1>Smart Energy Management System</h1>
            <p className="brand-subtitle">Enterprise Control Center</p>
            <p className="brand-description">
              Real-time energy monitoring and facility management
            </p>
          </div>
        </div>
        <div className="brand-features">
          <h3>Enterprise Control Center</h3>
          <ul>
            {[
              "Energy Monitoring",
              "Fuel Analytics",
              "Smart Alerts",
              "Facility Insights",
            ].map((feature) => (
              <li key={feature}>
                <span className="bolt" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M13.2 2 4 14h6l-1 8 11-14h-6l-1.8-6Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="brand-glow" aria-hidden="true" />
      </section>

      <section className="login-panel">
        <div className="login-card">
          <header>
            <p className="eyebrow">Welcome Back</p>
            <h2>Sign in to your control center</h2>
            <p className="muted">Sign in to continue to your control center</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.form ? <p className="form-error">{errors.form}</p> : null}

            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="name@sems.com"
              autoComplete="email"
              error={errors.email}
            />

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={updateField}
              placeholder="Enter your password"
              autoComplete="current-password"
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            <div className="login-actions">
              <Button type="submit" loading={loading}>
                Sign In
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
              >
                Demo Account
              </Button>
            </div>
          </form>
        </div>

        <div className="roles">
          <div className="roles-header">
            <h3>Role-based demo access</h3>
            <p className="muted">
              Select a role to auto-fill credentials and review access scopes.
            </p>
          </div>
          <div className="roles-grid">
            {demoRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isActive={role.id === selectedRoleId}
                onSelect={handleRoleSelect}
                onQuickLogin={(pickedRole) => {
                  handleRoleSelect(pickedRole);
                  loginWithCredentials({
                    email: pickedRole.credentials.email,
                    password: pickedRole.credentials.password,
                    roleId: pickedRole.id,
                  });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
