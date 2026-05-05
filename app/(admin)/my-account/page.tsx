import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {VerifyAuthenticatedUser} from "@/DAL/verify-user";
import {redirect} from "next/navigation";

export default  async function MyAccount() {
    const session = await VerifyAuthenticatedUser();
    if (!session?.user?.id) {
        redirect("/login");
    }
    return (
        <div className="w-full flex justify-center items-center">
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