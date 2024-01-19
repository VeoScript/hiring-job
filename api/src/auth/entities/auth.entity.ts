import { $Enums, User as UserModel } from '@prisma/client';

export class AuthEntity implements UserModel {
  id: string;
  account_type: $Enums.AccountType;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
