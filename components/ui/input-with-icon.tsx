"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputWithIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
}

export function InputWithIcon({ icon: Icon, className, ...props }: InputWithIconProps) {
    return (
        <div className="relative">
            <div className="input-icon-wrapper">
                <Icon className="h-4 w-4" />
            </div>
            <Input
                {...props}
                className={cn("input-with-icon", className)}
            />
        </div>
    );
}
