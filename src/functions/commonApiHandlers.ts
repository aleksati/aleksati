import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export const commonApiHandlers = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: `Method ${req.method} Not Allowed` });
  },
});
