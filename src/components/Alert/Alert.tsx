import { createStyleContext } from "@/components/utils/createStyleContext";
import { type HTMLStyledProps, styled } from "@/styled-system/jsx";
import { alert } from "@/styled-system/recipes";
import { ark } from "@ark-ui/react";
import {
	AlertCircleIcon,
	AlertTriangleIcon,
	CheckCircleIcon,
	InfoIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const { withProvider, withContext } = createStyleContext(alert);

const Alert = withProvider(styled(ark.div), "root");
const AlertContent = withContext(styled(ark.div), "content");
const AlertDescription = withContext(styled(ark.p), "description");
const AlertIcon = withContext(styled(ark.svg), "icon");
const AlertTitle = withContext(styled(ark.h5), "title");

const Root = Alert;
const Content = AlertContent;
const Description = AlertDescription;
const Icon = AlertIcon;
const Title = AlertTitle;

export {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Content,
	Description,
	Icon,
	Root,
	Title,
};

export interface AlertProps extends HTMLStyledProps<typeof Alert> {}
export interface AlertContentProps
	extends HTMLStyledProps<typeof AlertContent> {}
export interface AlertDescriptionProps
	extends HTMLStyledProps<typeof AlertDescription> {}
export interface AlertIconProps extends HTMLStyledProps<typeof AlertIcon> {}
export interface AlertTitleProps extends HTMLStyledProps<typeof AlertTitle> {}

const ICON_MAP = {
	error: AlertTriangleIcon,
	warning: AlertCircleIcon,
	info: InfoIcon,
	success: CheckCircleIcon,
};

type BasicAlertProps = AlertProps & {
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
		<Alert {...props}>
			<AlertIcon asChild>
				<Icon />
			</AlertIcon>
			<AlertContent>
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</AlertContent>
		</Alert>
	);
};
