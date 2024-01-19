import { OmitType } from '@nestjs/mapped-types';
import { JobEntity } from '../entities/job.entity';

export class CreateJobDto extends OmitType(JobEntity, ['id', 'created_at', 'updated_at']) {}
