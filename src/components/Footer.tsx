import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Briefcase,
  Users,
  DollarSign,
  Info,
  FileText,
  HelpCircle,
  Phone,
  Shield,
  File,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Contact */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-4">
              Rozgaar
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Connecting talented professionals with world-class companies to
              build meaningful careers.
            </p>
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              <Mail size={18} className="text-blue-400" />
              <span>rozgaar97@gmail.com</span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={18} />
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/jobs"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Browse Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Companies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Candidates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={18} />
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={18} />
              Support & Legal
            </h3>
            <ul className="space-y-3">
              {/* <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Terms of Use
                </a>
              </li>
              */}
              <li>
                <a
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              {/* <li>
                <a
                  href="/cookie"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            */}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Rozgaar. All rights reserved.
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
