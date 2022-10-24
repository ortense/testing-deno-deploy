import { Head as FreshHead, asset } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";

type HeadProps = {
  children: ComponentChildren
}

export function Head({ children }:HeadProps) {
  return <FreshHead>
    <meta name="foo" content="bar" />
    <link rel="stylesheet" href={asset('/style.css')} />
    {children}
  </FreshHead>
}