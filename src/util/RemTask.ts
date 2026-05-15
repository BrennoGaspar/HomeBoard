'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"

interface Task {
    id: number
}

export async function RemTask ({ id }: Task) {

    const supabase = await createClient();

    const { error } = await supabase
        .from('task')
        .delete()
        .eq('id', id);

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    }

    return { success: true };

}