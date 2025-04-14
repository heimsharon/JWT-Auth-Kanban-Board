// Path: server/src/types/express/index.d.ts
// This file is used to extend the Express Request interface

declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
