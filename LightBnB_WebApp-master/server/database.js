const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => {
      if (response.rows[0] === undefined) {
        return null
      }
      return response.rows[0]
    })
    .catch((error) => console.log(error.message))

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE users.id = $1`, [id])
    .then((response) => {
      if (response.rows[0] === undefined) {
        return null
      }
      return response.rows[0]
    })
    .catch((error) => console.log(error.message))

  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((response) => {
      return response.rows[0]
    })
    .catch((error) => console.log(error.message))

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(`SELECT
    properties.*, 
    reservations.*,
    avg(rating) AS average_rating
  FROM
    reservations
    JOIN properties ON properties.id = property_id
    JOIN property_reviews ON reservations.id = reservation_id
  WHERE
    reservations.guest_id = $1
    AND reservations.end_date < now()::date
  GROUP BY
    properties.id, reservations.id
  ORDER BY
    start_date
  LIMIT
    $2;`, [guest_id, limit])
    .then((response) => response.rows)
    .catch((err) => console.log("ERROR:", err.message));

  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // array to hold any parameters that may be available for the query
  const queryParams = [];

  // Start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.owner_id) {
    queryParams.push(options.owner_id); // The % syntax for the LIKE clause must be part of the parameter, not the query.
    queryString += `WHERE owner_id = $${queryParams.length}` // use the length of the array to dynamically get the $n placeholder number
  }

  // Check if a city has been passed in as an option. 
  // Add the city to the params array and create a WHERE clause for the city.
  if (options.city) {
    queryParams.push(`%${options.city}%`); // The % syntax for the LIKE clause must be part of the parameter, not the query.
    if (queryParams.length > 0) {
      queryString += ` AND city LIKE $${queryParams.length}`
    } else {
      queryString += `WHERE city LIKE $${queryParams.length}` // use the length of the array to dynamically get the $n placeholder number
    }
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100); // The % syntax for the LIKE clause must be part of the parameter, not the query.
    if (queryParams.length > 0) {
      queryString += ` AND cost_per_night >= $${queryParams.length}`
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length}`
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100); // The % syntax for the LIKE clause must be part of the parameter, not the query.
    if (queryParams.length > 0) {
      queryString += ` AND cost_per_night <= $${queryParams.length}`
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length}`
    }
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating); // The % syntax for the LIKE clause must be part of the parameter, not the query.
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`
  }

  // Add any query that comes after the WHERE clause
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => console.log("ERROR:", err.message));
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool
    .query(`INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms,
      country,
      street,
      city,
      province,
      post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`, [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.country,
      property.street,
      property.city,
      property.province,
      property.post_code])
    .then((response) => {
      return response.rows[0]
    })
    .catch((error) => console.log(error.message))

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;