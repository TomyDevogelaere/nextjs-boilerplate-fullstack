import Image from "next/image";
import prisma from "@/lib/db";
export default async function Home() {

    const users = await prisma.user.findMany();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
<h1>Users</h1>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                </li>
            ))}
        </ul>
    </div>
  );
}
