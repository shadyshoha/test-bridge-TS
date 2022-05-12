import { Routes } from "./Routes";
import cors from "cors";
import { createExpressMiddleware, RoutesToSDK, onError } from "bridgets";
import express from "express";

const { log } = console;

const errorHandler = onError(({ error, path, req, mdlwData }) => {
  console.log(error);
  if (error.name === "Internal server error") console.log("Pass error to sentry");
});

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(cors());

app.use("/bridgets", createExpressMiddleware(Routes, errorHandler));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("", (req, res) => {
  res.send("Root not found");
});

app.listen(8081, () => {
  log("Listen on port 8081");
});

export type SDKTypes = RoutesToSDK<typeof Routes>;
