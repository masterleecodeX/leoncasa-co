import FloatingActionMenu from "@/components/ui/floating-action-menu"
import { Settings, User, LogOut, Shield } from "lucide-react";

export const FloatingActionMenuDemo = ({ onLogout, userPhotoUrl, isAdmin, onAdmin }: { onLogout?: () => void, userPhotoUrl?: string | null, isAdmin?: boolean, onAdmin?: () => void }) => {
    return (
          <FloatingActionMenu
          className="relative z-50"
          userPhotoUrl={userPhotoUrl}
          options={[
            ...(isAdmin ? [{
              label: "Admin",
              Icon: <Shield className="w-4 h-4 text-white" />,
              onClick: onAdmin || (() => console.log("Admin clicked")),
            }] : []),
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
