import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react";


export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(e: React.FormEvent){
        e.preventDefault();
        console.log(email, password)
    }

    return(
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <Input required legend="E-mail" type="mail" placeholder="Digite aqui o seu e-mail" onChange={(e)=>setEmail(e.target.value)}/>
            <Input required legend="Senha" type="password" placeholder="Digite sua senha" onChange={(e)=>setPassword(e.target.value)}/>
            <Button type="submit">Entrar</Button>

            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center 
            hover:text-green-800 transition ease-linear">Criar Conta</a>
        </form>
    )
}