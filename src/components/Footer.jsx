import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tighter text-white transition-opacity hover:opacity-80"
            >
              FILMEE<span className="text-red-600">.</span>
            </Link>
            <p className="mt-6 text-sm leading-6 text-zinc-400">
              The premier platform connecting filmmakers, investors, and talent
              worldwide.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Creators
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/creators/projects"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Create Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/funding"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Find Funding
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/talent"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Investors
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/investors/browse"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/investors/tools"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Investment Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/investors/insights"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/investors/portfolio"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-400 transition-colors duration-300 hover:text-red-600"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-400">
            © 2025 Filmee. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 transition-all duration-300 hover:text-red-600"
            >
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 transition-all duration-300 hover:text-red-600"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
