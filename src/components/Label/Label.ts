import { styled, type HTMLStyledProps } from "@/styled-system/jsx";
import { label } from "@/styled-system/recipes";
import { ark } from "@ark-ui/react";

export const Label = styled(ark.label, label);
export interface LabelProps extends HTMLStyledProps<typeof Label> {}
