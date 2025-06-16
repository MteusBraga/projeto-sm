"use client";

import { BsKey } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Entrar() {
  return (
    <>
      <div className="flex justify-center items-center">
        <form className="flex flex-col justify-center p-4 gap-4 bg-base-300 rounded-xl">
          <h1 className="text-xl">Entrar</h1>
          <a className="text-sm link">Não possuo conta</a>
          <label className="input validator join-item">
            <MdEmail size={24}></MdEmail>
            Email
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Email inválido</div>
          <label className="input validator">
            <BsKey size={24} />
            Senha
            <input className="input" type="password" required />
          </label>
          <p className="validator-hint hidden">Senha ou email inválidos</p>
          <button className="btn btn-primary"> Entrar </button>
        </form>
      </div>
    </>
  );
}
