"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LogoutButton({ variant = "destructive", children = "Sair" }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut({ 
        redirect: true,
        callbackUrl: "/login"
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Saindo..." : children}
    </Button>
  );
}
