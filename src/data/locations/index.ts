import { LocationDetail } from "./types";
import { osakaData } from "./osaka";
import { harumiData } from "./harumi";
import { toyochoData } from "./toyocho"; // 同様に作成

export const locationData: Record<string, LocationDetail> = {
  "守口": osakaData,
  "晴海": harumiData,
  "東陽町": toyochoData,
};