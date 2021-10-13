INSERT INTO
  users (name, email, PASSWORD)
VALUES
  (
    'Sophie',
    'sophie@hot-chick.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  users (name, email, PASSWORD)
VALUES
  (
    'Russell',
    'hussle-russel@slow-poke.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  users (name, email, PASSWORD)
VALUES
  (
    'Katie',
    'katie@cute-chick.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  properties (
    id,
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
    post_code
  )
VALUES
  (
    1,
    1,
    'Waterfront Cabin',
    'description',
    'https://loveincorporated.blob.core.windows.net/contentimages/gallery/baf96f8b-2976-4e04-8f84-df90b339ec42-lacuna-beach-california-beach-front-home.jpg',
    'https://loveincorporated.blob.core.windows.net/contentimages/gallery/aa599f19-9e50-4874-9bfa-b8291705ac30-lacuna-beach-california-beach-front-home-exterior.jpg',
    200,
    4,
    3,
    4,
    'Canada',
    'Point Grey Rd',
    'West Vancouver',
    'BC',
    'V6S 1B9'
  );

INSERT INTO
  properties (
    id,
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
    post_code
  )
VALUES
  (
    2,
    2,
    'Mountain Views Chalet',
    'description',
    'https://i1.wp.com/skiingbc.com/wp-content/uploads/Chalet-Whistler-Peak-Ext.png?ssl=1',
    'https://www.idesignarch.com/wp-content/uploads/Luxury-Whistler-Cedar-Log-and-Stone-Alpine-Home_3.jpg',
    250,
    3,
    3,
    4,
    'Canada',
    'Blueberry Lane',
    'Whistler',
    'BC',
    'V6S 1B9'
  );

INSERT INTO
  properties (
    id,
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
    post_code
  )
VALUES
  (
    3,
    3,
    'Modern Castle with Private Lake',
    'description',
    'https://www.jamesedition.com/stories/wp-content/uploads/2020/05/4.png',
    'https://www.jamesedition.com/stories/wp-content/uploads/2020/05/1-1.png',
    1000,
    10,
    6,
    10,
    'Canada',
    'Castle Ln',
    'Narnia',
    'BC',
    'V6S 1B9'
  );

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2021-10-02', '2021-10-12', 1, 2);

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2021-10-02', '2021-10-12', 2, 3);

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2021-10-02', '2021-10-12', 3, 1);

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (2, 1, 1, 10, 'message');

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (3, 2, 2, 10, 'message');

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (1, 3, 3, 10, 'message');