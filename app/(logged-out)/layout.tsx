import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoggedOutLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    console.log({ session });

    if (!!session?.user?.id) {
        redirect("/my-account");
    }

    return(
    <main className="relative flex justify-center items-center min-h-screen overflow-hidden p-4 font-sans">
        {/* Achtergrond laag */}
        <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black font-sans">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-20 blur-[100px]"></div>
        </div>
        {children}
    </main>
    )
}