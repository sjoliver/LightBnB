SELECT
  properties.id as id,
  properties.title as title, 
  reservations.start_date as start_date,
  properties.cost_per_night as cost_per_night,
  avg(rating) AS average_rating
FROM
  reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
WHERE
  reservations.guest_id = 1
  AND reservations.end_date < now()::date
GROUP BY
  properties.id, reservations.id
ORDER BY
  start_date
LIMIT
  10;