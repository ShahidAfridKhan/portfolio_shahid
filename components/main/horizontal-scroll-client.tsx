"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// ssr:false must live in a Client Component
const HorizontalScrollDynamic = dynamic(
  () => import("@/components/main/horizontal-scroll"),
  { ssr: false }
);

type Props = ComponentProps<typeof HorizontalScrollDynamic>;

export default function HorizontalScrollClient(props: Props) {
  return <HorizontalScrollDynamic {...props} />;
}
