-- JUST WHILE THE DATABASE IS DEVELOPMENT

DROP DATABASE IF EXISTS SITEFODI;

-- CREATE DATABASE SITEFODI

CREATE DATABASE IF NOT EXISTS SITEFODI;

-- USE DATABASE SITEFODI

USE SITEFODI;

-- USER

CREATE TABLE USER_TABLE (
    id INT NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    passwd VARCHAR(20) NOT NULL,
    isRoot BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

\! echo "TABLE: USER_TABLE";
DESCRIBE USER_TABLE;
\! echo "\n";

-- THERAPIST

CREATE TABLE THERAPIST (
    id INT NOT NULL,
    cc VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES USER_TABLE(id)
);

\! echo "TABLE: THERAPIST";
DESCRIBE THERAPIST;
\! echo "\n";

-- PATIENT

CREATE TABLE PATIENT (
    id INT NOT NULL,
    gender VARCHAR(4) NOT NULL,
    leftImplant VARCHAR(50) NOT NULL,
    rightImplant VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    ti VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES USER_TABLE(id)
);

\! echo "TABLE: PATIENT";
DESCRIBE PATIENT;
\! echo "\n";

-- RELATION BETWEEN PATIENT AND THERAPIST

CREATE TABLE THERAPIST_USER (
    id INT NOT NULL AUTO_INCREMENT,
    idPatient INT NOT NULL,
    idTherapist INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idPatient) REFERENCES PATIENT(id),
    FOREIGN KEY (idTherapist) REFERENCES THERAPIST(id)
);

\! echo "TABLE: THERAPIST_USER";
DESCRIBE THERAPIST_USER;
\! echo "\n";

-- ------------------ DEFAULT DATA

\! echo "SHOW DATA DEFAULT\n\n";

-- USER

INSERT INTO USER_TABLE (id, fullname, email, passwd, isRoot)
VALUES (1, 'Juan Sebastian Reyes Leyton', 'sebas.reyes2002@hotmail.com', 'Epyphone01', true);

INSERT INTO USER_TABLE (id, fullname, email, passwd)
VALUES (2, 'Pepito Perez', 'juaninreyes2002@hotmail.com', 'Epyphone01');

INSERT INTO USER_TABLE (id, fullname, email, passwd)
VALUES (3, 'Vanessa Loaiza', 'vane.loaiza@hotmail.com', 'bebe1');

\! echo "TABLE: USER_TABLE";
SELECT * FROM USER_TABLE;
\! echo "\n";

-- THERAPIST

INSERT INTO THERAPIST (id, cc)
VALUES (1, '1006123571');

INSERT INTO THERAPIST (id, cc)
VALUES (2, '1234567890');

\! echo "TABLE: THERAPIST";
SELECT * FROM THERAPIST;
\! echo "\n";

-- PATIENT

INSERT INTO PATIENT (id, gender, leftImplant, rightImplant, age, ti)
VALUES (3, 'niña', 'implante coclear', 'audifono', 5, '1006147589');

\! echo "TABLE: PATIENT";
SELECT * FROM PATIENT;
\! echo "\n";


SELECT * FROM USER_TABLE 
INNER JOIN PATIENT ON USER_TABLE.id = PATIENT.id;