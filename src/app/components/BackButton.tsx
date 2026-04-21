import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

export function BackButton() {
  const navigate = useNavigate();
  const { previousLabel } = useNavigation();

  if (!previousLabel) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1.5 font-medium transition-colors mb-4 hover:opacity-80"
      style={{ color: "#1E3A8A" }}
    >
      <ChevronLeft size={18} />
      Back to {previousLabel}
    </button>
  );
}
