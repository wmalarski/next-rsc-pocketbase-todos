import { styled } from "@/styled-system/jsx";
import { button } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import { ark } from "@ark-ui/react/factory";

export type ButtonProps = ComponentProps<typeof Button>;
export const Button = styled(ark.button, button);
