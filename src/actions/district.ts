import sql from "@/lib/db/postgre";
import { District } from "@/types/District";

export default async function getDistricts() {
    const districts = await sql`SELECT * FROM districts` as District[];
    return districts;
}