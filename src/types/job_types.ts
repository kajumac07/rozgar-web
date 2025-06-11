import { Timestamp } from "firebase/firestore";

export interface JobRequirement {
  jobId: string;
  uid: string;
  skillsRequired: string;
  requiredQualification: string;
  phoneNumber: string;
  openings: string;
  monthlySalary: string;
  jobType: string;
  jobTitle: string;
  jobTiming: string;
  jobLocation: string;
  jobDescription: string;
  jobAddress: string;
  interviewTime: string;
  experienceRequired: string;
  email: string;
  createdAt: Timestamp;
  contactPersonProfile: string;
  contactPersonName: string;
  companyName: string;
  bonus: string;
  agree: boolean;
}
