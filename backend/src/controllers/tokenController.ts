// src/controllers/tokenController.ts
import { db } from "../firebase";

export const createToken = async (req, res) => {
  try {
    const tokenData = req.body;
    await db.collection("tokens").add(tokenData);
    res.status(200).json({ message: "Token creado" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear token" });
  }
};
