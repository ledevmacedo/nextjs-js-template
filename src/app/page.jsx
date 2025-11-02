import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import CopyButton from "@/components/originUI/copyButton";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center">
        {session ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Bem-vindo, {session.user.name}!</h1>
            <p className="text-muted-foreground">Email: {session.user.email}</p>
            <div className="flex gap-2 justify-center">
              <Link href="/api/auth/signout">
                <Button variant="destructive">Sair</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Registro</Button>
            </Link>
            <ModeToggle />
            <CopyButton value={""} />
          </div>
        )}
      </div>
    </div>
  );
}
