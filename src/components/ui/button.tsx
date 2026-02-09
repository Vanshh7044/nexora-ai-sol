"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type StatefulButtonProps =
  React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loadingText?: string
  }

function Spinner() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="size-4"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
    </motion.svg>
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  onClick,
  loadingText = "Loading…",
  disabled,
  ...props
}: StatefulButtonProps) {
  const Comp = asChild ? Slot : "button"
  const [loading, setLoading] = React.useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick || loading) return

    const result = onClick(e)

    if (result instanceof Promise<unknown>) {
      try {
        setLoading(true)
        await result
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant, size }),
        "relative inline-flex items-center justify-center min-w-[140px]",
        className
      )}
      {...props}
    >
      <span className="relative inline-flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {!loading ? (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              {children}
            </motion.span>
          ) : (
            <motion.span
              key="loader"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Spinner />
              {loadingText}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Comp>
  )
}

export { Button, buttonVariants }
