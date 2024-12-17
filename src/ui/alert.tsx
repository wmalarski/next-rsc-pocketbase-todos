import {
	AlertCircleIcon,
	AlertTriangleIcon,
	CheckCircleIcon,
	InfoIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import * as StyledAlert from "./styled/alert";

export * as Alert from "./styled/alert";

const ICON_MAP = {
	error: AlertTriangleIcon,
	warning: AlertCircleIcon,
	info: InfoIcon,
	success: CheckCircleIcon,
};

type BasicAlertProps = StyledAlert.RootProps & {
	title: ReactNode;
	description?: ReactNode;
	icon: keyof typeof ICON_MAP;
};

export const BasicAlert = ({
	title,
	description,
	icon,
	...props
}: BasicAlertProps) => {
	const Icon = ICON_MAP[icon];
	return (
		<StyledAlert.Root {...props}>
			<StyledAlert.Icon asChild>
				<Icon />
			</StyledAlert.Icon>
			<StyledAlert.Content>
				<StyledAlert.Title>{title}</StyledAlert.Title>
				<StyledAlert.Description>{description}</StyledAlert.Description>
			</StyledAlert.Content>
		</StyledAlert.Root>
	);
};
