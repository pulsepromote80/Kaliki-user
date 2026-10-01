
"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useCommunityStore } from "@/store/community.store";
import { communityService } from "@/services/community.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function DirectPartners() {
  const { user } = useAuthStore();

  const {
    directMemberData,
    loading,
    error,
    setDirectMemberData,
    setLoading,
    setError,
  } = useCommunityStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Member");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchDirectMembers = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const data = {
          urid: user.id,
          statusId: "",
          loginid: "",
        };

        const response = await communityService.getDirectMember(data);

        if (response.data) {
          setDirectMemberData(response.data);
        }
      } catch (error) {
        console.error("Error fetching direct members:", error);

        setError("Failed to fetch direct members");

        toast.error("Failed to fetch direct members");
      } finally {
        setLoading(false);
      }
    };

    fetchDirectMembers();
  }, [user?.id, setLoading, setError, setDirectMemberData]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredMembers =
    directMemberData?.filter((member) => {
      // Filter by selected category
      if (
        [
          "Customer",
          "AI License Holder",
          "AI Capacity Owner",
          "AI Deployment Partner",
        ].includes(selectedStatus) &&
        member.topupStatus !== selectedStatus
      ) {
        return false;
      }

      if (
        selectedStatus === "Left Team" &&
        member.position !== "L"
      ) {
        return false;
      }

      if (
        selectedStatus === "Right Team" &&
        member.position !== "R"
      ) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase();

        return (
          member.name?.toLowerCase().includes(search) ||
          member.loginid?.toLowerCase().includes(search) ||
          member.mobile?.toLowerCase().includes(search) ||
          member.email?.toLowerCase().includes(search)
        );
      }

      return true;
    }) || [];

  const totalPages = Math.ceil(
    filteredMembers.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentMembers = filteredMembers.slice(
    startIndex,
    endIndex
  );

  const handlePrevious = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col justify-start gap-6 pt-4 pb-6 font-[family-name:var(--font-geist-sans)] sm:gap-10 sm:pt-5 md:px-0">
        <section className="w-full">
          <div className="relative overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl gradient-border glass-effect shadow-xl">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-3 pl-3 pr-3 text-base font-bold text-white sm:pl-5 sm:pr-5 affiliate-card-header affiliate-card-text rounded-t-xl">
              <span className="mb-2 text-base font-bold text-white sm:text-lg sm:mb-0">
                My Direct Network
              </span>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search Box */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-40 px-3 py-2 text-xs text-gray-900 bg-white border-2 border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 rounded-xl sm:w-56 sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />

                {/* Status Dropdown */}
                <div
                  className="relative"
                  ref={dropdownRef}
                >
                  <div
                    className="relative flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 border-2 border-blue-200 dark:border-gray-600 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg min-w-[120px] sm:min-w-[140px]"
                    onClick={toggleDropdown}
                  >
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        selectedStatus === "Member"
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {selectedStatus === "Member"
                        ? "Team Status"
                        : selectedStatus}
                    </span>

                    <svg
                      className={`ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 text-blue-500 dark:text-blue-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isOpen && (
                    <div
                      className="absolute right-0 z-10 h-[150px] max-w-xs min-w-full mt-1 bg-white border-2 border-blue-200 shadow-lg w-max rounded-xl"
                      style={{ overflow: "auto" }}
                    >
                      {[
                        "Customer",
                        "AI License Holder",
                        "AI Capacity Owner",
                        "AI Deployment Partner",
                        "Left Team",
                        "Right Team",
                      ].map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 text-xs font-medium text-blue-700 border-b border-gray-100 cursor-pointer sm:text-sm whitespace-nowrap hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 last:border-b-0"
                          onClick={() =>
                            handleStatusChange(option)
                          }
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
                Found {filteredMembers.length} result(s) for "
                {searchTerm}"
                <button
                  onClick={clearSearch}
                  className="ml-2 font-medium text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Table Container */}
            <div className="overflow-x-auto">
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>

                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    Loading team data...
                  </span>
                </div>
              )}

              {error && (
                <div className="p-4 text-center text-red-600 dark:text-red-400">
                  Error: {error}
                </div>
              )}

              {!loading && !error && (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Sr No
                          </th>

                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Status
                          </th>

                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Name
                          </th>

                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Login ID
                          </th>

                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Reg. Date
                          </th>

                          <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300">
                            Position
                          </th>

                          <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap lg:table-cell">
                            License Amount
                          </th>

                          <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300 lg:table-cell">
                            Deploy Amount
                          </th>

                          <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300 md:table-cell">
                            Deploy Date
                          </th>

                          <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300 lg:table-cell">
                            Left Business
                          </th>

                          <th className="hidden px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase whitespace-nowrap dark:text-gray-300 lg:table-cell">
                            Right Business
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800/50 dark:divide-gray-700">
                        {currentMembers.length > 0 ? (
                          currentMembers.map(
                            (member, index) => (
                              <tr
                                key={
                                  member.Urid || index
                                }
                                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              >
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap dark:text-gray-100">
                                  {startIndex +
                                    index +
                                    1}
                                </td>

                                <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                                  <div className="inline-block px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 rounded-full dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50">
                                    {member.topupStatus ||
                                      ""}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 rounded-full border border-emerald-200 dark:border-emerald-700/50">
                                    {member.name || ""}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 rounded-full border border-red-200 dark:border-red-700/50">
                                    {member.loginid || ""}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40 rounded-full border border-yellow-200 dark:border-yellow-700/50">
                                    {member.regDate || ""}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded-full border border-purple-200 dark:border-purple-700/50">
                                    {member.position || ""}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/40 rounded-full border border-pink-200 dark:border-pink-700/50">
                                    $
                                    {member.subscriptionAmount ||
                                      "0"}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/40 rounded-full border border-orange-200 dark:border-orange-700/50">
                                    $
                                    {member.leaseAmount ||
                                      "0"}
                                  </div>
                                </td>

                                <td className="hidden px-4 py-3 text-sm whitespace-nowrap md:table-cell">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-600">
                                    {member.topupDate ||
                                      "null"}
                                  </div>
                                </td>

                                <td className="hidden px-4 py-3 text-sm whitespace-nowrap lg:table-cell">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 rounded-full border border-red-200 dark:border-red-700/50">
                                    $
                                    {member.binaryLBuss ||
                                      "0"}
                                  </div>
                                </td>

                                <td className="hidden px-4 py-3 text-sm whitespace-nowrap lg:table-cell">
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 rounded-full border border-green-200 dark:border-green-700/50">
                                    $
                                    {member.binaryRBuss ||
                                      "0"}
                                  </div>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan={11}
                              className="px-4 py-8 text-center text-gray-600 dark:text-gray-400"
                            >
                              {searchTerm
                                ? `No results found for "${searchTerm}"`
                                : `No team members found for ${selectedStatus} status`}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {filteredMembers.length > 0 && (
                    <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 sm:flex-row dark:border-gray-700">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(
                          endIndex,
                          filteredMembers.length
                        )}{" "}
                        of {filteredMembers.length} members
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrevious}
                          disabled={currentPage === 1}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </button>

                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {currentPage} /{" "}
                          {totalPages}
                        </span>

                        <button
                          onClick={handleNext}
                          disabled={
                            currentPage === totalPages
                          }
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
