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
    userType VARCHAR(10) NOT NULL CHECK(userType IN ('Paciente', 'Supervisor', 'Terapeuta')) DEFAULT 'Paciente',
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
    gender VARCHAR(4) NOT NULL CHECK( gender =' niño' OR gender = 'niña') ,
    leftHearingAid VARCHAR(50) NOT NULL,
    rightHearingAid VARCHAR(50) NOT NULL,
    age INT NOT NULL CHECK( age > 0 AND age <= 16 ),
    documentType VARCHAR(20) NOT NULL CHECK( documentType IN ('Registro Civil', 'Tarjeta de Identidad', 'Otro')),
    docNum VARCHAR(25) UNIQUE NOT NULL,
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

-- -------------------- SECTION QUESTIONS -----------------

-- IMAGE TABLE

CREATE TABLE IMAGE (
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(200) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

\! echo "TABLE: IMAGE";
DESCRIBE IMAGE;
\! echo "\n";

-- CARD TABLE

CREATE TABLE CARD (
    id INT NOT NULL AUTO_INCREMENT,
    label VARCHAR(100),
    id_image INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_image) REFERENCES IMAGE(id)
);

\! echo "TABLE: CARD";
DESCRIBE CARD;
\! echo "\n";

-- QUESTIONS

CREATE TABLE QUESTION (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    type INT NOT NULL,
    PRIMARY KEY (id)
);

\! echo "TABLE: QUESTION";
DESCRIBE QUESTION;
\! echo "\n";

-- ---------------------- SECTION TEST -------------------------

-- TEST

CREATE TABLE TEST (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

\! echo "TABLE: TEST";
DESCRIBE TEST;
\! echo "\n";

CREATE TABLE TEST_QUESTION (
    id INT NOT NULL AUTO_INCREMENT, 
    idTest INT NOT NULL, 
    idQuestion INT,
    questionOrder INT,
    PRIMARY KEY (id),
    FOREIGN KEY (idTest) REFERENCES TEST(id),
    FOREIGN KEY (idQuestion) REFERENCES QUESTION(id)
);

\! echo "TABLE: TEST_QUESTION";
DESCRIBE TEST_QUESTION;
\! echo "\n";

-- -------------------- SECTION THERAPHY -----------------------

CREATE TABLE THERAPY (
    id INT NOT NULL AUTO_INCREMENT,
    videoConference VARCHAR(200),
    dateTheraphy DATE NOT NULL,
    idTherapist_User INT NOT NULL,
    idTest INT,
    PRIMARY KEY (id),
    FOREIGN KEY (idTherapist_User) REFERENCES THERAPIST_USER(id),
    FOREIGN KEY (idTest) REFERENCES TEST(id)
);

\! echo "TABLE: THERAPY";
DESCRIBE THERAPY;
\! echo "\n";

-- ------------------------ DEFAULT DATA -----------------------

\! echo "SHOW DATA DEFAULT\n\n";

-- USER

INSERT INTO USER_TABLE (id, fullname, email, passwd, userType)
VALUES (1, 'Juan Sebastian Reyes Leyton', 'sebas.reyes2002@hotmail.com', 'Epyphone01', 'Supervisor');

INSERT INTO USER_TABLE (id, fullname, email, passwd, userType)
VALUES (2, 'Pepito Perez', 'juaninreyes2002@hotmail.com', 'Epyphone01', 'Terapeuta');

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

INSERT INTO PATIENT (id, gender, leftHearingAid, rightHearingAid, age, docNum, documentType)
VALUES (3, 'niña', 'Implante Coclear', 'Audifono', 5, '1006147589', 'Tarjeta de Identidad');

\! echo "TABLE: PATIENT";
SELECT * FROM PATIENT;
\! echo "\n";

-- RELATION BETWEEN PATIENT AND THERAPIST

INSERT INTO THERAPIST_USER (idPatient, idTherapist)
VALUES (3, 2);

SELECT * FROM USER_TABLE 
INNER JOIN PATIENT ON USER_TABLE.id = PATIENT.id;

\! echo "\n";

-- TESTS

INSERT INTO TEST (name)
VALUES ('Apira');

INSERT INTO TEST (name)
VALUES ('Prueba 1');

INSERT INTO TEST (name)
VALUES ('Prueba 2');

\! echo "TABLE: TEST";
SELECT * FROM TEST;
\! echo "\n";
