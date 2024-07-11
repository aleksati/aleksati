import { check, oneOf, validationResult, body } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

// validates the incoming request before it's procced by the API
function initValidation(validations: any) {
  return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const err = [];
    errors.array().map((error) => err.push(error.msg));
    throw new Error(...err);
  };
}

// to use inside nextConnect().use() functions in the API
// to use inside nextConnect().use() functions in the API
const patch = (middleware: any) => {
  return nextConnect().patch(middleware);
};

const put = (middleware: any) => {
  return nextConnect().put(middleware);
};

const post = (middleware: any) => {
  return nextConnect().post(middleware);
};

const get = (middleware: any) => {
  return nextConnect().get(middleware);
};

const del = (middleware: any) => {
  return nextConnect().delete(middleware);
};

export { patch, put, post, get, del, initValidation, check, oneOf, body };
