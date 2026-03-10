'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

interface LoginParams {
    email: string
    password: string
}

export async function Login ({ email, password }: LoginParams) {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    } 
    
    if( data?.user ) {
        redirect("/home")
    }

}