import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NavbarAdmin from "@/components/navbar-admin";

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
        <div>
            {children}
        </div>
    )
}