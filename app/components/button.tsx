import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
	"flex items-center gap-1 text-small border rounded-md py-1 px-4 w-fit font-bold hover:shadow-sm",
	{
		variants: {
			variant: {
				default: `text-white border-borderPrimary bg-primary`,
				outline: `text-textBlack border-borderGray bg-white`,
				disabled: `text-textGray border-borderGray bg-white cursor-not-allowed`,
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	suffixIcon?: React.ReactNode;
	prefixIcon?: React.ReactNode;
}

const Button = React.memo(function Button({
	disabled,
	variant,
	className,
	children,
	prefixIcon,
	suffixIcon,
	...props
}: ButtonProps) {
	return (
		<button
			className={`${cn(buttonVariants({ variant, className }))} ${
				disabled && variant === "default"
					? "bg-primaryLight opacity-50"
					: "bg-primary opacity-100"
			}`}
			disabled={disabled}
			{...props}
		>
			{prefixIcon && prefixIcon}
			<span className={`text-sm`}>{children}</span>
			{suffixIcon && suffixIcon}
		</button>
	);
});

export default Button;
