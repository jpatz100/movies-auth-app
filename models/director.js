const db = require('../db/config');

const Director = {};

Director.findAll = () => {
  return db.query('SELECT * FROM directors ORDER BY id ASC');
};

Director.findById = id => {
  return db.oneOrNone(`SELECT * FROM directors WHERE id = $1`, [id]);
};

Director.update = (director, id) => {
  return db.none(
    `
    UPDATE directors SET
    last_name = $1,
    first_name = $2
    WHERE id = $3
    `,
    [director.first_name, director.last_name, id]
  );
};

Director.create = director => {
  return db.one(
    `
    INSERT INTO directors
    (first_name, last_name)
    VALUES ($1, $2) RETURNING *
    `,
    [director.first_name, director.last_name]
  );
};

Director.destroy = id => {
  return db.none(
    `
    DELETE FROM directors
    WHERE id = $1
    `,
    [id]
  );
};

module.exports = Director;