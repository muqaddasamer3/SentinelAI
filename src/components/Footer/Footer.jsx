import {
  Shield,

  Mail,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="about"
      className="mt-32 border-t border-cyan-400/10 bg-[#070B11]"
    >
      <div className="mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10">

                <Shield
                  className="text-cyan-300"
                  size={28}
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  SentinelAI
                </h2>

                <p className="text-sm text-slate-400">
                  AI Surveillance Platform
                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-slate-400">

              AI-powered surveillance system for real-time
              monitoring, smart alerts, face recognition,
              incident management and security analytics.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-4">

              <a href="#home" className="block text-slate-400 hover:text-cyan-300">
                Home
              </a>

              <a href="#features" className="block text-slate-400 hover:text-cyan-300">
                Features
              </a>

              <a href="#dashboard" className="block text-slate-400 hover:text-cyan-300">
                Dashboard
              </a>

              <a href="#monitoring" className="block text-slate-400 hover:text-cyan-300">
                Live Monitoring
              </a>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Resources
            </h3>

            <div className="space-y-4">

              <a href="#" className="block text-slate-400 hover:text-cyan-300">
                Documentation
              </a>

              <a href="#" className="block text-slate-400 hover:text-cyan-300">
                API
              </a>

              <a href="#" className="block text-slate-400 hover:text-cyan-300">
                Privacy Policy
              </a>

              <a href="#" className="block text-slate-400 hover:text-cyan-300">
                Terms & Conditions
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <p className="text-slate-400">
                Lahore, Pakistan
              </p>

              <p className="text-slate-400">
                support@sentinelai.com
              </p>

              <div className="mt-8 flex gap-4">

                {/* <a
                  href="#"
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-3 transition hover:bg-cyan-400 hover:text-black"
                >
                  {/* <Github size={20}/> */}
                {/* </a>  */}

                {/* <a
                  href="#"
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-3 transition hover:bg-cyan-400 hover:text-black"
                >
                  {/* <LinkedInIcon size={20}/> */}
                {/* </a> */} 

                <a
                  href="#"
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-3 transition hover:bg-cyan-400 hover:text-black"
                >
                  <Mail size={20}/>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-sm text-slate-500">
            © 2026 SentinelAI. All rights reserved.
          </p>

          <a
            href="#home"
            className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
          >
            Back to Top
            <ArrowUp size={18}/>
          </a>

        </div>

      </div>
    </footer>
  );
}