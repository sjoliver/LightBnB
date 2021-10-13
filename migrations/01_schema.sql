DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS properties CASCADE;

DROP TABLE IF EXISTS reservations CASCADE;

DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar(255),
  email varchar(255),
  PASSWORD varchar(255)
);

CREATE TABLE properties (
  id serial PRIMARY KEY NOT NULL,
  owner_id integer REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255),
  description text,
  thumbnail_photo_url varchar(255),
  cover_photo_url varchar(255),
  cost_per_night integer,
  parking_spaces integer,
  number_of_bathrooms integer,
  number_of_bedrooms integer,
  country varchar(255),
  street varchar(255),
  city varchar(255),
  province varchar(255),
  post_code varchar(255),
  active boolean
);

CREATE TABLE reservations (
  id serial PRIMARY KEY NOT NULL,
  start_date DATE,
  end_date date,
  property_id integer REFERENCES properties(id) ON DELETE CASCADE,
  guest_id integer REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews (
  id serial PRIMARY KEY NOT NULL,
  guest_id integer REFERENCES users(id) ON DELETE CASCADE,
  property_id integer REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id integer REFERENCES reservations(id) ON DELETE CASCADE,
  rating SMALLINT,
  message text
);