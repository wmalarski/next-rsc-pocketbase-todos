import { styled } from "@/styled-system/jsx";
import { input } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import { ark } from "@ark-ui/react/factory";

export type InputProps = ComponentProps<typeof Input>;
export const Input = styled(ark.input, input);
