import { NextRequest } from "next/server";
import PocketBase from "pocketbase";
import { serverEnv } from "./serverEnv";

export const getPocketBase = (request: NextRequest) => {
  console.log("getPocketBase");

  const requestCookie = request.cookies.get("pb_auth");

  console.log("getPocketBase", { requestCookie });

  const pb = new PocketBase(serverEnv.POCKETBASE_URL);
  return pb;
};
