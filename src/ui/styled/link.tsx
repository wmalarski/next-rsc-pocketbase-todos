import { styled } from "@/styled-system/jsx";
import { link } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import { ark } from "@ark-ui/react/factory";

export type LinkProps = ComponentProps<typeof Link>;
export const Link = styled(ark.a, link);
