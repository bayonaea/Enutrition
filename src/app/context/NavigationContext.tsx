import { createContext, useState, useContext, ReactNode } from "react";
import { useLocation } from "react-router";

interface NavigationContextType {
  previousPath: string | null;
  previousLabel: string | null;
  currentPath: string;
  currentLabel: string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const pathToLabel: Record<string, string> = {
  "/": "Dashboard",
  "/data-collection": "Data Collection",
  "/data-management": "Data Management",
  "/data-warehouse": "Data Warehouse",
  "/analytics": "Analytics",
  "/public-portal": "Public Portal",
  "/users": "User Management",
  "/api": "API & Integration",
  "/training": "Training",
  "/reports": "Report Generator",
  "/announcements": "Announcements",
  "/ai-insights": "AI Insights",
  "/workflow": "Master Workflow",
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Update previous when current changes
  if (location.pathname !== currentPath) {
    setPreviousPath(currentPath);
    setCurrentPath(location.pathname);
  }

  const previousLabel = previousPath ? pathToLabel[previousPath] || "Previous Page" : null;
  const currentLabel = pathToLabel[currentPath] || "Current Page";

  return (
    <NavigationContext.Provider value={{ previousPath, previousLabel, currentPath, currentLabel }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
