import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/auth";

export default  async function MyAccount() {
    const session = await auth();

    return (
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden p-4 font-sans">
            {/* Achtergrond laag */}
            <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black font-sans">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 opacity-20 blur-[100px]"></div>
            </div>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>My Account</CardTitle>
            </CardHeader>
            <CardContent>
                <Label>Email Address</Label>
                <div className="text-muted-foreground">{session?.user?.email}</div>
            </CardContent>
        </Card>
        </div>
    )
}