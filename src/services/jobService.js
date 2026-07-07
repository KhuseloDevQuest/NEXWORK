import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ============================================================
   JOBS
   ============================================================ */

/**
 * Post a new job. Returns the created job's document reference.
 */
export const createJob = async (clientId, jobData) => {
  const ref = await addDoc(collection(db, "jobs"), {
    clientId,
    title: jobData.title,
    description: jobData.description,
    budget: Number(jobData.budget),
    skills: jobData.skills,
    status: "open",
    createdAt: serverTimestamp(),
  });

  return ref;
};

/**
 * Fetch all jobs posted by a specific client.
 */
export const getClientJobs = async (clientId) => {
  const q = query(
    collection(db, "jobs"),
    where("clientId", "==", clientId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch all open jobs (for the freelancer browse view).
 */
export const getOpenJobs = async () => {
  const q = query(
    collection(db, "jobs"),
    where("status", "==", "open"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch a single job by ID.
 */
export const getJob = async (jobId) => {
  const snapshot = await getDoc(doc(db, "jobs", jobId));

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
};

/**
 * Close a job (called when a client accepts a proposal).
 */
export const closeJob = async (jobId) => {
  await updateDoc(doc(db, "jobs", jobId), { status: "closed" });
};

/* ============================================================
   APPLICATIONS
   ============================================================ */

/**
 * Submit a proposal/application for a job.
 */
export const createApplication = async (jobId, freelancerId, clientId, applicationData) => {
  const ref = await addDoc(collection(db, "applications"), {
    jobId,
    freelancerId,
    clientId,
    coverLetter: applicationData.coverLetter,
    proposedRate: Number(applicationData.proposedRate),
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return ref;
};

/**
 * Fetch all applications for a specific job (client view).
 */
export const getApplicationsForJob = async (jobId) => {
  const q = query(
    collection(db, "applications"),
    where("jobId", "==", jobId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch all applications submitted by a freelancer.
 */
export const getFreelancerApplications = async (freelancerId) => {
  const q = query(
    collection(db, "applications"),
    where("freelancerId", "==", freelancerId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Accept an application — updates its status and rejects all others
 * for the same job, then closes the job.
 */
export const acceptApplication = async (applicationId, jobId) => {
  // Mark chosen application as accepted.
  await updateDoc(doc(db, "applications", applicationId), {
    status: "accepted",
  });

  // Reject the remaining pending applications for this job.
  const q = query(
    collection(db, "applications"),
    where("jobId", "==", jobId),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);

  const rejectPromises = snapshot.docs
    .filter((d) => d.id !== applicationId)
    .map((d) => updateDoc(d.ref, { status: "rejected" }));

  await Promise.all(rejectPromises);

  // Close the job so it no longer appears in the open listings.
  await closeJob(jobId);
};

/**
 * Reject a single application.
 */
export const rejectApplication = async (applicationId) => {
  await updateDoc(doc(db, "applications", applicationId), {
    status: "rejected",
  });
};