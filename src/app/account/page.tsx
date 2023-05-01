import React from "react";
import Account from "../components/account-client";
import { store } from "@/store";
import { setAccount } from "@/store/accountSlice";
import Providers from "../components/Provider";
import Preloader from "../components/Preloader";

export default async function page() {
  const url = "http://localhost:3000/api/account/";
  const req = await fetch(url);
  const data = await req.json();

  store.dispatch(setAccount(data));

  return (
    <div>
      <Preloader accounts={data} />
      <Providers>
        <Account />
      </Providers>
    </div>
  );
}
