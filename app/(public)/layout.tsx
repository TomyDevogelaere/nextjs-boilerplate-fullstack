import Navbar from "@/components/navbar";

export default async function LoggedOutLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
  return(
        <div className="relative flex flex-col min-h-screen ">
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-amber-200 dark:bg-[#0a0a0a]">
                </div>
            </div>
            <Navbar />
            <main className="flex-1 flex flex-col  ">
                {children}
            </main>
        </div>
    );
}