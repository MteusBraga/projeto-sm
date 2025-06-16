"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">Projeto TCC</div>
      <div className="navbar-end">
        <a className="btn" onClick={() => router.push("/entrar")}>
          Entrar
        </a>
      </div>
    </div>
  );
}
