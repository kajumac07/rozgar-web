"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { setDoc, collection, Timestamp, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContexts";

export default function PostRequirementPage() {
  const { user } = useAuth() || { user: null };
  const [form, setForm] = useState({
    jobType: "FullTime",
    jobTitle: "",
    jobLocation: "",
    openings: "",
    requiredQualification: "",
    experienceRequired: "",
    monthlySalary: "",
    bonus: "",
    jobDescription: "",
    skillsRequired: "",
    jobTiming: "",
    interviewTime: "",
    companyName: "",
    contactPersonName: "",
    phoneNumber: "",
    email: "",
    contactPersonProfile: "",
    jobAddress: "",
    agree: false,
    uid: user?.uid || "",
    jobId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!form.agree) {
  //     toast.error("You must agree to the terms and conditions.");
  //     return;
  //   }

  //   try {
  //     await addDoc(collection(db, "JobRequirements"), {
  //       ...form,
  //       createdAt: Timestamp.now(),
  //     });

  //     toast.success("Job requirement posted successfully!");
  //     setForm({
  //       jobType: "FullTime",
  //       jobTitle: "",
  //       jobLocation: "",
  //       openings: "",
  //       requiredQualification: "",
  //       experienceRequired: "",
  //       monthlySalary: "",
  //       bonus: "",
  //       jobDescription: "",
  //       skillsRequired: "",
  //       jobTiming: "",
  //       interviewTime: "",
  //       companyName: "",
  //       contactPersonName: "",
  //       phoneNumber: "",
  //       email: "",
  //       contactPersonProfile: "",
  //       jobAddress: "",
  //       agree: false,
  //       uid: user?.uid || "",
  //       jobId: "",
  //     });
  //   } catch (error) {
  //     toast.error("Failed to post job.");
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      const newDocRef = doc(collection(db, "JobRequirements"));
      const jobId = newDocRef.id;

      await setDoc(newDocRef, {
        ...form,
        jobId,
        createdAt: Timestamp.now(),
      });

      toast.success("Job requirement posted successfully!");
      setForm({
        jobType: "FullTime",
        jobTitle: "",
        jobLocation: "",
        openings: "",
        requiredQualification: "",
        experienceRequired: "",
        monthlySalary: "",
        bonus: "",
        jobDescription: "",
        skillsRequired: "",
        jobTiming: "",
        interviewTime: "",
        companyName: "",
        contactPersonName: "",
        phoneNumber: "",
        email: "",
        contactPersonProfile: "",
        jobAddress: "",
        agree: false,
        uid: user?.uid || "",
        jobId: "",
      });
    } catch (error) {
      toast.error("Failed to post job.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <h2 className="text-3xl font-bold text-center">
            Post Your Job Requirement
          </h2>
          <p className="text-center text-indigo-100 mt-2">
            Fill out the form below to attract the best candidates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Job Type */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block font-medium text-blue-800 mb-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-700 transition-all"
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contractual">Contractual</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
              <option value="WFH">Work From Home</option>
            </select>
          </div>

          {/* Job Details Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
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
              Job Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  name="jobTitle"
                  placeholder="e.g. Software Engineer"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  name="jobLocation"
                  placeholder="e.g. Bangalore"
                  value={form.jobLocation}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Openings
                </label>
                <input
                  name="openings"
                  placeholder="Number of positions"
                  value={form.openings}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                <input
                  name="requiredQualification"
                  placeholder="e.g. B.Tech, MBA"
                  value={form.requiredQualification}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  name="experienceRequired"
                  placeholder="e.g. 2-5 years"
                  value={form.experienceRequired}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary (₹)
                </label>
                <input
                  name="monthlySalary"
                  placeholder="Monthly salary"
                  value={form.monthlySalary}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bonus/Perks
              </label>
              <input
                name="bonus"
                placeholder="e.g. Performance bonus, stock options"
                value={form.bonus}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description*
              </label>
              <textarea
                name="jobDescription"
                placeholder="Detailed job description, responsibilities..."
                value={form.jobDescription}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Required
                </label>
                <input
                  name="skillsRequired"
                  placeholder="e.g. React, Node.js, Communication"
                  value={form.skillsRequired}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Timing*
                </label>
                <input
                  name="jobTiming"
                  placeholder="e.g. 9:30 AM - 6:30 PM"
                  value={form.jobTiming}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Details
              </label>
              <input
                name="interviewTime"
                placeholder="Interview schedule and process"
                value={form.interviewTime}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
              />
            </div>
          </div>

          {/* Company Info Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  name="companyName"
                  placeholder="Your company name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  name="contactPersonName"
                  placeholder="Name of contact person"
                  value={form.contactPersonName}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  placeholder="Contact number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  type="tel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  name="email"
                  placeholder="Contact email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person Role
                </label>
                <input
                  name="contactPersonProfile"
                  placeholder="e.g. HR Manager"
                  value={form.contactPersonProfile}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Address
                </label>
                <input
                  name="jobAddress"
                  placeholder="Work location address"
                  value={form.jobAddress}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-700 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-2 border-gray-400"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <strong className="text-blue-700">Terms & Conditions</strong>,{" "}
                <strong className="text-blue-700">Privacy Policy</strong> and
                consent to be contacted. I confirm that the information provided
                is accurate.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Post Job Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
