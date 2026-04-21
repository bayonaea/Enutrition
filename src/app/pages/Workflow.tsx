import { CheckCircle2, Circle, FileStack, Lock, ShieldCheck, Workflow as WorkflowIcon } from "lucide-react";

const moduleWorkflows = [
  {
    module: "1. Data Collection Module",
    goal: "Capture accurate nutrition survey data from field researchers.",
    steps: [
      "Survey setup: project, survey type, region and enumerator assignment",
      "Dynamic form configuration with validation, required fields, and conditional logic",
      "Field data capture in mobile app: personal data, measurements, intake, photos, GPS",
      "Offline-first local storage when disconnected",
      "Auto or manual sync with duplicate and conflict handling",
      "Submission lock and lifecycle progression",
    ],
    capabilities: ["Offline-first app", "Dynamic form builder", "Geo-tagging", "Media upload", "Sync engine", "Validation engine"],
  },
  {
    module: "2. Data Management Module",
    goal: "Clean, validate, and organize collected data.",
    steps: [
      "Ingest raw submissions into staging",
      "Run validation checks for missing values and outliers",
      "Review flagged records and approve, edit, or reject",
      "Normalize into household, individual, health, and dietary structures",
      "Version datasets from raw to cleaned to published",
      "Apply analyst, reviewer, and final approver flow",
    ],
    capabilities: ["Validation engine", "Cleaning interface", "Audit logs", "Version control", "Approval workflow"],
  },
  {
    module: "3. Data Warehouse Module",
    goal: "Store and organize all historical nutrition datasets.",
    steps: [
      "Persist structured datasets",
      "Tag metadata by year, region, survey type, and population group",
      "Index for search and filtering",
      "Archive old datasets using retention policy",
    ],
    capabilities: ["Structured storage", "Metadata system", "Indexing engine", "Partitioning", "Backup system"],
  },
  {
    module: "4. Analytics Dashboard Module",
    goal: "Turn raw data into insights.",
    steps: [
      "Select year, region, and indicator",
      "Compute averages, percentages, and trends",
      "Visualize through charts, heatmaps, and tables",
      "Drill down from region to detailed segments",
      "Export as PNG, PDF, or CSV",
    ],
    capabilities: ["Chart engine", "Filter system", "KPI builder", "Drill-down analytics", "Export tools"],
  },
  {
    module: "5. Public Data Portal",
    goal: "Allow users to explore and download approved public datasets.",
    steps: [
      "Browse surveys, reports, and datasets",
      "Filter by year, category, and region",
      "Preview data and metadata",
      "Download public use files and reports",
      "Track usage and downloads",
    ],
    capabilities: ["Search engine", "Dataset preview", "Download manager", "File storage"],
  },
  {
    module: "6. User Management Module",
    goal: "Control access and permissions.",
    steps: [
      "Register users (manual or self-signup)",
      "Assign roles: Admin, Researcher, LGU, Public",
      "Authenticate users and support password reset",
      "Authorize role-based access to protected features",
      "Track login and data access activity",
    ],
    capabilities: ["RBAC", "Authentication", "Activity logs", "Permissions engine"],
  },
  {
    module: "7. API and Integration Module",
    goal: "Connect E-Nutrition with external platforms.",
    steps: [
      "Receive external API requests",
      "Validate key or token",
      "Retrieve requested dataset",
      "Deliver JSON or CSV response",
      "Log API activity and consumption",
    ],
    capabilities: ["REST API", "API authentication", "Rate limiting", "Export endpoints"],
  },
  {
    module: "8. Training and Certification Module",
    goal: "Train researchers and users.",
    steps: [
      "Create courses with videos and documents",
      "Enroll participants",
      "Track lesson progress and quiz completion",
      "Run assessments",
      "Issue certificates for passers",
    ],
    capabilities: ["LMS", "Quiz engine", "Progress tracking", "Certificate generator"],
  },
  {
    module: "9. Report Generator Module",
    goal: "Automate report creation.",
    steps: [
      "Select source dataset and filters",
      "Compile charts, tables, and narrative insights",
      "Customize structure and branding",
      "Export PDF or Excel",
    ],
    capabilities: ["Report builder", "Template system", "Export engine"],
  },
  {
    module: "10. CMS and Announcement Module",
    goal: "Manage website content.",
    steps: [
      "Create news and announcement content",
      "Edit and format media-rich content",
      "Publish instantly or schedule",
      "Archive old posts",
    ],
    capabilities: ["Content editor", "Media manager", "Publishing system"],
  },
];

const masterFlow = [
  "Data Collection",
  "Data Management",
  "Data Warehouse",
  "Analytics Dashboard <-> Report Generator",
  "Public Portal",
  "Users / LGU / Researchers",
];

const supportingModules = ["User Management", "API Integration", "Training Module", "CMS"];

const lifecycleStates = [
  "Draft",
  "Submitted",
  "Validated",
  "Cleaned",
  "Approved",
  "Published",
  "Archived",
];

const governanceChecklist = [
  "Consent and privacy controls for PII",
  "Dataset quality score by module and release",
  "Reference dictionaries with versioning",
  "SLA and escalation per workflow stage",
  "Immutable audit logs and privileged access controls",
  "API schema versioning and pagination standards",
  "Monitoring for sync failures, retries, and backups",
  "Publication policy and release checklist",
];

export function Workflow() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-start justify-between gap-3 flex-col sm:flex-row">
        <div>
          <h1 className="text-gray-900 text-xl font-bold flex items-center gap-2">
            <WorkflowIcon size={20} style={{ color: "#1E3A8A" }} />
            Master Workflow
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Operational blueprint for end-to-end E-Nutrition execution</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "#eff6ff", color: "#1e40af" }}>
          Last aligned: Apr 17, 2026
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Final System Flow</h2>
        <div className="flex flex-wrap items-center gap-2">
          {masterFlow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#334155" }}>
                {step}
              </span>
              {index < masterFlow.length - 1 && <span className="text-gray-400">{">"}</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Supporting services: {supportingModules.join(" • ")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <FileStack size={14} className="text-indigo-600" />
            Unified Data Lifecycle
          </h2>
          <div className="space-y-2">
            {lifecycleStates.map((state, index) => (
              <div key={state} className="flex items-center gap-2 text-sm">
                {index < 5 ? <CheckCircle2 size={14} className="text-green-600" /> : <Circle size={14} className="text-gray-300" />}
                <span className="text-gray-700">{state}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Locking rule: once a record reaches Submitted, edits must be tracked; final approved submissions are immutable.
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            Governance and Readiness
          </h2>
          <div className="space-y-2">
            {governanceChecklist.map((item) => (
              <div key={item} className="text-sm text-gray-700 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {moduleWorkflows.map((entry) => (
          <section key={entry.module} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-sm font-semibold text-gray-900">{entry.module}</h2>
              <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "#f1f5f9", color: "#334155" }}>
                Goal: {entry.goal}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Workflow</h3>
                <ul className="space-y-1.5">
                  {entry.steps.map((step) => (
                    <li key={step} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Core Functionalities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {entry.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "#eef2ff", color: "#4338ca" }}
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-4" style={{ background: "#fffbeb" }}>
        <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
          <Lock size={14} />
          Workflow Control Rule
        </div>
        <p className="text-sm text-amber-700 mt-1">
          Every module action must preserve traceability: who performed it, when it happened, what changed, and which dataset version was affected.
        </p>
      </div>
    </div>
  );
}
