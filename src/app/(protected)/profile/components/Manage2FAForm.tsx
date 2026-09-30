"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";

export function Manage2FAForm() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle2FA = async () => {
    setIsToggling(true);
    try {
      // TODO: Implement API call to toggle 2FA
      console.log("Toggling 2FA:", !isEnabled);
      
      setIsEnabled(!isEnabled);
      toast.success(
        isEnabled ? "2FA disabled successfully" : "2FA enabled successfully"
      );
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      toast.error("Failed to toggle 2FA");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add an extra layer of security to your account by enabling 2FA.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">2FA Status</p>
              <p className="text-sm text-muted-foreground">
                {isEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <Button
              onClick={handleToggle2FA}
              disabled={isToggling}
              variant={isEnabled ? "outline" : "primary"}
            >
              {isToggling
                ? "Processing..."
                : isEnabled
                ? "Disable 2FA"
                : "Enable 2FA"}
            </Button>
          </div>

          {isEnabled && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> Make sure to save your backup codes in a
                secure location. You'll need them if you lose access to your 2FA
                device.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
