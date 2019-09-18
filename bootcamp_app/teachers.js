const input = process.argv.slice(2);

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const cohortName = input[0];
const values = [`%${input[0]}%`];
const queryString = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests 
    JOIN teachers ON assistance_requests.teacher_id = teachers.id
    JOIN students ON assistance_requests.student_id = students.id
    JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1;
  ORDER BY teachers.name;
  `;

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach ((data) => {
      console.log(`${data.cohort}: ${data.teacher}`);
    })
  .catch(error => console.error(error));
  });
