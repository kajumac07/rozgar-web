// "use client";

// import React, { useState } from "react";
// import { auth, db } from "@/lib/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import Link from "next/link";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [accountType, setAccountType] = useState("jobSeeker");
//   const [jobTitle, setJobTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await setDoc(doc(db, "Users", userCredential.user.uid), {
//         uid: userCredential.user.uid,
//         name,
//         email,
//         accountType,
//         jobTitle: accountType === "jobSeeker" ? jobTitle : "",
//         isAdmin: false,
//         createdAt: new Date(),
//       });

//       toast.success("Account created successfully!");
//       router.push("/");
//     } catch (error) {
//       toast.error("Error creating account");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl">
//         <h2 className="text-center text-3xl font-bold text-gray-900">
//           Create an Account
//         </h2>

//         <form className="space-y-5" onSubmit={handleRegister}>
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Radio Buttons */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               What are you here for?
//             </label>
//             <div className="flex items-center gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="accountType"
//                   value="jobSeeker"
//                   checked={accountType === "jobSeeker"}
//                   onChange={() => setAccountType("jobSeeker")}
//                 />
//                 <span className="text-sm text-gray-800">I want a job</span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="accountType"
//                   value="employer"
//                   checked={accountType === "employer"}
//                   onChange={() => setAccountType("employer")}
//                 />
//                 <span className="text-sm text-gray-800">
//                   I want to hire people
//                 </span>
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="accountType"
//                   value="business"
//                   checked={accountType === "business"}
//                   onChange={() => setAccountType("business")}
//                 />
//                 <span className="text-sm text-gray-800">Start a Business</span>
//               </label>
//             </div>
//           </div>

//           {/* Job Title (conditional) */}
//           {accountType === "jobSeeker" && (
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Job Title
//               </label>
//               <input
//                 id="jobTitle"
//                 name="jobTitle"
//                 type="text"
//                 placeholder="e.g., Flutter Developer"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//           >
//             {loading ? "Creating Account..." : "Sign up"}
//           </button>

//           <div className="flex justify-center">
//             <h4>
//               Already have an account ?{" "}
//               <Link href={"/login"}>
//                 <span className="text-indigo-700 cursor-pointer">Login</span>
//               </Link>
//             </h4>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [accountType, setAccountType] = useState("jobSeeker");
  const [jobTitle, setJobTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid file (PDF, DOC, DOCX, or TXT)");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size too large. Maximum size is 5MB");
        return;
      }

      setResumeFile(file);
      toast.success("Resume selected successfully!");
    }
  };

  // Upload resume to Firebase Storage
  const uploadResumeToStorage = async (
    userId: string,
    file: File
  ): Promise<string> => {
    try {
      setIsUploadingResume(true);
      setUploadProgress(0);

      // Create a storage reference
      const storageRef = ref(storage, `resumes/${userId}/${file.name}`);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success("Resume uploaded successfully!");
      return downloadURL;
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
      throw error;
    } finally {
      setIsUploadingResume(false);
      setUploadProgress(0);
    }
  };

  // Update user document with resume URL
  const updateUserWithResume = async (userId: string, resumeUrl: string) => {
    try {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, {
        resumeUrl: resumeUrl,
        resumeUploadedAt: new Date(),
        resumeFileName: resumeFile?.name,
      });
    } catch (error) {
      console.error("Error updating user with resume:", error);
      throw error;
    }
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = userCredential.user.uid;

      // 2. Create initial user document
      const userData: any = {
        uid: userId,
        name,
        email,
        contactNumber,
        accountType,
        jobTitle: accountType === "jobSeeker" ? jobTitle : "",
        isAdmin: false,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "Users", userId), userData);

      // 3. If job seeker and resume file exists, upload it
      if (accountType === "jobSeeker" && resumeFile) {
        try {
          const resumeUrl = await uploadResumeToStorage(userId, resumeFile);
          await updateUserWithResume(userId, resumeUrl);
        } catch (uploadError) {
          console.error(
            "Resume upload failed, but account was created:",
            uploadError
          );
          // Don't fail the registration if resume upload fails
          toast.error(
            "Account created but resume upload failed. You can upload it later."
          );
        }
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please use a different email.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Error creating account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove selected file
  const handleRemoveResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your phone number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Please enter a valid phone number with country code (e.g.,
              +919876543210)
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password should be at least 6 characters long
            </p>
          </div>

          {/* Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are you here for?
            </label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="jobSeeker"
                  checked={accountType === "jobSeeker"}
                  onChange={() => setAccountType("jobSeeker")}
                />
                <span className="text-sm text-gray-800">I want a job</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="employer"
                  checked={accountType === "employer"}
                  onChange={() => setAccountType("employer")}
                />
                <span className="text-sm text-gray-800">
                  I want to hire people
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="business"
                  checked={accountType === "business"}
                  onChange={() => setAccountType("business")}
                />
                <span className="text-sm text-gray-800">Start a Business</span>
              </label>
            </div>
          </div>

          {/* Job Title (conditional) */}
          {accountType === "jobSeeker" && (
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Title / Position
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="e.g., Maths Teacher"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your desired job position or field
              </p>
            </div>
          )}

          {/* Resume Upload (conditional - only for job seekers) */}
          {accountType === "jobSeeker" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume (Optional)
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
              />

              {!resumeFile ? (
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm">Click to upload resume</span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX, TXT (Max 5MB)
                    </span>
                  </div>
                </button>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <svg
                          className="w-6 h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(resumeFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {isUploadingResume && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Uploading your resume now will make your profile more attractive
                to employers. You can also upload it later from your profile
                settings.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isUploadingResume}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Account..."
              : isUploadingResume
              ? "Uploading Resume..."
              : "Sign up"}
          </button>

          <div className="flex justify-center">
            <h4>
              Already have an account ?{" "}
              <Link href={"/login"}>
                <span className="text-indigo-700 cursor-pointer hover:underline">
                  Login
                </span>
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
