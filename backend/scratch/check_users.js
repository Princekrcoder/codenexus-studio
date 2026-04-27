import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkUsers() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    const res = await client.query('SELECT id, name, email, role, password FROM users');
    console.log('Users in database:');
    console.table(res.rows);
    
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await client.end();
  }
}

checkUsers();
