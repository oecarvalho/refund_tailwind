import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react";

import { api } from "../services/api";
import { AxiosError } from "axios";
import {z, ZodError} from 'zod'
import { useNavigate } from "react-router";

const signUpSchema = z.object({
    name: z.string().trim().min(1, {message: "informe o nome"}),
    email: z.string().email({message: 'E-mail inválido!'}),
    password: z.string().min(6, {message: 'Senha deve ter pelo menos 6 digitos'}),

    passwordConfirm: z.string({message: 'Confirme a senha'})
}).refine((data)=> data.password === data.passwordConfirm, {
    message: 'As senhas não são iguais',
    path:['passwordConfirm']
})


export function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

   async function onSubmit(e: React.FormEvent){
        e.preventDefault();
        
        try{
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })

            await api.post('/users', data)

            if(confirm('Cadastro Realizado. Ir para a tela de entrar?')){
                navigate('/')
            }

        } catch(error){
            if(error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert('Não foi possivel cadastrar')
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <Input required legend="Nome" placeholder="Digite aqui o seu nome" onChange={(e)=>setName(e.target.value)}/>
            <Input required legend="E-mail" type="mail" placeholder="Digite aqui o seu e-mail" onChange={(e)=>setEmail(e.target.value)}/>
            <Input required legend="Senha" type="password" placeholder="Digite sua senha" onChange={(e)=>setPassword(e.target.value)}/>
             <Input required legend="Confirme a Senha" type="password" placeholder="Digite sua senha" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>

            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center 
            hover:text-green-800 transition ease-linear">Ja tenho uma conta</a>
        </form>
    )
}