import { RentalStatus } from '@/shared/model/enumerations/rental-status.model';
export interface IRental {
  id?: number;
  userId?: number | null;
  rentalStatus?: RentalStatus | null;
}

export class Rental implements IRental {
  constructor(public id?: number, public userId?: number | null, public rentalStatus?: RentalStatus | null) {}
}
