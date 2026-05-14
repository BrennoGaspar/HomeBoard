'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"

export async function Fetch () {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('task')
        .select()

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    }

    return data;

}