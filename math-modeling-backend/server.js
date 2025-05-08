const express = require('Express'); /* Framework for building the node.js server */
const mysql = require('mysql2'); /* driver for connecting to a mysql database */
const cors = require('cors'); /* middleware to allow requests from other origins */

const app = express();
const PORT = 3000;

app.use(cors());

/* this declares the database as a useable variable for the connection function*/
const db = mysql.createConnection({
  host: 'localhost',
  port: 4040,
  user: 'root',
  password: 'mysql',
  database: 'math_modeling_paper',
});

/* attempts a connection to the mysql databse, returning an error if it fails */
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Different get paper function?
app.get('/api/paper', (req, res) => { // Not needed?
    const sql = `
        SELECT 
            p.team_control_num, 
            p.title, 
            p.year, 
            p.problem_type, 
            p.link,
            GROUP_CONCAT(pk.keyword_text) AS keywords
        FROM paper p
        LEFT JOIN paper_keyword pk ON p.team_control_num = pk.team_control_num
        GROUP BY p.team_control_num
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Way to check results? Idk
        console.log(results);

        const formattedResults = results.map(row => ({
            team_control_num: row.team_control_num,
            title: row.title,
            year: row.year,
            problem_type: row.problem_type,
            link: row.link,
            keywords: row.keywords ? row.keywords.split(',') : []
        }));

        res.json(formattedResults);
    });
});

app.get('/api/keyword', (req, res) => {
    db.query('SELECT * FROM keyword', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/api/result/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    let { year, problem_type } = req.query;

    // Normalize to arrays if only one item
    year = year ? (Array.isArray(year) ? year : [year]) : [];
    problem_type = problem_type ? (Array.isArray(problem_type) ? problem_type : [problem_type]) : [];

    let sql = `
        SELECT 
            p.title,
            p.team_control_num,
            p.link AS paper_link,
            p.year,
            p.problem_type,
            pr.problem_title,
            pr.link AS problem_link,
            GROUP_CONCAT(pk.keyword_text ORDER BY pk.keyword_text SEPARATOR ', ') AS keywords
        FROM paper_keyword pk
        JOIN paper p ON pk.team_control_num = p.team_control_num
        JOIN problem pr ON p.year = pr.year AND p.problem_type = pr.problem_type
        WHERE p.team_control_num IN (
            SELECT team_control_num
            FROM paper_keyword
            WHERE keyword_text LIKE ?
        )
    `;

    const values = [`%${keyword}%`];

    // Add year filter
    if (year.length > 0) {
        sql += ` AND p.year IN (${year.map(() => '?').join(',')})`;
        values.push(...year);
    }

    // Add problem_type filter
    if (problem_type.length > 0) {
        sql += ` AND p.problem_type IN (${problem_type.map(() => '?').join(',')})`;
        values.push(...problem_type);
    }

    sql += ` GROUP BY p.team_control_num`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

/* this starts the server, and hopefully means our js file in the frontend can call for data from the db :D */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

