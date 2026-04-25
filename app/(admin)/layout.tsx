import {auth} from "@/auth";
import {redirect} from "next/navigation";
import NavbarAdmin from "@/components/navbar-admin";

export default async function LoggedInLayout({
                                                 children,
                                             }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // check if authorized otherwise redirect to login
    if (!session?.user?.id) {
        redirect("/login");
    }


    return (
        <div className="relative h-screen flex flex-col overflow-hidden">
            {/* 1. De achtergrond staat hier, absoluut gepositioneerd over de hele layout */}
            <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-[#0a0a0a]">
                <div className="absolute inset-0
        /* Light mode: iets grijzer en duidelijker (#80808033 is ~20%) */
        bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)]

        /* Dark mode: Wit op 20% opacity (#ffffff33) */
        dark:bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]
        bg-[size:14px_24px]">
                </div>
                {/* De glow */}
                <div
                    className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 dark:bg-primary/30 opacity-20 blur-[100px]"></div>
            </div>
            <NavbarAdmin/>
            <main className="flex-1 flex items-center justify-center">
                {children}
            </main>
        </div>
    )
}