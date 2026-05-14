'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"

interface Task {
    name: string
}

export async function AddTask ({ name }: Task) {

    const supabase = await createClient();

    const { error } = await supabase
        .from('task')
        .insert({ name: name, type: 1 })

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    }

    return { success: true };

}