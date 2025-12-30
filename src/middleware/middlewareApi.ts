import { check, oneOf, validationResult, body } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";


// DEPRECATED! I THINK..

// Validation middleware
// --------------------------
function initValidation(validations: any[]) {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    // Collect all error messages
    const err = errors.array().map((e) => e.msg);

    // Throw a single error with all messages
    throw new Error(err.join(", "));
  };
}

// Method wrappers
// These are now just helpers to create middleware for specific HTTP methods
// Usage inside createRouter().use() or router.METHOD()
const post = (middleware: any) => middleware;
const put = (middleware: any) => middleware;
const patch = (middleware: any) => middleware;
const get = (middleware: any) => middleware;
const del = (middleware: any) => middleware;

// Exports
export { patch, put, post, get, del, initValidation, check, oneOf, body };