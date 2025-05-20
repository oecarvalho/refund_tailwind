import { Input } from "../components/Input"

export function SignIn(){
    return(
        <form className="w-full flex flex-col gap-4">
            <Input required legend="E-mail" type="mail" placeholder="Digite aqui o seu e-mail"/>
            <Input required legend="Senha" type="password" placeholder="Digite sua senha"/>
        </form>
    )
}