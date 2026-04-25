"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./actions";

export default function LogoutButton() {
    return (
        <Button
            size="default"
            onClick={async () => {
                await logout();
            }}
        >
            Logout
        </Button>
    );
}