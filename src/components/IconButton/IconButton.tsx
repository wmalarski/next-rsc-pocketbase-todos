import { styled, type HTMLStyledProps } from "@/styled-system/jsx";
import { iconButton } from "@/styled-system/recipes";
import { ark } from "@ark-ui/react";

export const IconButton = styled(ark.button, iconButton);
export interface IconButtonProps extends HTMLStyledProps<typeof IconButton> {}
