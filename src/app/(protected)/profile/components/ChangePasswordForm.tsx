"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const methods = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { formState: { isSubmitting } } = methods;

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      // TODO: Implement API call to change password
      console.log("Changing password:", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-2xl">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter your current password"
          />

          <FormInput
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
          />

          <FormInput
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
