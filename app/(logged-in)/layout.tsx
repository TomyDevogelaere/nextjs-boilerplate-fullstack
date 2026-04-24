import Link from "next/link";
import LogoutButton from "./logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {ModeToggle} from "@/components/ui/mode-toggle";

export default async function LoggedInLayout({
                                                 children,
                                             }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }


    return(
    <div className="bg-gray-100">
        {children}
    </div>
)
}