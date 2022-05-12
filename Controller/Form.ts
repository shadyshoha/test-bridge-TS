import { Controller, apply, createMiddleware } from "bridgets";
import { z } from "zod";
import { Db } from "../Database";

const consoleMethod = createMiddleware((req) => console.log("method: ", req.method));

export class Form extends Controller {
  createRecord = this.createEndpoint({
    body: z.object({
      firstname: z.string().min(5).max(100),
      lastname: z.string().min(5).max(100),
      email: z.string().email(),
      message: z.string().min(10).max(500),
    }),
    middlewares: apply(consoleMethod),
    handler: ({ body }) => {
      console.log(body);
      return body;
    },
  });

  uploadFile = this.createEndpoint({
    files: apply("file"),
    handler: ({ files }) => {
      console.log("Upload file handler");
      console.log(files.file.filepath);
      return new Db().uploadFile(files.file);
    },
  });
}
