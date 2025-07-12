import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useActionState } from "react";
import {z, ZodError} from 'zod'
import { api } from "../services/api";
import { AxiosError } from "axios";

const signInScheme = z.object({
    email: z.string().email({message: "informe o nome"}),
    password: z.string().trim().min(1, {message: 'E-mail inválido!'}),
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState(signIn, null)

    async function signIn(_: any, formData: FormData){
        try {
            const data = signInScheme.parse({
            email: formData.get('email'),
            password: formData.get('password')
        })

        const response = await api.post('/sessions', data)
        console.log(response.data)
            
        } catch (error) {
            
            if(error instanceof ZodError){
                return {message: error.issues[0].message}
            }

            if (error instanceof AxiosError){
                return {message: error.response?.data.message}
            }

            return {message: 'Não foi possível entrar!'}
        }

    }

    return(
        <form className="w-full flex flex-col gap-4" action={formAction}>
            <Input name="email" required legend="E-mail" type="mail" placeholder="Digite aqui o seu e-mail" />
            <Input name="password" required legend="Senha" type="password" placeholder="Digite sua senha" />
            <p className="text-sm text-red-600 text-center my-4 font-medium">{state?.message}</p>
            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center 
            hover:text-green-800 transition ease-linear">Criar Conta</a>
        </form>
    )
}