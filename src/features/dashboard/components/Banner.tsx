// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { RiExternalLinkLine } from "react-icons/ri";
// import {
//   RiSearchLine,
//   RiArrowRightSLine,
//   RiFlashlightLine,
//   RiUserStarLine,
//   RiCoinsLine,
//   RiBarChartBoxLine,
//   RiRocketLine,
//   RiShieldCheckLine,
//   RiMoreFill,
// } from "react-icons/ri";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// interface RouteMap {
//   [key: string]: string;
// }

// interface Stat {
//   label: string;
//   value: string | number;
//   subValue?: string | number;
//   subLabel?: string;
//   icon?: React.ReactNode;
//   illustration?: string;
//   gradient: string;
//   accentColor: string;
//   iconBg: string;
//   isRedirect?: boolean;
//   redirectPath?: string;
// }

// interface DashboardData {
//   data: Array<{
//     MyAgent?: number;
//     PerformanceWallet?: number;
//     YieldWallet?: number;
//     DepositWallet?: number;
//     TotalTeam?: number;
//     LegacyWallet?: number;
//     PreviousAgent?: number;
//     ActiveTeam?: number;
//     YieldWithdrawal?: number;
//     PerformanceWithdrawal?: number;
//   }>;
// }

// interface AuthState {
//   auth: {
//     getUserDashboardData: DashboardData;
//   };
// }

// // Mock route map function - replace with actual implementation
// function createRouteMapFromSeed(seed: string, count: number): RouteMap {
//   return {
//     "/buy-agent-license": "/buy-agent-license",
//     "/deploy-agents": "/deploy-agents",
//   };
// }

// export function Banner() {
//   const router = useRouter();
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Mock state - replace with actual Redux implementation
//   const [getUserDashboardData, setGetUserDashboardData] = useState<DashboardData>({
//     data: [
//       {
//         MyAgent: 0,
//         PerformanceWallet: 0,
//         YieldWallet: 0,
//         DepositWallet: 0,
//         TotalTeam: 0,
//         LegacyWallet: 0,
//         PreviousAgent: 0,
//         ActiveTeam: 0,
//         YieldWithdrawal: 0,
//         PerformanceWithdrawal: 0,
//       },
//     ],
//   });

//   // Get route map for random slugs with reactive state
//   const [routeMap, setRouteMap] = useState<RouteMap>({});

//   useEffect(() => {
//     const updateRouteMap = () => {
//       const seed = Cookies.get("routeSlugsSeed");
//       if (seed) {
//         setRouteMap(createRouteMapFromSeed(seed, 6));
//       } else {
//         setRouteMap({});
//       }
//     };

//     updateRouteMap();

//     // Listen for cookie changes
//     const interval = setInterval(updateRouteMap, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const activeAgent = getUserDashboardData?.data[0]?.MyAgent;
//   const performanceWallet = getUserDashboardData?.data[0]?.PerformanceWallet;
//   const yieldWallet = getUserDashboardData?.data[0]?.YieldWallet;
//   const depositWallet = getUserDashboardData?.data[0]?.DepositWallet;
//   const totalTeam = getUserDashboardData?.data[0]?.TotalTeam;
//   const legacyWallet = getUserDashboardData?.data[0]?.LegacyWallet;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId: number;
//     let t = 0;
//     let rotY = 0;
//     let rotX = 0.25;

//     function resize() {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     }
//     resize();

//     const W = () => canvas.width;
//     const H = () => canvas.height;

//     // FIX: Mobile/Phone screen layout me strictly absolute horizontal center axis
//     const cx = () => {
//       if (typeof window !== "undefined" && window.innerWidth < 1024) {
//         return W() * 0.5;
//       }
//       return W() * 0.78;
//     };

//     // FIX: Mobile screens par badges block area top se 235px tak locked h.
//     // Isliye 235px ka exact half matrix height update kiya h taaki center me rhe.
//     const cy = () => {
//       if (typeof window !== "undefined" && window.innerWidth < 1024) {
//         return 235;
//       }
//       return H() * 0.44;
//     };

//     // Radius adjusted nicely for small screen matrices
//     const R = () => {
//       if (typeof window !== "undefined" && window.innerWidth < 1024) {
//         return Math.min(W(), H()) * 0.26;
//       }
//       return Math.min(W(), H()) * 0.25;
//     };

//     const nodeCount = 75;
//     const sphereNodes: Array<{
//       x_base: number;
//       y_base: number;
//       z_base: number;
//       color: string;
//       pulseSpeed: number;
//       pulsePhase: number;
//       sizeModifier: number;
//     }> = [];
//     for (let i = 0; i < nodeCount; i++) {
//       const phi = Math.acos(-1 + (2 * i) / nodeCount);
//       const theta = Math.sqrt(nodeCount * Math.PI) * phi;
//       sphereNodes.push({
//         x_base: Math.sin(phi) * Math.cos(theta),
//         y_base: Math.cos(phi),
//         z_base: Math.sin(phi) * Math.sin(theta),
//         color: [
//           "#4F46E5", "#6366F1", "#8B5CF6", "#A78BFA",
//           "#3B82F6", "#60A5FA", "#EC4899", "#F43F5E", "#FFFFFF"
//         ][i % 9],
//         pulseSpeed: 0.02 + Math.random() * 0.04,
//         pulsePhase: Math.random() * Math.PI * 2,
//         sizeModifier: 0.7 + Math.random() * 0.8
//       });
//     }

//     const sphereEdges: Array<[number, number]> = [];
//     for (let i = 0; i < nodeCount; i++) {
//       for (let j = i + 1; j < nodeCount; j++) {
//         const dx = sphereNodes[i].x_base - sphereNodes[j].x_base;
//         const dy = sphereNodes[i].y_base - sphereNodes[j].y_base;
//         const dz = sphereNodes[i].z_base - sphereNodes[j].z_base;
//         const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
//         if (dist < 0.45) {
//           sphereEdges.push([i, j]);
//         }
//       }
//     }

//     const floaters = Array.from({ length: 70 }, () => ({
//       x: Math.random(),
//       y: Math.random(),
//       r: 0.6 + Math.random() * 2.5,
//       speed: 0.0001 + Math.random() * 0.0003,
//       phase: Math.random() * Math.PI * 2,
//       color: ["#6366F1", "#3B82F6", "#8B5CF6", "#FFFFFF", "#F59E0B"][Math.floor(Math.random() * 5)],
//       opacity: 0.2 + Math.random() * 0.6,
//     }));

//     const orbits = [
//       { rx: 1.15, ry: 0.35, tilt: -0.5, speed: 0.0012, color: "rgba(99, 102, 241, 0.4)", width: 1.2 },
//       { rx: 1.25, ry: 0.25, tilt: 0.75, speed: -0.0009, color: "rgba(139, 92, 246, 0.35)", width: 1.0 },
//       { rx: 1.05, ry: 1.05, tilt: 0.2, speed: 0.0006, color: "rgba(59, 130, 246, 0.25)", width: 0.8 },
//       { rx: 1.35, ry: 0.20, tilt: -1.1, speed: 0.0015, color: "rgba(236, 72, 153, 0.2)", width: 0.8 }
//     ];

//     function drawOrbit(orbit: typeof orbits[0], time: number) {
//       const r = R();
//       ctx.save();
//       ctx.translate(cx(), cy());
//       ctx.rotate(orbit.tilt);

//       ctx.beginPath();
//       ctx.ellipse(0, 0, r * orbit.rx, r * orbit.ry, 0, 0, Math.PI * 2);
//       ctx.strokeStyle = orbit.color;
//       ctx.lineWidth = orbit.width;
//       ctx.stroke();

//       const ang = time * orbit.speed;
//       const dx = Math.cos(ang) * r * orbit.rx;
//       const dy = Math.sin(ang) * r * orbit.ry;

//       ctx.beginPath();
//       ctx.arc(dx, dy, 3.5, 0, Math.PI * 2);
//       ctx.fillStyle = "#FFFFFF";
//       ctx.shadowBlur = 10;
//       ctx.shadowColor = orbit.color;
//       ctx.fill();
//       ctx.restore();
//       ctx.shadowBlur = 0;
//     }

//     function draw() {
//       const w = W(), h = H(), r = R();
//       ctx.clearRect(0, 0, w, h);

//       const ambientGlow = ctx.createRadialGradient(cx(), cy(), 10, cx(), cy(), r * 2.5);
//       ambientGlow.addColorStop(0, "rgba(23, 20, 70, 0.35)");
//       ambientGlow.addColorStop(0.6, "rgba(10, 8, 36, 0.15)");
//       ambientGlow.addColorStop(1, "rgba(0,0,0,0)");
//       ctx.fillStyle = ambientGlow;
//       ctx.beginPath();
//       ctx.arc(cx(), cy(), r * 2.5, 0, Math.PI * 2);
//       ctx.fill();

//       floaters.forEach((f) => {
//         const px = f.x * w;
//         const py = f.y * h;

//         const distToGlobe = Math.sqrt((px - cx()) ** 2 + (py - cy()) ** 2);
//         if (distToGlobe < r * 0.95) return;

//         const pulse = f.opacity * (0.5 + Math.sin(t * f.speed * 500 + f.phase) * 0.5);
//         ctx.beginPath();
//         ctx.arc(px, py, f.r, 0, Math.PI * 2);
//         ctx.fillStyle = f.color;
//         ctx.globalAlpha = pulse;
//         ctx.fill();
//       });
//       ctx.globalAlpha = 1.0;

//       orbits.slice(0, 2).forEach(o => drawOrbit(o, t));

//       const projectedNodes = sphereNodes.map(node => {
//         let x1 = node.x_base * Math.cos(rotY) - node.z_base * Math.sin(rotY);
//         let z1 = node.x_base * Math.sin(rotY) + node.z_base * Math.cos(rotY);
//         let y2 = node.y_base * Math.cos(rotX) - z1 * Math.sin(rotX);
//         let z2 = node.y_base * Math.sin(rotX) + z1 * Math.cos(rotX);

//         return {
//           x: cx() + x1 * r,
//           y: cy() - y2 * r,
//           z: z2,
//           color: node.color,
//           pulsePhase: node.pulsePhase,
//           pulseSpeed: node.pulseSpeed,
//           sizeModifier: node.sizeModifier
//         };
//       });

//       sphereEdges.forEach(([a, b]) => {
//         const n1 = projectedNodes[a];
//         const n2 = projectedNodes[b];
//         const avgZ = (n1.z + n2.z) / 2;
//         const alpha = (avgZ + 1) * 0.18;

//         if (alpha > 0.04) {
//           ctx.beginPath();
//           ctx.moveTo(n1.x, n1.y);
//           ctx.lineTo(n2.x, n2.y);
//           ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
//           ctx.lineWidth = 0.55;
//           ctx.stroke();
//         }
//       });

//       sphereEdges.forEach(([a, b], idx) => {
//         if (idx % 4 !== 0) return;
//         const n1 = projectedNodes[a];
//         const n2 = projectedNodes[b];
//         if (n1.z < -0.2 || n2.z < -0.2) return;

//         const progress = (t * 0.004 + idx * 0.17) % 1.0;
//         const ex = n1.x + (n2.x - n1.x) * progress;
//         const ey = n1.y + (n2.y - n1.y) * progress;

//         ctx.beginPath();
//         ctx.arc(ex, ey, 1.4, 0, Math.PI * 2);
//         ctx.fillStyle = "#FFFFFF";
//         ctx.fill();
//       });

//       projectedNodes.forEach((p, i) => {
//         const depthAlpha = (p.z + 1) / 2;
//         if (depthAlpha < 0.15) return;

//         const pulse = Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.4 + 0.6;
//         const radius = (1.2 + depthAlpha * 2.8) * p.sizeModifier;

//         ctx.save();
//         ctx.globalAlpha = 0.3 + depthAlpha * 0.7;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, radius * 3.0 * pulse, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.globalAlpha = 0.12 * depthAlpha;
//         ctx.fill();

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.globalAlpha = 0.4 + depthAlpha * 0.6;
//         ctx.fill();

//         if (i % 6 === 0) {
//           ctx.beginPath();
//           ctx.arc(p.x, p.y, radius * 0.4, 0, Math.PI * 2);
//           ctx.fillStyle = "#FFFFFF";
//           ctx.fill();
//         }
//         ctx.restore();
//       });

//       orbits.slice(2).forEach(o => drawOrbit(o, t));

//       rotY += 0.0025;
//       t++;
//       animationFrameId = requestAnimationFrame(draw);
//     }

//     draw();

//     const ro = new ResizeObserver(() => { resize(); });
//     ro.observe(canvas);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       ro.disconnect();
//     };
//   }, []);

//   const stats: Stat[] = [
//     {
//       label: "Active Licenses",
//       value: activeAgent ?? 0,
//       subValue: getUserDashboardData?.data[0]?.PreviousAgent ?? 0,
//       subLabel: "Total licenses in use",
//       icon: <RiUserStarLine className="w-5 h-5" />,
//       illustration: "/illustrations/agents.png",
//       gradient: "from-[#161726] to-[#0a0a12]",
//       accentColor: "#7C6FF0",
//       iconBg: "#3B3866",
//     },
//     {
//       label: "Total Team",
//       value: totalTeam ?? 0,
//       subValue: getUserDashboardData?.data[0]?.ActiveTeam ?? 0,
//       subLabel: "Members in your team",
//       icon: <RiCoinsLine className="w-5 h-5" />,
//       illustration: "/illustrations/team.png",
//       gradient: "from-[#0f1f1c] to-[#0a0a12]",
//       accentColor: "#22D3A6",
//       iconBg: "#164438",
//     },
//     {
//       label: "Yield Wallet",
//       value: `$${yieldWallet ?? 0}`,
//       subValue: `$${getUserDashboardData?.data[0]?.YieldWithdrawal ?? 0}`,
//       subLabel: "Total yield earned",
//       icon: <RiBarChartBoxLine className="w-5 h-5" />,
//       illustration: "/illustrations/leaf.png",
//       gradient: "from-[#101a2c] to-[#0a0a12]",
//       accentColor: "#3B82F6",
//       iconBg: "#1B3A66",
//     },
//     {
//       label: "Performance Wallet",
//       value: `$${performanceWallet ?? 0}`,
//       subValue: `$${getUserDashboardData?.data[0]?.PerformanceWithdrawal ?? 0}`,
//       subLabel: "Performance earnings",
//       icon: <RiRocketLine className="w-5 h-5" />,
//       illustration: "/illustrations/performance.png",
//       gradient: "from-[#2a1c0c] to-[#0a0a12]",
//       accentColor: "#F5A623",
//       iconBg: "#5A3D12",
//     },
//     {
//       label: "Deposit Wallet",
//       value: `$${depositWallet ?? 0}`,
//       isRedirect: true,
//       redirectPath: "/reports/statement?type=deposit",
//       icon: <RiShieldCheckLine className="w-5 h-5" />,
//       illustration: "/illustrations/deposit.png",
//       gradient: "from-[#20132c] to-[#0a0a12]",
//       accentColor: "#B26EF0",
//       iconBg: "#3F2456",
//     },
//     {
//       label: "Legacy Wallet",
//       value: `$${legacyWallet ?? 0}`,
//       isRedirect: true,
//       redirectPath: "/reports?tab=LegacyWallet",
//       icon: <RiShieldCheckLine className="w-5 h-5" />,
//       illustration: "/illustrations/legacy.png",
//       gradient: "from-[#0f2013] to-[#0a0a12]",
//       accentColor: "#4ADE80",
//       iconBg: "#1B4429",
//     },
//   ];

//   return (
//     <div className="relative w-full overflow-hidden min-h-[680px] lg:min-h-[620px] bg-[radial-gradient(circle_at_right_center,_#212eaf_0%,_#000_50%)]">

//       {/* Canvas positioned backward safely behind interactive HTML contents */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none z-0"
//       />

//       <div className="relative z-10 p-4 sm:p-6 md:p-10 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 md:gap-8">

//           {/* Top Column Box holding Badges space smoothly on mobile screen */}
//           <div className="lg:col-span-5 w-full h-[380px] sm:h-[400px] lg:h-[450px] relative order-1 lg:order-2 flex items-center justify-center pointer-events-none">

//             {/* Badges Framed precisely around calculated globe center */}
//             <div className="absolute top-12 left-2 sm:left-14 lg:left-8 rounded-xl px-2.5 py-1.5 border border-white/5 backdrop-blur-md bg-black/40">
//               <div className="flex items-center gap-1 mb-0.5">
//                 <RiFlashlightLine className="w-2.5 text-blue-400" />
//                 <span className="text-[9px] text-gray-300">Neural Sync</span>
//               </div>
//               <p className="text-xs sm:text-sm font-bold text-blue-400">98.7%</p>
//             </div>

//             <div className="absolute top-12 right-2 sm:right-14 lg:right-4 rounded-xl px-2.5 py-1.5 border border-white/5 backdrop-blur-md bg-black/40 text-right">
//               <p className="text-xs sm:text-sm font-bold text-blue-400">42,847</p>
//               <span className="text-[8px] text-gray-400 block">Active Nodes</span>
//             </div>

//             <div className="absolute bottom-12 left-2 sm:left-14 lg:left-8 rounded-xl px-2.5 py-1.5 border border-white/5 backdrop-blur-md bg-black/40">
//               <span className="text-[8px] text-gray-400 block mb-0.5">AI Volume</span>
//               <p className="text-xs sm:text-sm font-bold text-blue-400">1.24M</p>
//             </div>

//             <div className="absolute bottom-12 right-2 sm:right-14 lg:right-4 rounded-xl px-2.5 py-1.5 border border-white/5 backdrop-blur-md bg-black/40 text-right">
//               <span className="text-[8px] text-gray-400 block mb-0.5">Data Flux</span>
//               <p className="text-xs sm:text-sm font-bold text-emerald-400">12.4 TB/s</p>
//             </div>
//           </div>

//           {/* Texts and Action Controls Area below globe on mobile viewport */}
//           <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1 relative z-20 px-2 sm:px-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5 w-fit mx-auto lg:mx-0">
//               <div className="relative w-1.5 h-1.5 rounded-full bg-emerald-500">
//                 <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
//               </div>
//               <span className="text-[11px] font-semibold text-gray-200">AI Global Network Active</span>
//             </div>

//             <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[54px] text-white leading-[1.2] mb-5">
//               Deploy, Lease &amp; Scale
//               <h1 className="block bg-gradient-to-r from-blue-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
//                 Autonomous AI Agents
//               </h1>
//               Globally
//             </h1>

//             <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg mb-6 leading-relaxed mx-auto lg:mx-0">
//               The Premium AI Marketplace Ecosystem for the Future of Commerce. Lease intelligent agents,
//               deploy autonomous systems, and earn passive income from AI assets.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto max-w-md mx-auto lg:mx-0">
//               <Link
//                 href={routeMap["/buy-agent-license"] || "/buy-agent-license"}
//                 className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//               >
//                 <RiSearchLine className="w-4 h-4" />
//                 Buy Agent License
//                 <RiArrowRightSLine className="w-4 h-4" />
//               </Link>
//               <Link
//                 href={routeMap["/deploy-agents"] || "/deploy-agents"}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-white"
//               >
//                 <RiRocketLine className="w-4 h-4" />
//                 Deploy AI System
//               </Link>
//             </div>
//           </div>

//         </div>

//         {/* Footer Metrics Stats Bar */}
//         <div className="mt-10 lg:mt-14 pt-6 border-t border-white/5 relative z-20 px-2 sm:px-4">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
//             {stats.map((stat, i) => (
//               <div
//                 key={i}
//                 style={{ border: "1px solid", borderColor: stat?.accentColor  }}
//                 className={`group relative overflow-hidden rounded-2xl p-4 min-h-[150px] flex flex-col justify-between
//                    bg-gradient-to-b ${stat.gradient} hover:border-white/60
//                     transition-all duration-300 hover:scale-[1.01] cursor-pointer`}
//               >
//                 {/* Top row: icon + 3-dot menu */}
//                 <div className="relative z-10 flex items-start justify-between">
//                   {stat.icon && (
//                     <div
//                       className="w-9 h-9 rounded-lg border flex items-center justify-center text-white flex-shrink-0"
//                       style={{ backgroundColor: stat.iconBg, border: "1px solid", borderColor: stat?.accentColor }}
//                     >
//                       {stat.icon}
//                     </div>
//                   )}
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (stat.isRedirect) router.push(stat.redirectPath!);
//                     }}
//                     className="text-white/40 hover:text-white/80 transition-colors"
//                   >
//                     <RiMoreFill className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Middle: label + big value + subLabel */}
//                 <div className="relative z-10 mt-3">
//                   <p className="text-xs sm:text-sm text-white/90">
//                     {stat.label}
//                   </p>
//                   <p className="text-xl sm:text-2xl font-semibold text-white mt-1">
//                     {stat.value ?? "--"}
//                   </p>
//                   {stat.subLabel && (
//                     <p className="text-[11px] sm:text-xs text-white/70 mt-1">
//                       {stat.subLabel}
//                     </p>
//                   )}
//                 </div>

//                 {/* Illustration kept, repositioned as a subtle background chart */}
//                 {stat.illustration && (
//                   <img
//                     src={stat.illustration}
//                     alt=""
//                     className="relative z-0 self-end h-10 w-auto opacity-90 pointer-events-none select-none mt-2"
//                   />
//                 )}

//                 {/* Bottom accent bar */}
//                 <div className="relative z-10 h-1.5 w-full rounded-full bg-white/10 overflow-hidden mt-2">
//                   <div
//                     className="h-full rounded-full"
//                     style={{ width: "60%", backgroundColor: stat.accentColor }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 4s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface RouteMap {
  [key: string]: string;
}

interface DashboardData {
  data: Array<{
    MyAgent?: number;
    PerformanceWallet?: number;
    YieldWallet?: number;
    DepositWallet?: number;
    TotalTeam?: number;
    LegacyWallet?: number;
    PreviousAgent?: number;
    ActiveTeam?: number;
    YieldWithdrawal?: number;
    PerformanceWithdrawal?: number;
  }>;
}

function createRouteMapFromSeed(seed: string, count: number): RouteMap {
  return {
    "/buy-agent-license": "/buy-agent-license",
    "/deploy-agents": "/deploy-agents",
  };
}

const PAIR_CONFIG = [
  { pair: "EUR/USD", base: 1.0838, vol: 0.0004, decimals: 4 },
  { pair: "GBP/USD", base: 1.2632, vol: 0.0005, decimals: 4 },
  { pair: "USD/JPY", base: 151.29, vol: 0.05, decimals: 2 },
  { pair: "GOLD", base: 4294.51, vol: 0.8, decimals: 2 },
  { pair: "ETH/USDT", base: 2673.62, vol: 1.2, decimals: 2 },
];

export function Banner() {
  const router = useRouter();

  const [getUserDashboardData] = useState<DashboardData>({
    data: [
      {
        MyAgent: 0,
        PerformanceWallet: 0,
        YieldWallet: 0,
        DepositWallet: 0,
        TotalTeam: 0,
        LegacyWallet: 0,
        PreviousAgent: 0,
        ActiveTeam: 0,
        YieldWithdrawal: 0,
        PerformanceWithdrawal: 0,
      },
    ],
  });

  const [routeMap, setRouteMap] = useState<RouteMap>({});

  useEffect(() => {
    const updateRouteMap = () => {
      const seed = Cookies.get("routeSlugsSeed");
      if (seed) {
        setRouteMap(createRouteMapFromSeed(seed, 6));
      } else {
        setRouteMap({});
      }
    };

    updateRouteMap();
    const interval = setInterval(updateRouteMap, 1000);
    return () => clearInterval(interval);
  }, []);

  // LIVE PAIRS
  const [pairsData, setPairsData] = useState(() =>
    PAIR_CONFIG.map((p) => ({
      pair: p.pair,
      price: p.base,
      prevPrice: p.base,
      change: 0,
      up: true,
      decimals: p.decimals,
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPairsData((prev) =>
        prev.map((item, i) => {
          const cfg = PAIR_CONFIG[i];
          if (!cfg) return item;
          const move = (Math.random() - 0.5) * cfg.vol * 2;
          const newPrice = item.price + move;
          const changePct = ((newPrice - cfg.base) / cfg.base) * 100;
          return {
            ...item,
            prevPrice: item.price,
            price: newPrice,
            change: changePct,
            up: newPrice >= item.price,
          };
        })
      );
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // LIVE LINE CHART
  const POINTS = 60;
  const [data, setData] = useState<number[]>(() => {
    const arr: number[] = [];
    let val = 83376;
    for (let i = 0; i < POINTS; i++) {
      val += (Math.random() - 0.5) * 6;
      arr.push(val);
    }
    return arr;
  });

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        if (last === undefined) return prev;
        const next = last + (Math.random() - 0.5) * 6;
        return [...prev.slice(1), next];
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const W = 400;
  const H = 140;
  const PAD_T = 8;
  const PAD_B = 8;
  const usableH = H - PAD_T - PAD_B;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (POINTS - 1)) * W;
    const y = PAD_T + usableH - ((v - min) / range) * usableH;
    return { x, y };
  });

  const buildSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    const first = points[0];
    if (!first) return "";
    let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      if (!p0 || !p1 || !p2 || !p3) continue;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(
        2
      )} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return d;
  };

  const linePath = buildSmoothPath(pts);
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  const currentPrice = data[data.length - 1];
  const startPrice = data[0];
  const priceChange = currentPrice !== undefined && startPrice !== undefined ? currentPrice - startPrice : 0;
  const priceChangePct = startPrice !== undefined ? (priceChange / startPrice) * 100 : 0;
  const isUp = priceChange >= 0;

  const timeLabels = ["11:34 AM", "11:35 AM", "11:36 AM", "11:37 AM", "11:38 AM"];

  const yLabels = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const v = max - (range / 7) * i;
    return v.toFixed(0);
  });

  return (
    <div
      className="relative rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center gap-7 p-8"
      style={{
        // 🎨 DARK CHARCOAL + EMERALD THEME
        background:
          "linear-gradient(120deg, #0b1220 0%, #101a2e 55%, #0f2a1e 100%)",
        border: "1px solid rgba(80, 200, 150, 0.25)",
      }}
    >
      {/* ================= LEFT SIDE ================= */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full font-semibold px-3.5 py-[7px] text-[11px] bg-[rgba(62,207,142,.1)] border border-[rgba(62,207,142,.35)] text-[#6be0ac] mb-4">
          <span className="rounded-full w-[7px] h-[7px] bg-[#3ecf8e]" />
          Trade with AI-Assisted Risk Intelligence
        </div>

        <h1
          className="font-bold text-[30px] leading-[1.2] text-white mb-3"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Your financial command center, powered by{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            AI intelligence.
          </span>
        </h1>

        <p className="text-sm max-w-[440px] leading-[1.7] text-[#a8b5cc]">
          Learn smarter. Trade with intelligence. Track every rupee of progress
          and grow your wealth with strategies built for real market conditions.
        </p>

        <div className="text-[11px] text-[#7a8699] mt-3.5">
          Figures shown are demo / historical placeholders and update once your
          live account is connected.
        </div>

        {/* Pair tiles */}
        <div className="flex flex-wrap gap-2.5 mt-5">
          {pairsData.map((p) => (
            <div
              key={p.pair}
              className="rounded-xl px-3 py-2 min-w-[98px] bg-white/[.04] border border-white/10 transition-colors duration-300 hover:bg-white/[.07]"
            >
              <div className="text-[10.5px] text-[#8a97ad]">{p.pair}</div>
              <div
                className="font-semibold text-[13px] text-white mt-0.5"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {p.price.toFixed(p.decimals)}
              </div>
              <div
                className={`text-[10.5px] mt-0.5 transition-colors duration-300 ${
                  p.change >= 0 ? "text-[#4ade9a]" : "text-[#ff8b96]"
                }`}
              >
                {p.change >= 0 ? "+" : ""}
                {p.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= RIGHT SIDE — LIVE MARKET FEED ================= */}
      <div className="relative z-10 rounded-2xl p-[18px] bg-black/30 backdrop-blur-sm border border-white/10 flex flex-col">
        <div className="flex justify-between text-[10px] tracking-[.08em] text-white mb-2">
          <span>Live Market Feed</span>
          <b className="text-[#e0ac2e] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e0ac2e] animate-ping" />
            LIVE
          </b>
        </div>

        <div className="flex justify-between items-start mb-2">
          <div>
            <div
              className="text-[18px] font-semibold text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              ${currentPrice !== undefined ? currentPrice.toFixed(2) : "0.00"}
            </div>
            <div
              className={`text-[11px] ${
                isUp ? "text-[#4ade9a]" : "text-[#ff6b7d]"
              }`}
            >
              {isUp ? "+" : ""}
              {priceChange.toFixed(2)} ({priceChangePct.toFixed(2)}%)
            </div>
          </div>
          <div className="text-[10px] text-white/80">BTC/USDT</div>
        </div>

        {/* Chart + axes */}
        <div className="flex gap-2">
          {/* Y-axis labels */}
          <div
            className="flex flex-col justify-between text-[9px] text-white/50 py-1 shrink-0"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {yLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>

          {/* Chart */}
          <div className="flex-1 min-w-0">
            <div className="w-full h-[130px] relative">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    x2={W}
                    y1={PAD_T + (usableH / 7) * i}
                    y2={PAD_T + (usableH / 7) * i}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                  />
                ))}

                <path d={areaPath} fill="url(#areaGrad)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {pts.length > 0 && (() => {
                  const lastPt = pts[pts.length - 1];
                  if (!lastPt) return null;
                  return (
                    <>
                      <circle
                        cx={lastPt.x}
                        cy={lastPt.y}
                        r="3.5"
                        fill="#F43F5E"
                      />
                      <circle
                        cx={lastPt.x}
                        cy={lastPt.y}
                        r="7"
                        fill="none"
                        stroke="#F43F5E"
                        strokeOpacity="0.4"
                        strokeWidth="1.5"
                      >
                      <animate
                        attributeName="r"
                        values="7;10;7"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="strokeOpacity"
                        values="0.4;0;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                  );
                })()}
              </svg>
            </div>

            <div
              className="flex justify-between text-[9px] text-white/50 mt-1"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {timeLabels.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex justify-between mt-3">
          <div className="text-center">
            <div
              className="font-semibold text-[15px] text-[#4ade9a]"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Bearish
            </div>
            <div className="text-[9.5px] text-white/50">TREND</div>
          </div>
          <div className="text-center">
            <div
              className="font-semibold text-[15px] text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              76%
            </div>
            <div className="text-[9.5px] text-white/50">AI CONFIDENCE</div>
          </div>
          <div className="text-center">
            <div
              className="font-semibold text-[15px] text-[#e0ac2e]"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Low
            </div>
            <div className="text-[9.5px] text-white/50">RISK LEVEL</div>
          </div>
        </div>
      </div>
    </div>
  );
}