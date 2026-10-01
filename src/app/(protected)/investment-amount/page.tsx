"use client";
import React, { useState } from 'react';

// ==========================================
// TYPES
// ==========================================
interface PlanFeature {
  text: string;
}

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  investmentRange: string;
  features: PlanFeature[];
  theme: {
    text: string;
    bg: string;
    border: string;
    glow: string;
    button: string;
    buttonHover: string;
    iconBg: string;
  };
  isPopular?: boolean;
}

// ==========================================
// MODAL COMPONENT (Popup)
// ==========================================
interface ActivatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  userId?: string;
}

const ActivatePlanModal: React.FC<ActivatePlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  userId = "2643158",
}) => {
  const [amount, setAmount] = useState("");

  if (!isOpen || !plan) return null;

  const getModalTheme = () => {
    if (plan.id === "trading-fund") {
      return { btn: "bg-blue-500 hover:bg-blue-600 text-white", text: "text-blue-600", iconBg: "bg-blue-100" };
    }
    if (plan.id === "legacy-1") {
      return { btn: "bg-amber-500 hover:bg-amber-600 text-white", text: "text-amber-600", iconBg: "bg-amber-100" };
    }
    return { btn: "bg-purple-500 hover:bg-purple-600 text-white", text: "text-purple-600", iconBg: "bg-purple-100" };
  };

  const modalTheme = getModalTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Container - Light mode white, Dark mode dark */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#11111a] rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-1">
              Subscribe Now
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Activate <span className={modalTheme.text}>{plan.title}</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors border border-gray-100 dark:border-white/10"
          >
            <span className="text-gray-500 dark:text-gray-400 font-bold text-lg leading-none">&times;</span>
          </button>
        </div>

        {/* Wallet Info Box */}
        <div className="flex justify-between items-center bg-[#f0fdf4] dark:bg-green-900/20 border border-green-100 dark:border-green-500/30 rounded-2xl p-5 mb-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Wallet Balance</p>
            <p className="text-green-600 dark:text-green-400 text-2xl font-bold">$0</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Investment Range</p>
            <p className="text-gray-900 dark:text-white text-lg font-semibold">{plan.investmentRange}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
              USER ID <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={userId}
              readOnly
              className="w-full bg-[#f4f6fc] dark:bg-white/5 text-gray-800 dark:text-gray-200 text-lg font-medium px-4 py-3.5 rounded-xl border-none outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">SELECTED PLAN</label>
            <div className="w-full bg-[#f8f9fc] dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 text-lg font-medium px-4 py-3.5 rounded-xl flex items-center gap-3">
              <span className={`text-xl p-1.5 rounded-md ${modalTheme.iconBg}`}>{plan.icon}</span>
              <span className={modalTheme.text}>{plan.title}</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
              INVESTMENT AMOUNT (USD) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#f4f6fc] dark:bg-white/5 text-gray-800 dark:text-white text-lg placeholder-gray-400 font-medium px-4 py-3.5 rounded-xl border border-transparent focus:border-blue-300 dark:focus:border-blue-500 outline-none transition-all"
            />
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-2 flex items-center gap-1">
              💡 Investment range: <span className="text-gray-900 dark:text-white font-bold">{plan.investmentRange}</span>
            </p>
          </div>
        </div>

        {/* Button */}
        <button className={`w-full mt-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-extrabold tracking-widest uppercase transition-all duration-300 ${modalTheme.btn}`}>
          <span className="text-xl">🚀</span>
          Activate {plan.title}
        </button>

      </div>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    {
      id: "trading-fund",
      title: "Trading Fund",
      subtitle: "Perfect for New Investors",
      icon: "🚀",
      investmentRange: "$100+",
      features: [
        { text: "ROI 8% on 90%" },
        { text: "10% for Direct Rewards" },
        { text: "10% for Binary Rewards" },
        { text: "10% for Rank Rewards" },
        { text: "Investor Limit 2.5X" },
        { text: "Leaders Limit 5X" },
      ],
      theme: {
        text: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-500/10",
        border: "border-blue-200 dark:border-blue-500/30",
        glow: "shadow-sm dark:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
        button: "bg-blue-500 text-white border-transparent dark:bg-transparent dark:border-2 dark:border-blue-500 dark:text-blue-400",
        buttonHover: "hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white",
        iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      },
    },
    {
      id: "legacy-1",
      title: "Legacy Re-Born-1",
      subtitle: "For Consistent Growth",
      icon: "📊",
      investmentRange: "$3,000+",
      isPopular: true,
      features: [
        { text: "ROI 12%" },
        { text: "Investor Limit 2.5X" },
        { text: "Leaders Limit 5X" },
      ],
      theme: {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10",
        border: "border-amber-200 dark:border-amber-500/30",
        glow: "shadow-sm dark:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
        button: "bg-amber-500 text-white border-transparent dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-500 dark:text-black font-bold",
        buttonHover: "hover:bg-amber-600 dark:hover:from-amber-400 dark:hover:to-orange-400",
        iconBg: "bg-gradient-to-br from-amber-400 to-orange-600",
      },
    },
    {
      id: "legacy-2",
      title: "Legacy Re-Born-2",
      subtitle: "Professional Trading Suite",
      icon: "💎",
      investmentRange: "$660 - 1 Quantity",
      features: [
        { text: "ROI 14%" },
        { text: "Investor Limit 2.5X" },
        { text: "Leaders Limit 5X" },
      ],
      theme: {
        text: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-500/10",
        border: "border-purple-200 dark:border-purple-500/30",
        glow: "shadow-sm dark:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        button: "bg-purple-500 text-white border-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:to-fuchsia-500 font-bold",
        buttonHover: "hover:bg-purple-600 dark:hover:from-purple-400 dark:hover:to-fuchsia-400",
        iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
      },
    },
  ];

  return (
    // Main Page Background - Light mode gray, Dark mode dark
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] flex items-center justify-center p-4 sm:p-8 font-sans relative transition-colors duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            // Card Background - Light mode white, Dark mode dark
            className={`relative flex flex-col p-8 rounded-3xl bg-white dark:bg-[#11111a] border ${plan.theme.border} ${plan.theme.glow} transition-all duration-300 hover:-translate-y-2`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                ★ Most Popular ★
              </div>
            )}

            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl ${plan.theme.iconBg} shadow-lg`}>
              {plan.icon}
            </div>

            <h2 className={`text-3xl font-bold mb-3 ${plan.theme.text}`}>
              {plan.title}
            </h2>

            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-8 ${plan.theme.bg} ${plan.theme.text} border ${plan.theme.border}`}>
              {plan.subtitle}
            </div>

            {/* Investment Box - Light mode light gray, Dark mode dark */}
            <div className="bg-gray-50 dark:bg-[#1a1a24] border border-gray-100 dark:border-white/5 rounded-2xl p-6 mb-8">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">
                Investment Range
              </p>
              <p className="text-gray-900 dark:text-white text-3xl font-bold">
                {plan.investmentRange}
              </p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${plan.theme.border} ${plan.theme.bg}`}>
                    <span className={`text-[10px] font-bold ${plan.theme.text}`}>✓</span>
                  </div>
                  {/* Feature Text - Light mode dark gray, Dark mode light gray */}
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plan)}
              className={`w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${plan.theme.button} ${plan.theme.buttonHover}`}
            >
              Activate Package
              <span className="text-lg">→</span>
            </button>
          </div>
        ))}
      </div>

      <ActivatePlanModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan}
      />
    </div>
  );
}