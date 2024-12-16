import { styled } from "@/styled-system/jsx";
import { link } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import NextLink from "next/link";

export type LinkProps = ComponentProps<typeof Link>;
export const Link = styled(NextLink, link);
