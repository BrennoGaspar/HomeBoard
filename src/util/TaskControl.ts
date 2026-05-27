'use server' // para rodar apenas no servidor (back-end)
import { createClient } from "@/lib/supabase/server"

interface Task {
    name?: string,
    id?: number
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

export async function Done ({ id }: Task) {

    const supabase = await createClient();

    const { error } = await supabase
        .from('task')
        .update({ type: 3 })
        .eq('id', id);

    if( error ) {
        console.log('Deu erro: ' + error)
        return { error: error.message }
    }

    return { success: true };

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