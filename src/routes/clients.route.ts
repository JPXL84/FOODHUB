import { Router } from "express";
import { apiResponse } from "../utils/apiResponses";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from "../bootstrap/clientRepository";

const router = Router();

// READ ALL
router.get("/clients", (req, res) => {
  res.json(apiResponse(getAllClients(), "Clients loaded"));
});

// READ ONE
router.get("/clients/:id", (req, res) => {
  const client = getClientById(req.params.id);
  if (!client) throw new Error("Client not found");
  res.json(apiResponse(client, "Client loaded"));
});

// CREATE
router.post("/clients", (req, res) => {
  const client = createClient(req.body);
  res.json(apiResponse(client, "Client created"));
});

// UPDATE
router.put("/clients/:id", (req, res) => {
  const client = updateClient(req.params.id, req.body);
  res.json(apiResponse(client, "Client updated"));
});

// DELETE
router.delete("/clients/:id", (req, res) => {
  deleteClient(req.params.id);
  res.json(apiResponse(null, "Client deleted"));
});

export default router;
