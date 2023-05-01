"use client";

import { useRef } from "react";
import { store } from "@/store";

import { AccountInterface } from "@/interface";
import { setAccount } from "@/store/accountSlice";

function Preloader({ accounts }: { accounts: AccountInterface[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setAccount(accounts));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
