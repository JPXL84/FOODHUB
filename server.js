import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;


const dataPath = path.resolve("./data.json");
const restaurants = JSON.parse(fs.readFileSync(dataPath, "utf-8"));


app.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    restaurants: restaurants.length,
    timestamp: new Date().toISOString()
  });
});


app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});


app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(restaurant);
});

app.get("/restaurants-open", (req, res) => {
  const open = restaurants.filter(r => r.status.is_open);
  res.json(open);
});


app.get("/restaurants/town/:town", (req, res) => {
  const town = req.params.town.toLowerCase();
  const results = restaurants.filter(
    r => r.location.town.toLowerCase() === town
  );

  res.json(results);
});

app.get("/restaurants/cuisine/:cuisine", (req, res) => {
  const cuisine = req.params.cuisine.toLowerCase();
  const results = restaurants.filter(r =>
    r.cuisines.some(c => c.toLowerCase() === cuisine)
  );

  res.json(results);
});


app.get("/restaurants/nearby", (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "lat and lng query params are required"
    });
  }

  const userLat = Number(lat);
  const userLng = Number(lng);

  const withDistance = restaurants.map(r => {
    const distance_km = haversineDistance(
      userLat,
      userLng,
      r.location.lat,
      r.location.lng
    );

    return {
      ...r,
      distance_km: Number(distance_km.toFixed(2))
    };
  });

  withDistance.sort((a, b) => a.distance_km - b.distance_km);

  res.json(withDistance);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
