"use client";

import { useAuth } from "@/contexts/AuthContexts";
import { db } from "@/lib/firebase";
import { UserDetails } from "@/types/userDetails";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JobPortalMsgComponent() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { user } = useAuth() || { user: null };
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data() as UserDetails);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      {/* Animated floating elements */}
      <div className="absolute top-20 left-20 w-10 h-10 bg-white rounded-full opacity-10 animate-float1"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white rounded-full opacity-10 animate-float2"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-white rounded-full opacity-10 animate-float3"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            TRUSTED BY 10,000+ COMPANIES WORLDWIDE
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
            The Ultimate Job Portal
          </span>
        </h2>

        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Join <span className="font-bold">millions</span> who've found their
          dream jobs or perfect candidates through our platform
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href={
              user != null && userDetails?.accountType === "jobSeeker"
                ? "/jobs"
                : "/login"
            }
            className="relative overflow-hidden group bg-white text-blue-600 px-10 py-5 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              Looking for a Job?
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </Link>

          <Link
            href={
              user != null && userDetails?.accountType === "employer"
                ? "/post-your-requirement"
                : "/login"
            }
            className="relative overflow-hidden group bg-indigo-600 text-white px-10 py-5 rounded-full font-bold hover:bg-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <button
              onClick={(e) => {
                if (user == null) {
                  router.push("/login");
                } else if (
                  user != null &&
                  userDetails?.accountType !== "employer"
                ) {
                  e.preventDefault();
                  toast.error(
                    "Only employers can post job requirements. Please use a job seeker account"
                  );
                }
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Post a Job Opening
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"
                ></div>
              ))}
            </div>
            <span>4,000+ new jobs posted daily</span>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS */}
      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(15px) translateX(-15px);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(-20px);
          }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
