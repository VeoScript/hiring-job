import { $Enums, AppliedJob as AppliedJobModel } from '@prisma/client';

export class AppliedJobEntity implements AppliedJobModel {
  id: string;
  status: $Enums.ApplicationStatus;
  created_at: Date;
  updated_at: Date;
  userId: string;
  jobId: string;
}
