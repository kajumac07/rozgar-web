import React from "react";
import Image from "next/image";

export default function InfoSectionComponent() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Dream Career
            </span>
          </h2>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
            Join over 100,000 professionals who've launched their dream careers
            through our platform. We bridge the gap between exceptional talent
            and world-class opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 transform hover:-translate-y-1">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Lightning-Fast Job Search
                </h3>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Find Jobs
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-2xl mb-2 text-gray-800">15k+</h4>
                <p className="text-gray-600">Premium Job Listings</p>
                <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-2xl mb-2 text-gray-800">12k+</h4>
                <p className="text-gray-600">Top Companies Hiring</p>
                <div className="w-full bg-indigo-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
            <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>

            <div className="relative z-10">
              <Image
                src="/professional-person.png"
                alt="Professional looking for job"
                width={600}
                height={700}
                className="rounded-3xl shadow-2xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />

              <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-2xl border-2 border-blue-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-semibold text-gray-800">
                    <span className="text-blue-600 font-bold">5,200+</span> New
                    Jobs Today
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Verified Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
