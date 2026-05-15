// Placeholder dashboard data for future API integration.
export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "energy", label: "Energy Monitoring", icon: "energy" },
  { id: "fuel", label: "Fuel Monitoring", icon: "fuel" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "control", label: "Control Panel", icon: "control" },
  { id: "reports", label: "Reports", icon: "reports" },
  { id: "facilities", label: "Facilities", icon: "facilities" },
  { id: "settings", label: "Settings", icon: "settings" },
];

export const metricCards = [
  {
    id: "energy",
    label: "Total Energy Consumption",
    value: "12,456",
    unit: "kWh",
    delta: "12.5% vs last month",
    trend: "down",
    icon: "bolt",
  },
  {
    id: "fuel",
    label: "Total Fuel Usage",
    value: "3,240",
    unit: "L",
    delta: "8.3% vs last month",
    trend: "down",
    icon: "fuel",
  },
  {
    id: "baseline",
    label: "Reduction vs Baseline",
    value: "18.7",
    unit: "%",
    delta: "5.2% vs last month",
    trend: "up",
    icon: "trend",
  },
  {
    id: "efficiency",
    label: "System Efficiency Score",
    value: "87.3",
    unit: "%",
    delta: "3.1% vs last month",
    trend: "up",
    icon: "gauge",
  },
];

export const alertItems = [
  {
    id: "alert-1",
    title: "High Power Spike - Building C",
    time: "2 min ago",
    severity: "critical",
  },
  {
    id: "alert-2",
    title: "HVAC Runtime Exceeds Target",
    time: "15 min ago",
    severity: "warning",
  },
  {
    id: "alert-3",
    title: "Fuel Tank Level Below 30%",
    time: "1 hour ago",
    severity: "warning",
  },
  {
    id: "alert-4",
    title: "Scheduled Maintenance Due",
    time: "3 hours ago",
    severity: "info",
  },
];

export const chartTabs = [
  { id: "hourly", label: "Hourly" },
  { id: "daily", label: "Daily" },
  { id: "monthly", label: "Monthly" },
];

export const chartSeries = {
  hourly: [
    { label: "00:00", value: 160 },
    { label: "04:00", value: 140 },
    { label: "08:00", value: 260 },
    { label: "12:00", value: 300 },
    { label: "16:00", value: 280 },
    { label: "20:00", value: 190 },
    { label: "23:59", value: 165 },
  ],
  daily: [
    { label: "Mon", value: 210 },
    { label: "Tue", value: 235 },
    { label: "Wed", value: 248 },
    { label: "Thu", value: 260 },
    { label: "Fri", value: 275 },
    { label: "Sat", value: 230 },
    { label: "Sun", value: 205 },
  ],
  monthly: [
    { label: "Jan", value: 280 },
    { label: "Feb", value: 255 },
    { label: "Mar", value: 265 },
    { label: "Apr", value: 240 },
    { label: "May", value: 270 },
    { label: "Jun", value: 295 },
  ],
};

export const facilityPerformance = [
  { label: "Building A", value: 450 },
  { label: "Building B", value: 380 },
  { label: "Building C", value: 520 },
  { label: "Building D", value: 300 },
  { label: "Building E", value: 420 },
];

export const energyDistribution = [
  { label: "HVAC: 45%", value: 45, color: "#ffd400" },
  { label: "Lighting: 25%", value: 25, color: "#ffb000" },
  { label: "Equipment: 30%", value: 30, color: "#ff7a00" },
];

export const energyConsumptionLog = [
  {
    timestamp: "2026-04-30 14:30:15",
    facility: "Building A",
    usage: "285.4",
    status: "Normal",
  },
  {
    timestamp: "2026-04-30 14:30:15",
    facility: "Building B",
    usage: "198.2",
    status: "Normal",
  },
  {
    timestamp: "2026-04-30 14:30:15",
    facility: "Building C",
    usage: "342.8",
    status: "Warning",
  },
  {
    timestamp: "2026-04-30 14:30:15",
    facility: "Building D",
    usage: "156.5",
    status: "Normal",
  },
  {
    timestamp: "2026-04-30 14:30:15",
    facility: "Building E",
    usage: "412.1",
    status: "Critical",
  },
  {
    timestamp: "2026-04-30 14:25:00",
    facility: "Building A",
    usage: "278.9",
    status: "Normal",
  },
  {
    timestamp: "2026-04-30 14:25:00",
    facility: "Building B",
    usage: "195.7",
    status: "Normal",
  },
  {
    timestamp: "2026-04-30 14:25:00",
    facility: "Building C",
    usage: "338.4",
    status: "Warning",
  },
];

export const fuelMetrics = [
  {
    id: "total_fuel",
    label: "Total Fuel Used",
    value: "3,240",
    unit: "L",
    delta: "8.3% vs last month",
    trend: "down",
    icon: "M10 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zm4 0V3h-2v1h2zm2 2H8v13h8V6zm-5 3a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1z",
  },
  {
    id: "efficiency",
    label: "Efficiency Rate",
    value: "92.4",
    unit: "%",
    delta: "2.1% vs last month",
    trend: "up",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.14 3.16-7.56 7.22-7.96v2.02C8.3 6.42 6 8.93 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.88-0.87-3.56-2.22-4.66l-1.39 1.48C15.39 9.61 16 10.74 16 12c0 2.21-1.79 4-4 4-1.63 0-3.03-0.98-3.66-2.39L6.5 14.5C7.54 16.59 9.59 18 12 18z M12 6c-1.66 0-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-1.34 3-3 3v2c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
  },
  {
    id: "cost",
    label: "Cost Estimation",
    value: "$4,860",
    unit: "",
    delta: "6.5% vs last month",
    trend: "down",
    icon: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  },
];

export const fuelTrendData = [
  { label: "Apr 24", value: 420 },
  { label: "Apr 25", value: 385 },
  { label: "Apr 26", value: 405 },
  { label: "Apr 27", value: 395 },
  { label: "Apr 28", value: 425 },
  { label: "Apr 29", value: 385 },
  { label: "Apr 30", value: 400 },
];

export const fuelUsageSource = [
  { label: "Generator 1", value: 850 },
  { label: "Generator 2", value: 720 },
  { label: "Generator 3", value: 680 },
  { label: "Vehicle Fleet", value: 1000 },
];

export const fuelLogs = [
  {
    date: "2026-04-30",
    facility: "Building A",
    liters: "145.5 L",
    source: "Generator 1",
  },
  {
    date: "2026-04-30",
    facility: "Building C",
    liters: "98.2 L",
    source: "Generator 2",
  },
  {
    date: "2026-04-30",
    facility: "Vehicle Fleet",
    liters: "235.8 L",
    source: "Fleet Pool",
  },
  {
    date: "2026-04-29",
    facility: "Building A",
    liters: "138.9 L",
    source: "Generator 1",
  },
  {
    date: "2026-04-29",
    facility: "Building B",
    liters: "112.4 L",
    source: "Generator 3",
  },
  {
    date: "2026-04-29",
    facility: "Building C",
    liters: "95.7 L",
    source: "Generator 2",
  },
];

export const fuelTanks = [
  { id: "A", name: "Tank A - Gen 1", percentage: 75, status: "Normal" },
  { id: "B", name: "Tank B - Gen 2", percentage: 45, status: "Normal" },
  { id: "C", name: "Tank C - Gen 3", percentage: 28, status: "Low" },
  { id: "D", name: "Tank D - Fleet", percentage: 62, status: "Normal" },
];

export const analyticsMetrics = [
  {
    id: "target_achievement",
    label: "Target Achievement",
    value: "93.2",
    unit: "%",
    delta: "8.5% vs last month",
    trend: "up",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.14 3.16-7.56 7.22-7.96v2.02C8.3 6.42 6 8.93 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.88-0.87-3.56-2.22-4.66l-1.39 1.48C15.39 9.61 16 10.74 16 12c0 2.21-1.79 4-4 4-1.63 0-3.03-0.98-3.66-2.39L6.5 14.5C7.54 16.59 9.59 18 12 18z M12 6c-1.66 0-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1-1.34 3-3 3v2c2.76 0 5-2.24 5-5s-2.24-5-5-5z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z",
  },
  {
    id: "total_reduction",
    label: "Total Reduction",
    value: "18.7",
    unit: "%",
    delta: "5.2% vs last month",
    trend: "up",
    icon: "M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z",
  },
  {
    id: "cost_savings",
    label: "Cost Savings",
    value: "$12.4K",
    unit: "",
    delta: "12.3% vs last month",
    trend: "up",
    icon: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z",
  },
  {
    id: "ai_insights",
    label: "AI Insights",
    value: "3",
    unit: "active",
    delta: "",
    trend: "none",
    icon: "M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z",
  },
];

export const baselineVsActualData = [
  { label: "Jan", baseline: 14000, actual: 13300 },
  { label: "Feb", baseline: 14200, actual: 12900 },
  { label: "Mar", baseline: 14800, actual: 12500 },
  { label: "Apr", baseline: 15200, actual: 12200 },
  { label: "May", baseline: 15400, actual: 12500 },
  { label: "Jun", baseline: 15600, actual: 12700 },
];

export const reductionByCategoryData = [
  { category: "HVAC", current: 22, target: 20, met: true },
  { category: "Lighting", current: 18, target: 15, met: true },
  { category: "Equipment", current: 12, target: 15, met: false },
  { category: "Other", current: 8, target: 10, met: false },
];

export const forecastData = [
  { label: "May", actual: 12500, forecast: 12500 },
  { label: "Jun", actual: 12700, forecast: 12700 },
  { label: "Jul", actual: null, forecast: 12400 },
  { label: "Aug", actual: null, forecast: 12100 },
  { label: "Sep", actual: null, forecast: 11800 },
  { label: "Oct", actual: null, forecast: 11500 },
];

export const aiInsightsData = [
  {
    id: 1,
    title: "HVAC Optimization Opportunity",
    severity: "High",
    description:
      "Reduce HVAC runtime by 15% during off-peak hours to meet monthly target",
    action: "~$850/month",
    type: "opportunity",
  },
  {
    id: 2,
    title: "Peak Load Pattern Detected",
    severity: "Medium",
    description:
      "Consistent peak load at 2PM daily. Consider load shifting strategies",
    action: "~$420/month",
    type: "pattern",
  },
  {
    id: 3,
    title: "Building C Efficiency Drop",
    severity: "High",
    description:
      "15% efficiency decrease detected. Schedule maintenance inspection",
    action: "Prevent $1,200 loss",
    type: "alert",
  },
];
