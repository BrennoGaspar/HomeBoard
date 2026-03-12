'use client'
// Página de Login
import { Login } from "@/util/Login"
import { useState } from "react";

export default function Home() {

  // Back-end
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    
    const result = await Login({ email, password })

    if( result?.error ) {
      alert(result.error)
    }
  }

  // Front-end
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-color">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-950">LOGIN</h1>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">E-mail</label>
          <input 
            type="email" 
            name="email" 
            placeholder="seu@email.com" 
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Senha</label>
          <input 
            type="password" 
            name="senha" 
            placeholder="••••••••" 
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Botão */}
        <button 
          type="submit" 
          className="mt-4 bg-yellow-950 text-white py-2 rounded-md font-bold hover:bg-yellow-900 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
