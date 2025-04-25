USE math_modeling_paper; -- Do this whenever you create a new sql file

-- Create the database tables
CREATE TABLE problem (
    year SMALLINT UNSIGNED NOT NULL,
    problem_type CHAR(1) NOT NULL,
    problem_title VARCHAR(200),
    link VARCHAR(200),
    PRIMARY KEY (year, problem_type)
);

CREATE TABLE paper (
    team_control_num INT UNSIGNED NOT NULL,
    title VARCHAR(200),
    year SMALLINT UNSIGNED NOT NULL,
    problem_type CHAR(1) NOT NULL,
    link VARCHAR(200),
    PRIMARY KEY (team_control_num),
    FOREIGN KEY (year, problem_type) REFERENCES problem(year, problem_type)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE keyword (
    keyword_text VARCHAR(100) NOT NULL,
    PRIMARY KEY(keyword_text)
);

CREATE TABLE paper_keyword (
    team_control_num INT UNSIGNED NOT NULL,
    keyword_text VARCHAR(100) NOT NULL,
    PRIMARY KEY (team_control_num, keyword_text),
    FOREIGN KEY (team_control_num) REFERENCES paper(team_control_num)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (keyword_text) REFERENCES keyword(keyword_text)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Load the data into the tables
LOAD DATA INFILE  '/var/lib/mysql-files/problem_table.csv'
INTO TABLE problem
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE  '/var/lib/mysql-files/paper_table.csv'
INTO TABLE paper
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE  '/var/lib/mysql-files/keyword_table.csv'
INTO TABLE keyword
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(keyword_text);

LOAD DATA INFILE  '/var/lib/mysql-files/paper_keyword_table.csv'
INTO TABLE paper_keyword
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;