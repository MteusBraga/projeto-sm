"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3333/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar");
      }

      setSuccess(true);
      router.push("/entrar"); // redireciona para login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};
