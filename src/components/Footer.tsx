import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080812]">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-6 py-8 md:grid-cols-3 md:items-center">

        {/* Left */}
        <div className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-white">
            Praveenan J.
          </span>{" "}
          All rights reserved.
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <p className="text-center text-sm text-muted-foreground">
            Cardano Blockchain Developer · Full Stack Engineer
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-end md:gap-4">

          {/* Email */}
          <Link
            href="mailto:praveenanjvp@gmail.com"
            className="inline-flex items-center text-sm text-muted-foreground transition hover:text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            praveenanjvp@gmail.com
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>

          {/* Github */}
          <Link
            href="https://github.com/J-Praveenan"
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-muted-foreground transition hover:border-[#7C83FF]/40 hover:bg-[#7C83FF]/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/praveenan-jeevarethinam-93bb7420b/"
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-muted-foreground transition hover:border-[#7C83FF]/40 hover:bg-[#7C83FF]/10 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#7C83FF] to-transparent opacity-60" />
    </footer>
  );
}