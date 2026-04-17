import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DataCollection } from "./pages/DataCollection";
import { DataManagement } from "./pages/DataManagement";
import { Analytics } from "./pages/Analytics";
import { PublicPortal } from "./pages/PublicPortal";
import { UserManagement } from "./pages/UserManagement";
import { ApiIntegration } from "./pages/ApiIntegration";
import { Training } from "./pages/Training";
import { ReportGenerator } from "./pages/ReportGenerator";
import { Announcements } from "./pages/Announcements";
import { AIInsights } from "./pages/AIInsights";
import { DataWarehouse } from "./pages/DataWarehouse";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "data-collection", Component: DataCollection },
      { path: "data-management", Component: DataManagement },
      { path: "data-warehouse", Component: DataWarehouse },
      { path: "analytics", Component: Analytics },
      { path: "public-portal", Component: PublicPortal },
      { path: "users", Component: UserManagement },
      { path: "api", Component: ApiIntegration },
      { path: "training", Component: Training },
      { path: "reports", Component: ReportGenerator },
      { path: "announcements", Component: Announcements },
      { path: "ai-insights", Component: AIInsights },
    ],
  },
]);
