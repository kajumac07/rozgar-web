"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContexts";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Resume {
  id: string;
  userName: string;
  pdfUrl: string;
  createdAt: string;
}

interface JobRequirement {
  id: string;
  jobTitle: string;
  companyName: string;
  createdAt: string;
}

type ActiveTab = "resumes" | "jobs" | "users" | "settings";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobs, setJobs] = useState<JobRequirement[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("resumes");

  const { user } = useAuth() || { user: null };
  const router = useRouter();

  useEffect(() => {
    console.log("Initializing Admin Dashboard check...");

    const checkAdminStatus = async () => {
      if (!user) {
        console.log("No user found, redirecting...");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("Checking admin status for user:", user.uid);
        const userDoc = await getDocs(collection(db, "Users"));
        const adminUser = userDoc.docs.find(
          (doc) => doc.id === user.uid && doc.data().isAdmin === true
        );

        if (!adminUser) {
          console.log("User is not an admin:", user.uid);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        console.log("User is admin:", user.uid);
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    const fetchResumes = async () => {
      try {
        console.log("Fetching resumes...");
        const resumesSnapshot = await getDocs(collection(db, "resumes"));
        const resumesData = resumesSnapshot.docs.map((doc) => {
          const data = doc.data();
          let createdAt = "Unknown Date";

          if (data.createdAt) {
            if (typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate().toLocaleDateString();
            } else if (data.createdAt.seconds) {
              createdAt = new Date(
                data.createdAt.seconds * 1000
              ).toLocaleDateString();
            } else if (typeof data.createdAt === "string") {
              createdAt = new Date(data.createdAt).toLocaleDateString();
            }
          }

          return {
            id: doc.id,
            userName: data.userName || "Unknown",
            pdfUrl: data.pdfUrl || "",
            createdAt,
          };
        });

        console.log("Fetched resumes count:", resumesData.length);
        setResumes(resumesData);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        console.log("Fetching job requirements...");
        const jobsSnapshot = await getDocs(collection(db, "JobRequirements"));
        const jobsData = jobsSnapshot.docs.map((doc) => {
          const data = doc.data();
          let createdAt = "Unknown Date";

          if (data.createdAt) {
            if (typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate().toLocaleDateString();
            } else if (data.createdAt.seconds) {
              createdAt = new Date(
                data.createdAt.seconds * 1000
              ).toLocaleDateString();
            } else if (typeof data.createdAt === "string") {
              createdAt = new Date(data.createdAt).toLocaleDateString();
            }
          }

          return {
            id: doc.id,
            jobTitle: data.jobTitle || "Untitled Position",
            companyName: data.companyName || "Unknown Company",
            createdAt,
          };
        });

        console.log("Fetched jobs count:", jobsData.length);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching job requirements:", error);
      }
    };

    const initializeDashboard = async () => {
      await checkAdminStatus();

      if (isAdmin) {
        await fetchResumes();
        await fetchJobs();
      }
      setLoading(false);
    };

    initializeDashboard();
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading Admin Dashboard...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
          <p className="font-bold">Access Denied</p>
          <p>You don't have permission to access this page</p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "resumes":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Resume Submissions
              </h2>
              <p className="text-sm text-gray-600">
                {resumes.length} resumes found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resumes.map((resume) => (
                    <tr key={resume.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {resume.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {resume.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={resume.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900 hover:underline"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                  {resumes.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No resumes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "jobs":
        return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Job Requirements
              </h2>
              <p className="text-sm text-gray-600">
                {jobs.length} job postings found
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Posted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.jobTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.companyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {job.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900 hover:underline mr-4">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-900 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No job requirements found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-indigo-700 text-white">
        <div className="p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-indigo-200">Welcome, {user?.email}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("resumes")}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  activeTab === "resumes"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-800"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Resume Dashboard
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  activeTab === "jobs"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-800"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Job Requirements
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === "resumes" && "Resume Management"}
            {activeTab === "jobs" && "Job Requirements"}
            {activeTab === "users" && "User Management"}
            {activeTab === "settings" && "Admin Settings"}
          </h1>
          <p className="text-gray-600 mt-2">
            {activeTab === "resumes" && "View and manage all submitted resumes"}
            {activeTab === "jobs" && "Manage job postings and requirements"}
            {activeTab === "users" && "View and manage all registered users"}
            {activeTab === "settings" && "Configure admin dashboard settings"}
          </p>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { useAuth } from "@/contexts/AuthContexts";
// import { useRouter } from "next/navigation";

// interface Resume {
//   id: string;
//   userName: string;
//   pdfUrl: string;
//   createdAt: string;
// }

// export default function AdminDashboard() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [resumes, setResumes] = useState<Resume[]>([]);

//   const { user } = useAuth() || { user: null };
//   const router = useRouter();

//   useEffect(() => {
//     console.log("Initializing Admin Dashboard check...");

//     const checkAdminStatus = async () => {
//       if (!user) {
//         console.log("No user found, redirecting...");
//         setIsAdmin(false);
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("Checking admin status for user:", user.uid);
//         const userDoc = await getDocs(collection(db, "Users"));
//         const adminUser = userDoc.docs.find(
//           (doc) => doc.id === user.uid && doc.data().isAdmin === true
//         );

//         if (!adminUser) {
//           console.log("User is not an admin:", user.uid);
//           setIsAdmin(false);
//           setLoading(false);
//           return;
//         }

//         console.log("User is admin:", user.uid);
//         setIsAdmin(true);
//       } catch (error) {
//         console.error("Error checking admin status:", error);
//         setIsAdmin(false);
//         setLoading(false);
//       }
//     };

//     const fetchResumes = async () => {
//       try {
//         console.log("Fetching resumes...");
//         const resumesSnapshot = await getDocs(collection(db, "resumes"));
//         const resumesData = resumesSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           let createdAt = "Unknown Date";

//           // Handle different possible date formats
//           if (data.createdAt) {
//             if (typeof data.createdAt.toDate === "function") {
//               // It's a Firestore Timestamp
//               createdAt = data.createdAt.toDate().toLocaleDateString();
//             } else if (data.createdAt.seconds) {
//               // It might be a timestamp in seconds
//               createdAt = new Date(
//                 data.createdAt.seconds * 1000
//               ).toLocaleDateString();
//             } else if (typeof data.createdAt === "string") {
//               // It might be an ISO string
//               createdAt = new Date(data.createdAt).toLocaleDateString();
//             }
//           }

//           return {
//             id: doc.id,
//             userName: data.userName || "Unknown",
//             pdfUrl: data.pdfUrl || "",
//             createdAt,
//           };
//         });

//         console.log("Fetched resumes count:", resumesData.length);
//         setResumes(resumesData);
//       } catch (error) {
//         console.error("Error fetching resumes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const initializeDashboard = async () => {
//       await checkAdminStatus();

//       if (isAdmin) {
//         await fetchResumes();
//       } else {
//         setLoading(false);
//       }
//     };

//     initializeDashboard();
//   }, [user, isAdmin]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           You don't have permission to access this page
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-black">
//         Resume Management Dashboard
//       </h1>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 User Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date Created
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {resumes.map((resume) => (
//               <tr key={resume.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">
//                     {resume.userName}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">
//                     {resume.createdAt}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <a
//                     href={resume.pdfUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-600 hover:text-indigo-900"
//                   >
//                     Download PDF
//                   </a>
//                 </td>
//               </tr>
//             ))}
//             {resumes.length === 0 && (
//               <tr>
//                 <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                   No resumes found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
