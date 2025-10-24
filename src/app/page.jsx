import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  return (
    <div>
      <div className="w-full flex gap-2 h-dvh items-center justify-center">
        {/* <Button>Clique aqui</Button>
        <Button variant="outline">Botão outline</Button> */}
        <ModeToggle />
        <br />
        <Calendar />
      </div>
    </div>
  );
}
