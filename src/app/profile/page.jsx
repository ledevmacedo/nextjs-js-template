import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <p className="text-lg">{session.user.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg">{session.user.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">ID do Usuário</label>
            <p className="text-sm font-mono">{session.user.id}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Role de Acesso</label>
            <p className="text-sm font-mono">{session.user.role}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
