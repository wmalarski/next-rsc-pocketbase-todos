import { styled } from "@/styled-system/jsx";
import { type ButtonVariantProps, button } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import { ark } from "@ark-ui/react/factory";

export type IconButtonProps = ComponentProps<typeof IconButton>;
export const IconButton = styled(ark.button, button, {
	defaultProps: { px: "0" } as ButtonVariantProps,
});
