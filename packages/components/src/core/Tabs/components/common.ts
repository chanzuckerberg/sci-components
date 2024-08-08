"use client";

import { createContext } from "react";

export type SdsSize = "small" | "large";

export const TabsContext = createContext({ sdsSize: "large" as SdsSize });
