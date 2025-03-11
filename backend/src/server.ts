// src/server.ts
import express from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(express.json());
app.use("/api", tokenRoutes, kycRoutes);
