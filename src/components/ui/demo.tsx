import FloatingActionMenu from "@/components/ui/floating-action-menu"
import { Settings, User, LogOut } from "lucide-react";

export const FloatingActionMenuDemo = ({ onLogout }: { onLogout?: () => void }) => {
    return (
          <FloatingActionMenu
          className="relative z-50"
          options={[
            {
              label: "Account",
              Icon: <User className="w-4 h-4 text-white" />,
              onClick: () => console.log("Account clicked"),
            },
            {
              label: "Settings",
              Icon: <Settings className="w-4 h-4 text-white" />,
              onClick: () => console.log("Settings clicked"),
            },
            {
              label: "Logout",
              Icon: <LogOut className="w-4 h-4 text-white" />,
              onClick: onLogout || (() => console.log("Logout clicked")),
            },
          ]}
        />
    )
}
