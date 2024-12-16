import { sva } from "@/styled-system/css";
import styles from "./spinner.module.css";

const spinner = sva({
	slots: ["root", "fragment"],
	base: {
		root: {
			display: "inline-block",
			position: "relative",
		},
		fragment: {
			boxSizing: "border-box",
			display: "block",
			position: "absolute",
			// width: "64px",
			// height: "64px",
			// margin: "8px",
			borderRadius: "50%",
			animation: "lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
			borderColor: "#fff transparent transparent transparent",
		},
	},
	variants: {
		size: {
			sm: {
				root: { width: "6", height: "6" },
				fragment: {
					width: "5",
					height: "5",
					// border: "1px solid #fff",
					margin: "2",
				},
			},
			md: {
				root: { width: "8", height: "8" },
				fragment: {
					width: "6",
					height: "6",
					// border: "1px solid #fff",
					// margin: "2",
				},
			},
			xl: {
				root: { width: "20", height: "20" },
				fragment: {
					width: "64px",
					height: "64px",
					margin: "8px",
					border: "8px solid #fff",
				},
			},
		},
	},
	defaultVariants: {
		size: "xl",
	},
});

export const Spinner = () => {
	const classes = spinner();

	const fragmentClass = `${classes.fragment} ${styles.spinnerRing}`;

	return (
		<div className={classes.root}>
			<div className={fragmentClass} />
			<div className={fragmentClass} />
			<div className={fragmentClass} />
			<div className={fragmentClass} />
		</div>
	);
};
