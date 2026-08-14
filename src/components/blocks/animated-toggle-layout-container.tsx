"use client"

import * as React from "react"
import { HTMLMotionProps, LayoutGroup, motion } from "motion/react"
import { LayoutList, Columns2, Columns4 } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

const LAYOUT_CONFIGS = [
  { mode: "list", className: "flex flex-col space-y-4", label: "list view", icon: LayoutList },
  { mode: "2col", className: "grid grid-cols-2 gap-4", label: "2 column view", icon: Columns2 },
  {
    mode: "4col",
    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
    label: "4 column view",
    icon: Columns4,
  },
]
const ANIMATION_VARIANTS = {
  container: {
    list: { transition: { staggerChildren: 0.02 } },
    "2col": { transition: { staggerChildren: 0.1 } },
    "4col": { transition: { staggerChildren: 0.15 } },
  },
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  },
}

interface LayoutButtonProps {
  isSelected: boolean
  onClick: () => void
  isMiddle: boolean
  label: string
  icon: React.ElementType
}

const LayoutButton = ({
  isSelected,
  onClick,
  
  label,
  icon: Icon
}: LayoutButtonProps) => (
  <div className={cn("relative", label === "4 column view" ? "hidden sm:block" : "")}>
    {isSelected && (
      <motion.div
        className="absolute inset-0 bg-white rounded-md shadow-sm border border-slate-200/50"
        layoutId="layout-toggle-buttons"
      />
    )}
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        "relative z-10 rounded-md px-2.5 hover:bg-transparent h-7 transition-colors",
        isSelected ? "text-slate-900" : "text-slate-400 hover:text-slate-900"
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="sr-only">{label}</span>
    </Button>
  </div>
)

export const ContainerToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [modeIndex, setModeIndex] = React.useState(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return 2
    }
    return 1
  })
  const currentConfig = LAYOUT_CONFIGS[modeIndex]

  return (
    <div ref={ref} {...props}>
      <div className="flex justify-end w-full mb-6">
        <div className="flex w-fit rounded-lg bg-slate-100/70 p-1 border border-slate-100">
          {LAYOUT_CONFIGS.map((config, idx) => (
            <LayoutButton
              key={config.mode}
              isSelected={modeIndex === idx}
              onClick={() => setModeIndex(idx)}
              isMiddle={idx > 0 && idx < LAYOUT_CONFIGS.length - 1}
              label={config.label}
              icon={config.icon}
            />
          ))}
        </div>
      </div>
      <LayoutGroup>
        <motion.div
          layout
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={currentConfig.mode}
          className={currentConfig.className}
        >
          {children}
        </motion.div>
      </LayoutGroup>
    </div>
  )
})
ContainerToggle.displayName = "ContainerToggle"

export const CellToggle = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <motion.div
      layout
      variants={ANIMATION_VARIANTS.card}
      initial="hidden"
      animate="visible"
      whileHover={"hover"}
      className={className}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      exit="hidden"
      ref={ref}
      {...props}
    />
  )
})
CellToggle.displayName = "CellToggle"
