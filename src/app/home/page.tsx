'use client'

import { AddTask } from "@/util/AddTask";
import { Doing } from "@/util/Doing";
import { Done } from "@/util/Done";
import { Fetch } from "@/util/Fetch";
import { RemTask } from "@/util/RemTask";
import { SetStateAction, useEffect, useState } from "react";

interface Task {
    id: number;
    name: string;
    type: number;
}

export default function HomePage() {

    const [name, setName] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if( !name.trim() ) return;
        await AddTask({ name });
        setName("");
        handleFetch();
    }

    const changeName = (evento: { target: { value: SetStateAction<string>; }; }) => {
        setName(evento.target.value);
    }

    const handleFetch = async () => {
        const data = await Fetch();

        if (data && !Array.isArray(data)) {
            console.error("Erro ao buscar:", data.error);
        } else {
            setTasks(data || []);
            console.log("DADOS RECEBIDOS: ", data);
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleRemove = async ( id: number ) => {
        await RemTask({id});
        handleFetch();
    }

    const handleDoing = async ( id: number ) => {
        await Doing({id});
        handleFetch();
    }

    const handleDone = async ( id: number ) => {
        await Done({id});
        handleFetch();
    }

    return (

        <div className='flex items-center justify-center w-full min-h-screen p-4'>
            <div className='w-full max-w-6xl'>
                <h1 className='text-[50px] font-bold text-center p-5'>To-Do List📍</h1>

                {/* Formulário de Adição */}
                <form onSubmit={handleAdd} className="flex justify-center mb-16 group">
                    <div className="flex w-full max-w-2xl shadow-lg rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-100">
                        <input
                            type="text"
                            placeholder="📝 Adicionar nova tarefa..."
                            value={name}
                            onChange={changeName}
                            className='text-xl bg-white p-4 w-full outline-none border-y border-l border-gray-100 placeholder:text-gray-400 transition-colors focus:bg-gray-50'
                        />
                        <button
                            type="submit"
                            className='bg-[--secundary-color] hover:brightness-110 active:scale-95 transition-all text-xl p-4 px-8 text-white font-bold flex items-center gap-2 whitespace-nowrap'
                            style={{ backgroundColor: 'var(--secundary-color, #3b82f6)' }}
                        >
                            <span className="text-2xl transition-transform hover:rotate-12">➕</span>
                            Adicionar
                        </button>
                    </div>
                </form>

                {/* Grid de Colunas */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-10'>

                    {/* Coluna: Para Fazer */}
                    <div className='flex flex-col bg-gray-50/50 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] overflow-hidden'>
                        <div className='p-4 bg-white border-b border-gray-100 flex items-center justify-between'>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-6 bg-lime-400 rounded-full"></span>
                                <p className="font-bold text-gray-600 uppercase text-xs tracking-widest">Para Fazer</p>
                            </span>
                            <span className="bg-lime-100 text-lime-700 text-xs font-bold px-2 py-1 rounded-full">
                                {tasks.filter(t => t.type === 1).length}
                            </span>
                        </div>
                        
                        <div className='p-4 flex-grow space-y-4'>
                            {tasks.filter(task => task.type === 1).length > 0 ? (
                                tasks.filter(task => task.type === 1).map((task) => (
                                    <div key={task.id} className='group p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-lime-200 transition-all flex items-center justify-between'>
                                        <span className="text-gray-700 font-medium">{task.name}</span>
                                        
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDoing(task.id)}
                                                className="p-2 rounded-lg bg-orange-50 text-orange-600 opacity-0 group-hover:opacity-100 hover:bg-orange-100 transition-all"
                                                title="Começar tarefa"
                                            >
                                                🛠️
                                            </button>
                                            <button
                                                onClick={() => handleRemove(task.id)}
                                                className="p-2 rounded-lg bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
                                                title="Excluir"
                                            >
                                                ⛔
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : <p className="text-center text-gray-400 text-sm italic mt-4">Nada por aqui...</p>}
                        </div>
                    </div>

                    {/* Coluna: Em Andamento */}
                    <div className='flex flex-col bg-gray-50/50 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] overflow-hidden'>
                        <div className='p-4 bg-white border-b border-gray-100 flex items-center justify-between'>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
                                <p className="font-bold text-gray-600 uppercase text-xs tracking-widest">Em Andamento</p>
                            </span>
                            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                                {tasks.filter(t => t.type === 2).length}
                            </span>
                        </div>
                        
                        <div className='p-4 flex-grow space-y-4'>
                            {tasks.filter(task => task.type === 2).length > 0 ? (
                                tasks.filter(task => task.type === 2).map((task) => (
                                    <div key={task.id} className='group p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex items-center justify-between'>
                                        <span className="text-gray-700 font-medium">{task.name}</span>
                                        
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDone(task.id)}
                                                className="p-2 rounded-lg bg-green-50 text-green-600 opacity-0 group-hover:opacity-100 hover:bg-green-100 transition-all"
                                                title="Finalizar"
                                            >
                                                ✅
                                            </button>
                                            <button
                                                onClick={() => handleRemove(task.id)}
                                                className="p-2 rounded-lg bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
                                                title="Excluir"
                                            >
                                                ⛔
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : <p className="text-center text-gray-400 text-sm italic mt-4">Mãos à obra!</p>}
                        </div>
                    </div>

                    {/* Coluna: Concluído */}
                    <div className='flex flex-col bg-gray-50/50 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] overflow-hidden'>
                        <div className='p-4 bg-white border-b border-gray-100 flex items-center justify-between'>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                                <p className="font-bold text-gray-600 uppercase text-xs tracking-widest">Concluído</p>
                            </span>
                            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                                {tasks.filter(t => t.type === 3).length}
                            </span>
                        </div>
                        
                        <div className='p-4 flex-grow space-y-4 text-opacity-50'>
                            {tasks.filter(task => task.type === 3).length > 0 ? (
                                tasks.filter(task => task.type === 3).map((task) => (
                                    <div key={task.id} className='group p-4 bg-white/60 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between opacity-80'>
                                        <span className="text-gray-500 line-through decoration-purple-300 decoration-2">{task.name}</span>
                                        <button
                                            onClick={() => handleRemove(task.id)}
                                            className="p-2 rounded-lg bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
                                            title="Excluir"
                                        >
                                            ⛔
                                        </button>
                                    </div>
                                ))
                            ) : <p className="text-center text-gray-400 text-sm italic mt-4">A satisfação do dever cumprido...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}