"use client";
import {
	Checkbox,
	CheckboxControl,
	CheckboxLabel,
	type CheckboxProps,
} from "@/components/Checkbox/Checkbox";
import { updateIsFinishedTodo } from "@/server/todos";
import { CheckIcon } from "lucide-react";

type UpdateTodoFormProps = {
	isFinished: boolean;
	onIsFinishedChange: (isFinished: boolean) => void;
	id: string;
};

export const IsFinishedCheckbox = ({
	isFinished,
	id,
	onIsFinishedChange,
}: UpdateTodoFormProps) => {
	const onCheckedChange: CheckboxProps["onCheckedChange"] = async ({
		checked,
	}) => {
		const isFinished = Boolean(checked);
		onIsFinishedChange(isFinished);
		await updateIsFinishedTodo({ id, isFinished });
	};

	return (
		<Checkbox checked={isFinished} onCheckedChange={onCheckedChange}>
			{(state) => (
				<>
					<CheckboxControl>
						{state.isChecked ? <CheckIcon /> : null}
					</CheckboxControl>
					<CheckboxLabel srOnly>Is Finished</CheckboxLabel>
				</>
			)}
		</Checkbox>
	);
};
