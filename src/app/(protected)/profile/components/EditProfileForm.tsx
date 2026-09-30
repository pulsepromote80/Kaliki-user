"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaWallet, FaSave, FaUserCircle } from "react-icons/fa";

const editProfileSchema = z.object({
  fName: z.string().min(1, "First name is required"),
  lName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(7, "Mobile number must be at least 7 digits").max(13, "Mobile number must be at most 13 digits"),
  countryid: z.string().min(1, "Country is required"),
  address: z.string().optional(),
  walletBep20: z.string().optional(),
});

type EditProfileValues = z.infer<typeof editProfileSchema>;

export function EditProfileForm() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const methods = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fName: user?.name?.split(" ")[0] || "",
      lName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      mobile: "",
      countryid: "",
      address: "",
      walletBep20: "",
    },
  });

  const { formState: { isSubmitting } } = methods;
  const { watch } = methods;
  const walletBep20 = watch("walletBep20");

  const isValidBep20Length = (value: string) => {
    if (!value) return true;
    return value.length >= 38 && value.length <= 44;
  };

  const onSubmit = async (data: EditProfileValues) => {
    try {
      // Update local store temporarily
      if (user) {
        setUser({ 
          ...user, 
          name: `${data.fName} ${data.lName}`, 
          email: data.email 
        });
      }
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            {/* Personal Information Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-500">
                <FaUserCircle className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaUser className="w-4 h-4 text-blue-400" />
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <FormInput
                    name="fName"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaUser className="w-4 h-4 text-blue-400" />
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <FormInput
                    name="lName"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-emerald-500">
                <FaEnvelope className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Contact Information
                </h3>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaEnvelope className="w-4 h-4 text-emerald-400" />
                  Email
                </label>
                <FormInput
                  name="email"
                  type="email"
                  readOnly
                  disabled
                />
              </div>

              <div className="grid grid-cols-12 gap-3 mt-4">
                <div className="col-span-3">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaGlobe className="w-4 h-4 text-emerald-400" />
                    Code
                  </label>
                  <input
                    type="text"
                    value="+91"
                    readOnly
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="col-span-9">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaPhone className="w-4 h-4 text-emerald-400" />
                    Mobile
                  </label>
                  <FormInput
                    name="mobile"
                    type="tel"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-indigo-500">
                <FaGlobe className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Location
                </h3>
              </div>

              <div className="relative w-full">
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaGlobe className="w-4 h-4 text-indigo-400" />
                  Country <span className="text-red-500">*</span>
                </label>
                <FormInput
                  name="countryid"
                  placeholder="Select Country"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaMapMarkerAlt className="w-4 h-4 text-indigo-400" />
                  Address
                </label>
                <FormInput
                  name="address"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Wallet Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-amber-500">
                <FaWallet className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Wallet Information
                </h3>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaWallet className="w-4 h-4 text-amber-400" />
                  Wallet Address (BEP20)
                </label>
                <FormInput
                  name="walletBep20"
                  placeholder="Enter BEP20 wallet address"
                  maxLength={44}
                />
                {walletBep20 && !isValidBep20Length(walletBep20) && (
                  <p className="mt-1 text-xs text-red-500">
                    Please Enter a Valid BEP20 USDT Wallet Address (38-44 characters)
                  </p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <FaSave className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}