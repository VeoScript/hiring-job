import { OmitType } from '@nestjs/mapped-types';
import { AppliedJobEntity } from '../entities/apply.entity';

export class AppliedJobDto extends OmitType(AppliedJobEntity, ['id', 'created_at', 'updated_at']) {}
