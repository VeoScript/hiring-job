import { Job as JobModel } from '@prisma/client';

export class JobEntity implements JobModel {
  id: string;
  title: string;
  description: string;
  company_details: string;
  created_at: Date;
  updated_at: Date;
  userId: string;
}
