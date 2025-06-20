import { pool } from './postgre'

export async function getUserByEmail(email: string) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return rows[0] || null
}

export async function createUser({ email, passwordHash, name }: {
  email: string,
  passwordHash: string,
  name?: string
}) {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
    [email, passwordHash, name]
  )
  return rows[0]
}
