import { AccountInterface } from "@/interface";
import { Account } from "@/models/account.model";
import { QueryService } from "@/services/query.service";
import connectMongo from "@/utils/dbConnect";
import { responseHandler } from "@/utils/response.utils";
import { uuid } from "@/utils/uuid";
import { validateAccount } from "@/utils/validator";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

mongoose.connection.readyState !== 1 && connectMongo();

export async function GET(req: NextRequest, res: NextApiResponse) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization") || "";
  const token = authorization.split(" ")[1];
  const response = new responseHandler<AccountInterface[] | void>();
  const queryService = new QueryService<AccountInterface>(
    req,
    res,
    Account,
    true,
    token
  );
  const accounts = await queryService.get();
  return response[200](accounts);
}

export async function POST(
  req: NextRequest,
  res: NextApiResponse<AccountInterface | { error: any }>
) {
  const response = new responseHandler<AccountInterface | void>();
  const body = await req.json();
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization") || "";
  const token = authorization.split(" ")[1];

  body.id = uuid();
  body.status = "approved";
  body.password = "123456";
  body.comparePassword = "123456";
  body.createdAt = new Date().toISOString();

  const { error, value } = validateAccount(body);

  if (error) {
    return response[400](error.message);
  }

  const account = new QueryService<AccountInterface>(
    req,
    res,
    Account,
    true,
    token
  );

  return await account.create(value)

  
}
