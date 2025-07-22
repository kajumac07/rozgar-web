import { Timestamp } from "firebase/firestore";

export interface UserDetails {
  accountType: "jobSeeker" | "employer" | "business";
  email: string;
  isAdmin: boolean;
  jobTitle: string;
  name: string;
  uid: string;
  createdAt: Timestamp;
}
