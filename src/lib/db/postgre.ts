"use server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.POSTGRE_URL as string);

export default sql;
