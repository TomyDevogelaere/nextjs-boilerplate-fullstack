

export default async function Home() {



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
<h1>Users</h1>
        <ul>
          {/*  {users.map((user) => (
                <li key={user.id}>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                </li>
            ))}*/}
        </ul>
    </div>
  );
}
