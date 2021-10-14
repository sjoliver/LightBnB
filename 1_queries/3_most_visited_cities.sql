SELECT
  city,
  count(reservations.*) AS total_reservations
FROM
  properties
  JOIN reservations ON properties.id = property_id
GROUP BY
  city
ORDER BY 
  count(reservations.*) DESC;