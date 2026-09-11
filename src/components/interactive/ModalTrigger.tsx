"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useSiteExperience } from "@/components/interactive/SiteExperience";
import type { ModalName } from "@/types";

interface ModalTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  modal: ModalName;
  variant?: "primary" | "outline" | "dark" | "modal";
  size?: "sm" | "md" | "lg";
}

export function ModalTrigger({ modal, children, ...props }: ModalTriggerProps) {
  const { openModal } = useSiteExperience();
  return <Button onClick={() => openModal(modal)} {...props}>{children}</Button>;
}
