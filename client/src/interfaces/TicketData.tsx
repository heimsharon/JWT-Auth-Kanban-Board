// Path: client/src/interfaces/TicketData.tsx
// This file is used to define the TicketData interface

import { UserData } from './UserData';

export interface TicketData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
}
