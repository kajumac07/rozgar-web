"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContexts";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type SelectedFile = {
  name: string;
  size: number;
  type: string;
} | null;

export default function JobApplicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth() || { user: null };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  const jobId = searchParams.get("jobId");
  const jobTitle = searchParams.get("jobTitle");

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setFormData((prev) => ({ ...prev, resume: null }));
      return;
    }

    // Validate file type (PDF or DOC/DOCX)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      return;
    }

    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    setFormData((prev) => ({ ...prev, resume: file }));
    toast.success("File selected successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !jobId || !jobTitle) {
      toast.error("Authentication or job information missing");
      return;
    }

    if (!formData.resume) {
      toast.error("Please select a resume file");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your application...");

    try {
      // 1. Upload resume to Firebase Storage
      const storageRef = ref(
        storage,
        `resumes/${user.uid}/${Date.now()}_${formData.resume.name}`
      );
      const snapshot = await uploadBytes(storageRef, formData.resume);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 2. Save application data to Firestore
      await addDoc(collection(db, "AppliedJobs"), {
        jobId,
        jobTitle,
        userId: user.uid,
        userEmail: user.email,
        fullName: formData.fullName,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeFileName: formData.resume.name,
        resumeFileType: formData.resume.type,
        resumeFileSize: formData.resume.size,
        resumeUrl: downloadURL,
        appliedAt: new Date(),
        status: "Pending",
      });

      toast.success("Application submitted successfully!", { id: toastId });
      router.push("/jobs/apply/success");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Please login to apply for jobs</div>
      </div>
    );
  }

  if (!jobId || !jobTitle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Invalid job application</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Apply for {jobTitle}
          </h1>
          <p className="mt-2 text-gray-600">
            Please fill out the application form
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="coverLetter"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={4}
              required
              value={formData.coverLetter}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Resume (PDF or Word)
              {selectedFile && (
                <span className="ml-2 text-sm text-gray-500">
                  Selected: {selectedFile.name} (
                  {Math.round(selectedFile.size / 1024)} KB)
                </span>
              )}
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              ref={fileInputRef}
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
