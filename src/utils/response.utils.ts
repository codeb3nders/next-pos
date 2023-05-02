import { NextApiResponse } from "next";
import { UNAUTHORIZED, BAD_REQUEST, CONFLICT } from "../constants";
import { NextResponse } from "next/server";

export class responseHandler<E> {
  200(data: any | void) {
    return NextResponse.json(data, { status: 200 });
  }

  201(data: E | void) {
    return NextResponse.json(data, { status: 201 });
  }

  409(message: string | void) {
    return NextResponse.json({ error: message || CONFLICT }, { status: 409 });
  }

  400(message: string | void): NextResponse {
    return NextResponse.json(
      { error: message || BAD_REQUEST },
      { status: 400 }
    );
  }

  401(message: string | void) {
    return NextResponse.json(
      { error: message || UNAUTHORIZED },
      { status: 401 }
    );
  }
}
