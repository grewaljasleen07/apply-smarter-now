import { mockActivity, mockAnalyses, mockApplications, mockNotifications, mockResumes, mockUser } from "@/mock/data";
import { ok } from "./apiClient";
import type { ActivityItem, Notification, User } from "@/types";

export const profileService = {
  async get(): Promise<User> {
    return ok(mockUser, 300);
  },

  async stats() {
    return ok(
      {
        resumes: mockResumes.length,
        analyses: mockAnalyses.length,
        applications: mockApplications.length,
        interviews: mockApplications.filter((a) => a.status === "Interview").length,
        offers: mockApplications.filter((a) => a.status === "Offer").length,
        averageMatch: Math.round(
          mockAnalyses.reduce((sum, a) => sum + a.matchScore, 0) / mockAnalyses.length,
        ),
        resumeHealth: 82,
      },
      300,
    );
  },

  async activity(): Promise<ActivityItem[]> {
    return ok(mockActivity, 300);
  },
};

export const notificationService = {
  async list(): Promise<Notification[]> {
    return ok(mockNotifications, 250);
  },
};
