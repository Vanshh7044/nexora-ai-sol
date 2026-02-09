"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ className, children, onClick, ...props }: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    setLoading(true);
    setSuccess(false);

    try {
      await onClick(event);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      layout
      className={cn(
        "flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-green-500 dark:ring-offset-black",
        className
      )}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      <motion.div layout className="flex items-center gap-2 relative">
        <AnimatePresence mode="wait" initial={false}>
          {!loading && !success && (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              {children}
            </motion.span>
          )}

          {loading && (
            <motion.span
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Loader />
              Loading…
            </motion.span>
          )}

          {success && (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <CheckIcon />
              Success
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
    <path d="M22 12a10 10 0 0 1-10 10" />
  </motion.svg>
);

const CheckIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 12l2 2l4 -4" />
  </motion.svg>
);

