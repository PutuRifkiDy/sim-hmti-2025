import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextArea(
	{ type = 'text', className = '', onErrors, isFocused = false, ...props },
	ref,
) {
	const localRef = useRef(null);

	useImperativeHandle(ref, () => ({
		focus: () => localRef.current?.focus(),
	}));

	useEffect(() => {
		if (isFocused) {
			localRef.current?.focus();
		}
	}, [isFocused]);

	return (
		<div className="mt-2">
			<textarea
				{...props}
				type={type}
				className={
					'block w-full rounded-md border border-input bg-background p-2 text-foreground shadow-sm outline-none placeholder:text-muted-foreground sm:text-sm sm:leading-6 ' +
					className
				}
				ref={localRef}
			/>

			{onErrors && <p className="mt-2 text-sm text-red-600">{onErrors}</p>}
		</div>
	);
});
