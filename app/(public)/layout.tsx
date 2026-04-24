import Navbar from "@/components/navbar";

export default async function LoggedOutLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
  return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex items-center justify-center bg-amber-200">
                {children}
            </main>
        </div>
    );
}