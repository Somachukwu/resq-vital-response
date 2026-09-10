import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ — Responsive Emergency Systems Intelligence" },
      {
        name: "description",
        content:
          "ResQ guides untrained bystanders through life-saving first aid while silently sharing location and hazards with a GIS dispatch command center and responder fleet.",
      },
      { property: "og:title", content: "ResQ — Responsive Emergency Systems Intelligence" },
      {
        property: "og:description",
        content:
          "One tap for help. Guided civilian first aid, a tactical dispatch command center, and a heads-up responder scene brief.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const portals = [
  {
    href: "/templates/civilian/index.html",
    title: "Civilian",
    tag: "One-tap SOS",
    body: "Guided, plain-language first aid that keeps working offline — while location, photos and hazards are shared silently with dispatch.",
    accent: "#0d6e6e",
  },
  {
    href: "/templates/dispatcher/dashboard.html",
    title: "Dispatcher",
    tag: "GIS command center",
    body: "Live incident queue ranked by severity, responder fleet tracking, hospital capability layers and one-tap unit assignment.",
    accent: "#b45309",
  },
  {
    href: "/templates/responder/scene_brief.html",
    title: "Responder",
    tag: "Heads-up scene brief",
    body: "Ultra-legible en-route briefing with massive touch targets, hazard flags and vitals capture — built for harsh sunlight.",
    accent: "#1d4ed8",
  },
];

function Index() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        color: "#e8eaf0",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8b93a5",
          marginBottom: 16,
        }}
      >
        Responsive Emergency Systems Intelligence
      </p>
      <h1
        style={{
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 700,
          textAlign: "center",
          margin: "0 0 12px",
        }}
      >
        ResQ
      </h1>
      <p
        style={{
          fontSize: 17,
          color: "#b6bccb",
          maxWidth: 560,
          textAlign: "center",
          lineHeight: 1.6,
          margin: "0 0 40px",
        }}
      >
        One tap connects a bystander, a dispatcher and a responder. Choose a
        portal to enter.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          width: "100%",
          maxWidth: 960,
        }}
      >
        {portals.map((p) => (
          <a
            key={p.href}
            href={p.href}
            style={{
              display: "block",
              background: "#171a22",
              border: "1px solid #262b38",
              borderRadius: 16,
              padding: 24,
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = p.accent;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#262b38";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: p.accent,
                marginBottom: 10,
              }}
            >
              {p.tag}
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>
              {p.title}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#9aa1b2",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {p.body}
            </p>
          </a>
        ))}
      </div>

      <p style={{ marginTop: 40, fontSize: 13, color: "#6b7280" }}>
        IEEE Response Quest Challenge 2026
      </p>
    </div>
  );
}
