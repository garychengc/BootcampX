const input = process.argv.slice(2);

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const cohortName = input[0];
const limitNum = input[1] || 5;
const values = [`%${cohortName}%`, limitNum];
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    })
  .catch(error => console.error(error.stack));
});
