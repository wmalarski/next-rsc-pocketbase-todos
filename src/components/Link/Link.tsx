import { HTMLStyledProps, styled } from "@/styled-system/jsx";
import { button } from "@/styled-system/recipes";
import NextLink from "next/link";

export const Link = styled(NextLink, button);
export interface LinkProps extends HTMLStyledProps<typeof Link> {}
