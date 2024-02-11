import { User } from '@shelby/supabase';

export interface AuthUser extends Omit<User, 'id'> {
  sub: string;
}
