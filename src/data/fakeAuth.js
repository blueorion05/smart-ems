import { demoRoles } from "./demoRoles";

const ROLE_KEY = "sems:userRole";
const SESSION_KEY = "sems:session";

// Simulated auth latency for the login experience.
const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export async function fakeLogin({ email, password, selectedRoleId }) {
  await wait(900);

  const normalizedEmail = email.trim().toLowerCase();
  const match = demoRoles.find((role) => {
    const roleEmail = role.credentials.email.toLowerCase();
    const rolePassword = role.credentials.password;
    const roleMatches =
      normalizedEmail === roleEmail && password.trim() === rolePassword;
    const allowedRole = selectedRoleId ? role.id === selectedRoleId : true;

    return roleMatches && allowedRole;
  });

  if (!match) {
    throw new Error("Invalid credentials. Use a demo account to sign in.");
  }

  // Persist role data for future dashboard routing.
  localStorage.setItem(ROLE_KEY, match.id);
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: match.credentials.email, roleId: match.id }),
  );

  return { roleId: match.id, roleName: match.title };
}
