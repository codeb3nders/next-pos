"use client";

import { AppDispatch, RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Account() {
  const data = useAppSelector((state) => state.data.account);

  const [clickCounter, setClickCounter] = useState(0);

  return (
    <div>
      <button
        onClick={() =>
          setClickCounter((prev: number) => {
            return prev + 1;
          })
        }
      >
        Click Me
      </button>
      <div>Click Counter: {clickCounter}</div>
      {data.map((item: any) => {
        return <div key={item.id}>{item.businessEmail}</div>;
      })}
    </div>
  );
}
