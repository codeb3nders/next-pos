import { AccountInterface } from "@/interface";
import { Account } from "@/models/account.model";
import { QueryService } from "@/services/query.service";
import { createToken } from "@/utils/auth";
import connectMongo from "@/utils/dbConnect";
import { responseHandler } from "@/utils/response.utils";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  mongoose.connection.readyState !== 1 && connectMongo();
  const response = new responseHandler<AccountInterface[] | void>();
  const body = await req.json();

  console.log({ body });

  const { email, password } = body;

  const queryService = new QueryService<AccountInterface>(
    req,
    res,
    Account,
    false
  );

  const user = (await queryService.findOne({
    businessEmail: email,
  })) as AccountInterface;

  console.log("email", email, { user });

  if (!user || !(await user.comparePassword(password))) {
    return response[401]();
  }

  return response[200](await createToken(user));
}
