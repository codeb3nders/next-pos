import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../constants";
import { responseHandler } from "../utils/response.utils";
import { NextRequest } from "next/server";

export class QueryService<E> {
  private response: responseHandler<E>;
  constructor(
    private req: NextRequest,
    private res: NextApiResponse,
    private entity: Model<E>,
    private isProtected: boolean = true,
    private token?: string | ""
  ) {
    this.req = req;
    this.res = res;
    this.token = token;
    this.response = new responseHandler<E>();
  }

  async validateToken(): Promise<boolean> {
    try {
      jwt.verify(this.token!, TOKEN_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  async get(): Promise<E[] | void> {
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return this.response[401](this.res);
      }
    }
    return await this.entity.find();
  }

  async create(data: E): Promise<E | void> {
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return this.response[401](this.res);
      }
    }
    return await this.entity.create(data);
  }
}
