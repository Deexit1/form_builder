import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
	"flex items-center gap-1 text-small border rounded-sm py-1 px-4 shadow-sm",
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

export default function Button({
	disabled,
	variant,
	className,
	children,
	prefixIcon,
	suffixIcon,
	...props
}: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, className }))} {...props}>
			{prefixIcon && prefixIcon}
			<span>{children}</span>
			{suffixIcon && suffixIcon}
		</button>
	);
}
