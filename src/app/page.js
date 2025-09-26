import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="w-full flex gap-2 h-dvh items-center justify-center">
        <Button>Clique aqui</Button>
        <Button variant="destructive">Botão vermelho</Button>
        <Button variant="outline">Botão outline</Button>
      </div>
    </div>
  );
}
