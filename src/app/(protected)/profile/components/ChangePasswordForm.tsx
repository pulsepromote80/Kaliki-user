"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { FaLock, FaKey, FaPaperPlane } from "react-icons/fa";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPass: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    otp: z.string().min(1, "OTP is required"),
  })
  .refine((data) => data.newPass === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const methods = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPass: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const { formState: { isSubmitting } } = methods;
  const { setValue } = methods;

  const handleSendOtp = async () => {
    try {
      setSendingOtp(true);
      const response = await fetch("/api/auth/send-otp-change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const result = await response.json();

      if (result.success) {
        setOtpSent(true);
        toast.success(result.message || "OTP sent to your email");
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPass: data.newPass,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Password changed successfully");
        setOtpSent(false);
        setValue("otp", "");
        setValue("oldPassword", "");
        setValue("newPass", "");
        setValue("confirmPassword", "");
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaLock className="w-4 h-4 text-blue-400" />
            Current Password <span className="text-red-500">*</span>
          </label>
          <FormInput
            name="oldPassword"
            type="password"
            placeholder="Enter your current password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaKey className="w-4 h-4 text-emerald-400" />
            New Password <span className="text-red-500">*</span>
          </label>
          <FormInput
            name="newPass"
            type="password"
            placeholder="Enter your new password (min 8 characters)"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaKey className="w-4 h-4 text-emerald-400" />
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
          />
        </div>

        {/* OTP Section */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaPaperPlane className="w-4 h-4 text-purple-400" />
            Enter OTP <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <FormInput
                name="otp"
                type="text"
                placeholder="Enter OTP sent to your email"
              />
            </div>
            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp || otpSent}
              className="w-full sm:w-auto px-4 py-2.5 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {sendingOtp ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !otpSent}
          className="w-full"
        >
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </FormProvider>
  );
}
