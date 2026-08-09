import { useQuery } from "@tanstack/react-query";
import { resumeService } from "@/services/resumeService";
import { analysisService } from "@/services/analysisService";
import { applicationService } from "@/services/applicationService";
import { notificationService, profileService } from "@/services/profileService";

export const resumesQuery = { queryKey: ["resumes"], queryFn: () => resumeService.list() };
export const analysesQuery = { queryKey: ["analyses"], queryFn: () => analysisService.list() };
export const applicationsQuery = {
  queryKey: ["applications"],
  queryFn: () => applicationService.list(),
};
export const statsQuery = { queryKey: ["stats"], queryFn: () => profileService.stats() };
export const activityQuery = { queryKey: ["activity"], queryFn: () => profileService.activity() };
export const notificationsQuery = {
  queryKey: ["notifications"],
  queryFn: () => notificationService.list(),
};

export const useResumes = () => useQuery(resumesQuery);
export const useAnalyses = () => useQuery(analysesQuery);
export const useApplications = () => useQuery(applicationsQuery);
export const useStats = () => useQuery(statsQuery);
export const useActivity = () => useQuery(activityQuery);
export const useNotifications = () => useQuery(notificationsQuery);
export const useResume = (id: string) =>
  useQuery({ queryKey: ["resume", id], queryFn: () => resumeService.get(id) });
