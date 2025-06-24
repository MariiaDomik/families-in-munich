import { EventParticipant } from "./User";

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    img_url?: string;
    participants: EventParticipant[];
    creator: EventParticipant;
    latitude?: number;
    longitude?: number;
    created_at?: string;
    time?: string;
  }