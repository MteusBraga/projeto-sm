"use client";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Cadastrar() {
  const { signup, loading, error, success } = useSignup();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
    };
  };

  const passwordValid = validatePassword(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    const isValid = Object.values(passwordValid).every(Boolean);
    if (!isValid) {
      setPasswordError("A senha não cumpre todos os requisitos.");
      return;
    }

    setPasswordError("");
    await signup(form);
  };

  useEffect(() => {
    if (success) {
      router.push("/entrar");
    }
  }, [success, router]);

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="*:w-full flex flex-col justify-center p-4 gap-4 bg-base-300 rounded-xl"
      >
        <h1 className="text-xl">Criar conta</h1>
        <a href="/signin" className="text-sm link">
          Já tenho uma conta
        </a>

        <div className="flex flex-col gap-4 *:min-w-[400px]">
          <div className="flex flex-col justify-start">
            <label htmlFor="name" className="text-sm font-medium">
              Nome e Sobrenome
            </label>
            <div className="input validator join-item w-full">
              <BiUser size={24} />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="John"
                required
                className="ml-2"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="input validator join-item w-full">
              <MdEmail size={24} />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="ml-2"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <div className="input validator w-full">
              <BsKey size={24} />
              <input
                name="password"
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => {
                  handleChange(e);
                  setTouched(true);
                }}
                required
                className="ml-2"
              />
            </div>
          </div>
          {touched && (
            <ul className="text-sm ml-2 text-left space-y-1 mt-1">
              <li
                className={
                  passwordValid.minLength ? "text-green-500" : "text-red-500"
                }
              >
                {passwordValid.minLength ? "✅" : "❌"} Ao menos 8 caracteres
              </li>
              <li
                className={
                  passwordValid.hasLower ? "text-green-500" : "text-red-500"
                }
              >
                {passwordValid.hasLower ? "✅" : "❌"} Ao menos uma letra
                minúscula
              </li>
              <li
                className={
                  passwordValid.hasUpper ? "text-green-500" : "text-red-500"
                }
              >
                {passwordValid.hasUpper ? "✅" : "❌"} Ao menos uma letra
                maiúscula
              </li>
              <li
                className={
                  passwordValid.hasNumber ? "text-green-500" : "text-red-500"
                }
              >
                {passwordValid.hasNumber ? "✅" : "❌"} Ao menos um número
              </li>
            </ul>
          )}
          <div className="flex flex-col justify-start ">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Repetir Senha
            </label>
            <div className="input w-full">
              <BsKey size={24} />
              <input
                type="password"
                placeholder="Senha deve idêntica"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="ml-2"
              />
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Cadastro realizado com sucesso!
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-4"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}
