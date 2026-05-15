export const demoRoles = [
  {
    id: "admin",
    title: "Building Admin",
    subtitle: "SuperAdmin",
    badgeLabel: "Admin",
    badgeColor: "yellow",
    credentials: {
      email: "admin@sems.com",
      password: "Admin123",
    },
    access: [
      "Overall system management",
      "Facility management",
      "Energy analytics",
      "Reports",
      "Alerts",
      "User management",
    ],
  },
  {
    id: "engineer",
    title: "Maintenance / Engineer",
    subtitle: "Operations",
    badgeLabel: "Engineer",
    badgeColor: "orange",
    credentials: {
      email: "engineer@sems.com",
      password: "Engineer123",
    },
    access: [
      "Floor controls",
      "Equipment monitoring",
      "HVAC analytics",
      "Maintenance reports",
      "System diagnostics",
    ],
  },
  {
    id: "tenant",
    title: "Tenant / Occupant",
    subtitle: "Observer",
    badgeLabel: "Tenant",
    badgeColor: "green",
    credentials: {
      email: "tenant@sems.com",
      password: "Tenant123",
    },
    access: [
      "Personal monitoring",
      "Usage reports",
      "Energy consumption viewing",
      "Alerts only",
    ],
  },
];
