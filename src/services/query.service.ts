import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY, UNAUTHORIZED } from "../constants";
import { responseHandler } from "../utils/response.utils";
import { NextRequest, NextResponse } from "next/server";

export class QueryService<E> {
  private response: responseHandler<E>;
  constructor(
    private req: NextRequest,
    private res: NextApiResponse,
    private entity: Model<E>,
    private isProtected: boolean = false,
    private token?: string | ""
  ) { 
    this.req = req;
    this.res = res;
    this.token = token;
    this.isProtected = isProtected;
    this.response = new responseHandler<E>();
  }

  

  async validateToken(): Promise<boolean> {
       try {
        console.log({TOKEN_SECRET_KEY})
        console.log({token: this.token})
      jwt.verify(this.token!, TOKEN_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  async get() {
    if (this.isProtected) {
      console.log("IS VALID", await this.validateToken())
      if (!await this.validateToken()) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 })        
      
      }
    }
    return await this.entity.find();
  }

  async findOne(query: any) {
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return  NextResponse.json({ error: UNAUTHORIZED }, { status: 401 });
      }
    }
    return await this.entity.findOne(query);
  }
  

  async create(data: E): Promise<E | NextResponse> {
    
    if (this.isProtected) {
      if (!(await this.validateToken())) {
        return  NextResponse.json({ error: UNAUTHORIZED }, { status: 401 });
      }
    }
    return await this.entity.create(data);
  }
}
