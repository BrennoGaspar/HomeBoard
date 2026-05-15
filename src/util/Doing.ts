'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"

interface Task {
    id: number
}

export async function Doing ({ id }: Task) {

    const supabase = await createClient();

    const { error } = await supabase
        .from('task')
        .update({ type: 2 })
        .eq('id', id);

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    }

    return { success: true };

}