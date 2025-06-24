import sql from "@/lib/db/postgre";
import { Event } from "@/types/Event";

export async function getAllEvents(): Promise<Event[]> {
  const events = await sql`SELECT 
  e.id,
  e.title,
  e.description,
  e.date,
  e.latitude,
  e.longitude,
  e.created_at,
  e.time,
  e.img_url,
  jsonb_build_object('id', creator.id, 'name', creator.name, 'avatar_url', creator.avatar_url) AS creator,
  ARRAY_AGG(DISTINCT jsonb_build_object('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url)) AS participants
FROM 
  events e
LEFT JOIN 
  users creator ON e.creator_id = creator.id
LEFT JOIN 
  event_participants ep ON e.id = ep.event_id
LEFT JOIN 
  users u ON ep.user_id = u.id
GROUP BY 
  e.id, creator.id, creator.name, creator.avatar_url` as Event[];
  return events;
}

export async function getEventById(id: string): Promise<Event | null> {
  const [event] = await sql`SELECT 
    e.id AS event_id,
    e.title,
    e.description,
    e.date,
    e.latitude,
    e.longitude,
    e.created_at,
    e.time,
    e.img_url,
    jsonb_build_object('id', creator.id, 'name', creator.name, 'avatar_url', creator.avatar_url) AS creator,
    ARRAY_AGG(DISTINCT jsonb_build_object('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url)) AS participants
  FROM 
    events e
  LEFT JOIN 
    users creator ON e.creator_id = creator.id
  LEFT JOIN 
    event_participants ep ON e.id = ep.event_id
  LEFT JOIN 
    users u ON ep.user_id = u.id
  WHERE e.id = ${id}
  GROUP BY 
    e.id, creator.id, creator.name, creator.avatar_url` as Event[];
  return event || null;
}