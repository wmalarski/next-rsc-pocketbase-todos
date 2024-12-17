"use client";
import { updateIsFinishedTodo } from "@/server/todos";
import { Checkbox, type CheckboxProps } from "@/ui/checkbox";

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
			Is Finished
		</Checkbox>
	);
};
