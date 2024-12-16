import { styled } from "@/styled-system/jsx";
import { spinner } from "@/styled-system/recipes";
import type { ComponentProps } from "@/styled-system/types";
import { ark } from "@ark-ui/react/factory";

export type SpinnerProps = ComponentProps<typeof Spinner>;
export const Spinner = styled(ark.div, spinner);
