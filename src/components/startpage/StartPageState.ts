import { ChildSimple } from '@/types/Child';
import { District } from '@/types/District';

export interface StartPageState {
  district: District | null;
  children: ChildSimple[];
}