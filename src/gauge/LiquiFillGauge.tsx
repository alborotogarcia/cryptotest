// LiquidFillGauge.tsx

import React from "react";
import "echarts-liquidfill";
import type { CSSProperties } from "react";
import { ReactECharts } from "./ReactECharts";
import type { LiquidFillGaugeOption } from "./utils";

export interface LiquidFillGaugeProps {
  option: LiquidFillGaugeOption;
  style?: CSSProperties;
}

// export function LiquidFillGauge({ option, style }: LiquidFillGaugeProps): JSX.Element {
//   return (
//     <ReactECharts
//       option={option}
//       style={style}
//     />
//   );
// }
