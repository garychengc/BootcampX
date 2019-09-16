SELECT day, COUNT(assignments) AS tota_assignments
FROM assignments
GROUP BY day
ORDER BY day;