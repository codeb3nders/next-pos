import { TOKEN_SECRET_KEY } from "@/constants";
import { AccountInterface } from "@/interface";
import jwt from "jsonwebtoken";

export const createToken = async (user: AccountInterface) => {  
  const token = jwt.sign({ email: user.businessEmail }, TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });  
  return token;
};

export const verifyToken = (token: string) => {
  console.log("TOKENNNNNNNN", token)
  try {
    return jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvZmZlZWFsZ28yQGdtYWlsLmNvbSIsImlhdCI6MTY4MzAzMTgyMywiZXhwIjoxNjgzMDM1NDIzfQ.iAHDBnbUgTBgqUUg4YN0YA7xZcvFb8xXVs9sijDWf0U', TOKEN_SECRET_KEY);
  } catch (err) {
    console.log("ERROR", err)
    return false;
  }
};
