import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Resume Builder", href: "/resume" },
  { label: "DSA Practice", href: "/dsa" },
  { label: "Company Prep", href: "/companies" },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/pari-28/PrepVerse", external: true },
  { label: "Discord", href: "#", external: true },
  { label: "Twitter", href: "#", external: true },
  { label: "Blog", href: "/blog" },
];

export function EnhancedFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">PrepVerse</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Your all-in-one platform for interview preparation, resume building, and DSA practice. Land your dream job with confidence.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PrepVerse. Open source under MIT License.
          </p>
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
