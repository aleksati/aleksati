import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

export const commonApiHandlers = createRouter<
  NextApiRequest,
  NextApiResponse
>()
  .handler({
    onError(error, req, res) {
      res
        .status(501)
        .json({ error: `Sorry, something happened! ${error}` });
    },
    onNoMatch(req, res) {
      res
        .status(404)
        .json({ error: `Method ${req.method} Not Allowed` });
    },
  });