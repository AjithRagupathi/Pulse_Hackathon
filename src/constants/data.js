export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export const HERO_STATS = [
  { target: 8, suffix: "+", label: "Core Modules", color: "var(--blue)" },
  { target: 100, suffix: "%", label: "End-to-End", color: "var(--teal)" },
  { target: 342, suffix: "+", label: "Active Members", color: "var(--teal)" },
  { target: 60, suffix: "%", label: "Admin Time Saved", color: "var(--blue)" },
];

export const FEATURES = [
  {
    icon: "👤",
    color: "rgba(45,127,249,0.15)",
    title: "Member Management",
    desc: "Digital onboarding, plan assignments, health forms, and multi-location support — all in one place.",
  },
  {
    icon: "🚪",
    color: "rgba(0,212,170,0.12)",
    title: "Attendance & Access",
    desc: "QR code and biometric check-ins with real-time dashboards, alerts, and hardware integrations.",
  },
  {
    icon: "📅",
    color: "rgba(99,102,241,0.15)",
    title: "Scheduling & Classes",
    desc: "Drag-and-drop timetable builder, trainer conflict detection, waitlists, and recurring templates.",
  },
  {
    icon: "💳",
    color: "rgba(245,158,11,0.12)",
    title: "Payments & Billing",
    desc: "Razorpay / Stripe support, GST-compliant invoices, and automated WhatsApp/SMS reminders.",
  },
  {
    icon: "🏋️",
    color: "rgba(239,68,68,0.12)",
    title: "Trainer & Staff",
    desc: "Role-based permissions, commission tracking, shift scheduling, and leave management.",
  },
  {
    icon: "📊",
    color: "rgba(45,127,249,0.15)",
    title: "Analytics & Reporting",
    desc: "Revenue trends, class occupancy rates, member LTV, and cohort retention dashboards.",
  },
  {
    icon: "📣",
    color: "rgba(0,212,170,0.12)",
    title: "Communication & Marketing",
    desc: "Bulk campaigns, birthday flows, win-back sequences, and lead management for prospects.",
  },
  {
    icon: "📦",
    color: "rgba(245,158,11,0.12)",
    title: "Inventory & Equipment",
    desc: "Supplement POS, merchandise tracking, low-stock alerts, and maintenance schedules.",
  },
];

export const SHOWCASE_BARS = [
  { label: "Mon", value: 78 },
  { label: "Tue", value: 92 },
  { label: "Wed", value: 65 },
  { label: "Thu", value: 88 },
  { label: "Fri", value: 95 },
  { label: "Sat", value: 100 },
  { label: "Sun", value: 55 },
];

export const SHOWCASE_HIGHLIGHTS = [
  {
    icon: "⚡",
    title: "Instant Visibility",
    desc: "See today's check-ins, revenue, and alerts the moment you open the dashboard.",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "PULSE flags at-risk members, overdue payments, and equipment issues before they become problems.",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Full access from your phone. Run your gym from anywhere — floor, office, or home.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "PULSE replaced three separate tools for us. Attendance, billing, and member comms — all in one dashboard. Our front desk team saved 2 hours a day.",
    name: "Rajesh Kumar",
    role: "Owner, IronEdge Fitness, Chennai",
    initials: "RK",
    color: "#2D7FF9",
  },
  {
    quote:
      "The WhatsApp automation alone brought back 40 dormant members in the first month. The ROI was immediate and obvious.",
    name: "Priya Nair",
    role: "Director, FlexZone Studios, Chennai",
    initials: "PN",
    color: "#00D4AA",
  },
  {
    quote:
      "As a chain with 3 locations, multi-location membership was a game changer. Members can walk into any branch and check in seamlessly.",
    name: "Arun Selvam",
    role: "MD, PeakFit Chain, Tamil Nadu",
    initials: "AS",
    color: "#6366F1",
  },
];

export const PRICING_PLANS = [
  {
    tier: "Starter",
    price: "₹2,999",
    period: "/mo",
    desc: "Perfect for independent gyms getting started.",
    featured: false,
    features: [
      "Up to 150 members",
      "Member & attendance modules",
      "Payments & billing",
      "WhatsApp reminders",
      "Email support",
    ],
  },
  {
    tier: "Growth",
    price: "₹5,999",
    period: "/mo",
    desc: "For growing gyms that need the full picture.",
    featured: true,
    features: [
      "Up to 500 members",
      "All 8 core modules",
      "Analytics & reporting",
      "Staff management",
      "Priority support + onboarding",
    ],
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For multi-location chains and large studios.",
    featured: false,
    features: [
      "Unlimited members",
      "Multi-location support",
      "Custom integrations",
      "Dedicated account manager",
      "SLA-backed support",
    ],
  },
];

export const DEMO_TABS = [
  {
    label: "Member Check-in",
    title: "Real-Time Member Tracking",
    desc: "Watch your front desk transform. Members scan in via QR or biometric — staff see live attendance instantly, with late alerts and no-show flags handled automatically.",
    points: [
      "Biometric & QR dual check-in",
      "Live front desk dashboard",
      "Automated no-show alerts",
      "Hardware turnstile integration",
    ],
    rows: [
      {
        icon: "👤",
        name: "Ananya Krishnan",
        meta: "Platinum · 3 visits this week",
        status: "Checked In",
        statusBg: "rgba(0,212,170,0.15)",
        statusColor: "#00D4AA",
        iconBg: "rgba(45,127,249,0.15)",
      },
      {
        icon: "👤",
        name: "Siddharth Rao",
        meta: "Gold · Last visit 3 days ago",
        status: "Due Today",
        statusBg: "rgba(245,158,11,0.15)",
        statusColor: "#F59E0B",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "👤",
        name: "Meera Suresh",
        meta: "Silver · Renewal in 5 days",
        status: "Active",
        statusBg: "rgba(45,127,249,0.15)",
        statusColor: "#2D7FF9",
        iconBg: "rgba(99,102,241,0.15)",
      },
    ],
  },
  {
    label: "Class Scheduling",
    title: "Drag-and-Drop Timetable",
    desc: "Build your weekly programme in minutes. Set trainer availability, capacity limits, booking windows, and let PULSE handle waitlists and conflict detection automatically.",
    points: [
      "Visual drag-and-drop builder",
      "Trainer conflict detection",
      "Capacity & waitlist management",
      "Recurring weekly templates",
    ],
    rows: [
      {
        icon: "🏃",
        name: "Morning HIIT — 7:00 AM",
        meta: "Trainer: Coach Deepak · 18/20 booked",
        status: "Full",
        statusBg: "rgba(239,68,68,0.15)",
        statusColor: "#EF4444",
        iconBg: "rgba(239,68,68,0.12)",
      },
      {
        icon: "🧘",
        name: "Yoga Flow — 9:00 AM",
        meta: "Trainer: Preethi · 10/15 booked",
        status: "Open",
        statusBg: "rgba(0,212,170,0.15)",
        statusColor: "#00D4AA",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "💪",
        name: "Strength Circuit — 6:00 PM",
        meta: "Trainer: Coach Arjun · 14/20 booked",
        status: "Open",
        statusBg: "rgba(0,212,170,0.15)",
        statusColor: "#00D4AA",
        iconBg: "rgba(45,127,249,0.15)",
      },
    ],
  },
  {
    label: "Revenue Analytics",
    title: "Business Intelligence Dashboard",
    desc: "Know your numbers at a glance. Track revenue trends, membership growth, churn, class occupancy, and member LTV — all updated in real time.",
    points: [
      "Revenue trends & forecasting",
      "Churn analysis & cohorts",
      "Class occupancy heatmaps",
      "Member lifetime value (LTV)",
    ],
    rows: [
      {
        icon: "📈",
        name: "Monthly Revenue",
        meta: "₹4,82,000 · ↑ 12% vs last month",
        status: "Growing",
        statusBg: "rgba(0,212,170,0.15)",
        statusColor: "#00D4AA",
        iconBg: "rgba(0,212,170,0.12)",
      },
      {
        icon: "👥",
        name: "Active Members",
        meta: "342 members · 8 new this week",
        status: "+8 New",
        statusBg: "rgba(45,127,249,0.15)",
        statusColor: "#2D7FF9",
        iconBg: "rgba(45,127,249,0.15)",
      },
      {
        icon: "⚠️",
        name: "Churn Risk",
        meta: "14 members inactive 14+ days",
        status: "Alert",
        statusBg: "rgba(245,158,11,0.15)",
        statusColor: "#F59E0B",
        iconBg: "rgba(245,158,11,0.12)",
      },
    ],
  },
];

export const FAQS = [
  {
    q: "How quickly can we go live on PULSE?",
    a: "Most gyms are fully onboarded within 3–5 business days. Our team handles data migration, hardware setup, and staff training as part of the onboarding package.",
  },
  {
    q: "Does PULSE work for multi-location gym chains?",
    a: "Yes. PULSE natively supports multi-location membership, meaning members can access any branch under your chain, with unified billing and reporting across all locations.",
  },
  {
    q: "Which payment gateways are supported?",
    a: "PULSE integrates with Razorpay and Stripe out of the box. Both support UPI, credit/debit cards, net banking, and EMI options relevant to the Indian market.",
  },
  {
    q: "Is PULSE compliant with GST requirements?",
    a: "Absolutely. PULSE generates GST-compliant invoices automatically and provides tax summary reports ready for your accountant or CA.",
  },
  {
    q: "Can we import our existing member data?",
    a: "Yes. We support CSV imports and provide a dedicated onboarding specialist to ensure your member database, plans, and payment history migrate cleanly.",
  },
  {
    q: "What hardware does PULSE support for access control?",
    a: "PULSE integrates with QR code scanners, biometric readers (fingerprint and face recognition), and standard turnstile/door access controllers.",
  },
];

export const PARTNERS = [
  { name: "Razorpay", icon: "💳" },
  { name: "Stripe", icon: "⚡" },
  { name: "WhatsApp Business", icon: "💬" },
  { name: "Twilio SMS", icon: "📱" },
  { name: "Google Calendar", icon: "📅" },
  { name: "Tally / Zoho", icon: "🧾" },
];

export const BLOG_POSTS = [
  {
    tag: "Operations",
    title: "How Chennai Gyms Are Cutting Admin Time by 60% with Smart Software",
    date: "Mar 2026",
    bg: "linear-gradient(135deg, rgba(45,127,249,0.2), rgba(0,212,170,0.1))",
    emoji: "⚙️",
  },
  {
    tag: "Revenue",
    title:
      "The WhatsApp Win-Back Strategy That Recovered ₹1.2L in Dormant Revenue",
    date: "Feb 2026",
    bg: "linear-gradient(135deg, rgba(0,212,170,0.2), rgba(45,127,249,0.1))",
    emoji: "💬",
  },
  {
    tag: "Growth",
    title:
      "5 Metrics Every Gym Owner Should Review Weekly (and How PULSE Makes It Easy)",
    date: "Jan 2026",
    bg: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(45,127,249,0.1))",
    emoji: "📊",
  },
];
