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

/* these blocks are for retrieving the data from the four tables and putting
 * them in json files so the frontend can use the data */
app.get('/problem', (req, res) => {
    db.query('SELECT * FROM problem', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


/*
app.get('/paper', (req, res) => {
    db.query('SELECT * FROM paper', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

*/

// Different get paper function?
app.get('/paper', (req, res) => {
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

app.get('/keyword', (req, res) => {
    db.query('SELECT * FROM keyword', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/paper_keyword', (req, res) => {
    db.query('SELECT * FROM paper_keyword', (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        
        // Way to check results? Idk
        console.log(results);

        res.json(results);
    });
});

/* this starts the server, and hopefully means our js file in the frontend can call for data from the db :D */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

