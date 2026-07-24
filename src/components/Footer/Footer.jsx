// import { Link } from "react-router-dom";
// import {
//   Shield,
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Linkedin,
// } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="mt-24 border-t border-white/10 bg-[#05171F] text-white">
//       <div className="mx-auto max-w-7xl px-8 py-16">

//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
//                 <Shield size={26} />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold">SentinelAI</h2>
//                 <p className="text-sm text-slate-400">
//                   AI Surveillance Platform
//                 </p>
//               </div>
//             </div>

//             <p className="mt-6 text-slate-400 leading-7">
//               AI-powered surveillance platform providing intelligent monitoring,
//               incident detection, face recognition and real-time security
//               analytics.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

//             <ul className="space-y-3 text-slate-400">
//               <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
//               <li><a href="#features" className="hover:text-cyan-400">Features</a></li>
//               <li><Link to="/feed-overview" className="hover:text-cyan-400">Live Feed</Link></li>
//               <li><Link to="/incident-dashboard" className="hover:text-cyan-400">Incident Dashboard</Link></li>
//             </ul>
//           </div>

//           {/* Features */}
//           <div>
//             <h3 className="mb-5 text-lg font-semibold">AI Features</h3>

//             <ul className="space-y-3 text-slate-400">
//               <li>Face Recognition</li>
//               <li>Threat Detection</li>
//               <li>Live Monitoring</li>
//               <li>Instant Alerts</li>
//               <li>AI Analytics</li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="mb-5 text-lg font-semibold">Contact</h3>

//             <div className="space-y-4 text-slate-400">

//               <div className="flex items-center gap-3">
//                 <Mail size={18} />
//                 support@sentinelai.com
//               </div>

//               <div className="flex items-center gap-3">
//                 <Phone size={18} />
//                 +92 300 1234567
//               </div>

//               <div className="flex items-center gap-3">
//                 <MapPin size={18} />
//                 Lahore, Pakistan
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <Github className="cursor-pointer hover:text-cyan-400" />
//                 <Linkedin className="cursor-pointer hover:text-cyan-400" />
//               </div>

//             </div>
//           </div>

//         </div>

//         <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-500">
//           © {new Date().getFullYear()} SentinelAI. All Rights Reserved.
//         </div>

//       </div>
//     </footer>
//   );
// }