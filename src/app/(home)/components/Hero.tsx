import React from "react";

export default function HeroSectionComp() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-4">
            Your Dream Job Awaits!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Discover Exciting Opportunities & Build Your Career Path Today
          </p>

          <div className="bg-gray-50 p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <select className="w-full p-3 border rounded-md appearance-none text-black">
                  <option value="">Job Category</option>
                  <option value="tech">Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <div className="relative">
                <select className="w-full p-3 border rounded-md appearance-none text-black">
                  <option value="">Location</option>
                  <option value="remote">Remote</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="eu">Europe</option>
                </select>
              </div>

              <div className="relative">
                <select className="w-full p-3 border rounded-md appearance-none text-black">
                  <option value="">Keywords</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors">
                Search Jobs
              </button>
            </div>
          </div>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Your Resume
          </button>
        </div>
      </div>
    </div>
  );
}
