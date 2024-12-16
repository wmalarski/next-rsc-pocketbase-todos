import { styled } from "@/styled-system/jsx";
import { type TextVariantProps, text } from "@/styled-system/recipes";
import type { ComponentProps, StyledComponent } from "@/styled-system/types";
import type { ElementType } from "react";

type ParagraphProps = TextVariantProps & { as?: ElementType };

export type TextProps = ComponentProps<typeof Text>;
export const Text = styled("p", text) as StyledComponent<"p", ParagraphProps>;
