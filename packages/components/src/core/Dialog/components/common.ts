"use client";

import { createContext } from "react";

type SdsSize = "xs" | "s" | "m" | "l";

export const DialogContext = createContext({ sdsSize: "m" as SdsSize });
