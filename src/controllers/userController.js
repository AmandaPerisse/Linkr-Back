import bcrypt from 'bcrypt';
import { connection } from '../database.js';

export async function postUser(req, res) {
  const user = req.body;

  try {
    const isThereUser = await connection.query('SELECT * FROM users WHERE email=$1', [user.email])
    if (isThereUser.rowCount !== 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);
    await connection.query(`
      INSERT INTO 
        users ("name", email, password, "pictureUrl") 
      VALUES ($1, $2, $3, $4)
    `, [user.name, user.email, passwordHash, user.pictureUrl])

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function searchUser(req, res) {
  
  const { search } = req.body;
  try {
    console.log(search);
    let result = await connection.query(
      `
      SELECT * FROM users WHERE name ILIKE $1
      `,
      [`${search}%`] 
    );

    console.log('#1');
    console.log(result.rows)

    if (result.rowsCount === 0) return res.send([]);  
    res.send(result.rows);
    
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getAllUsers(req, res) {

  try {
    let result = await connection.query(
      `
      SELECT * FROM users
      `
    );

    if (result.rowsCount === 0) return res.send([]);  
    res.send(result.rows);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserId(req, res) {

  const id = req.params.id;

  try {
    let result = await connection.query(
      `
      SELECT * FROM users WHERE id = $1
      `
    , [id]);

    if (result.rowsCount === 0) return res.send([]);  
    res.send(result.rows);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}