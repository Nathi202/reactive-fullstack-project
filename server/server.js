const express       = require('express');
const cors          = require('cors');
const app           = express();
const pool          = require('./dbconfig');

const PORT          = 9000;
const BASE_PATH     = '/api/v1/addresses';
const ADDRESS_BY_ID = `${BASE_PATH}/:id`;

app.use(cors());
app.use(express.json());

app.post(BASE_PATH, async (req, res) => {
  try {
    const {street_number,street_name,suburb,city,province_iso,country_iso,code} = req.body;
    const newAddress = await pool.query(
        "INSERT INTO address (street_number,street_name,suburb,city,province_iso,country_iso,code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [street_number,street_name,suburb,city,province_iso,country_iso,code]
    );
    res.json(newAddress.rows[0]);

  } catch (e) {
    console.error(e.message);
  }
});


app.get(BASE_PATH, async (req, res) => {
  try {
    const {street_number,street_name,suburb,city,province_iso,country_iso,code} = req.body;
    const getFullAddresses = await pool.query(
        "SELECT street_number,street_name,suburb,city,province_iso,country_iso,code,CONCAT(street_number, ' ',street_name, ', ',suburb, ', ',city, ', ',code, '') as full_address FROM address"
    );
    res.json(getFullAddresses.rows);

  } catch (e) {
    console.error(e.message);
  }
});
app.get(ADDRESS_BY_ID, async (req, res) => {
  try {
    const {id} = req.params;
    const {street_number,street_name,suburb,city,province_iso,country_iso,code} = req.body;
    const getAddressById = await pool.query(
        "SELECT street_number,street_name,suburb,city,province_iso,country_iso,code,CONCAT(street_number, ' ',street_name, ', ',suburb, ', ',city, ', ',code, '') as full_address FROM address WHERE address_id = $1",
        [id]
    );
    res.json(getAddressById.rows[0]);

  } catch (e) {
    console.error(e.message);
  }
});


app.put(ADDRESS_BY_ID, async (req, res) => {
  try {
    const {id} = req.params;
    const {street_number,street_name,suburb,city,province_iso,country_iso,code} = req.body;
    const updateAddress = await pool.query(
        "UPDATE address SET (street_number,street_name,suburb,city,province_iso,country_iso,code) = ($1,$2,$3,$4,$5,$6,$7) WHERE address_id = $8",
        [street_number,street_name,suburb,city,province_iso,country_iso,code,id]
    );
    res.json(updateAddress.rows[0]);

  } catch (e) {
    console.error(e.message);
  }
});


app.delete(ADDRESS_BY_ID, async (req, res) => {
  try {
    const {id} = req.params;
    const deleteAddress = await pool.query(
        "DELETE FROM address WHERE address_id = $1",
        [id]
    );
    res.json('Address has been deleted!');

  } catch (e) {
    console.error(e.message);
  }
});

app.listen(PORT, () => console.log('Server is running on port: ', PORT));
