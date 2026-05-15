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
        if (!name.trim()) return;
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
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleRemove = async (id: number) => {
        await RemTask({ id });
        handleFetch();
    }

    const handleDoing = async (id: number) => {
        await Doing({ id });
        handleFetch();
    }

    const handleDone = async (id: number) => {
        await Done({ id });
        handleFetch();
    }

    return (
        <div className='w-full min-h-screen p-4 bg-gray-50/30 lg:flex lg:items-center lg:justify-center'>
            <div className='w-full max-w-6xl mx-auto'>
                <h1 className='text-3xl md:text-5xl font-extrabold text-center py-6 md:py-10 text-gray-800 tracking-tight'>
                    To-Do List<span className="text-blue-500">📍</span>
                </h1>

                {/* Formulário de Adição */}
                <form onSubmit={handleAdd} className="flex justify-center mb-8 md:mb-12 px-2">
                    <div className="flex w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden border border-gray-100 focus-within:ring-4 focus-within:ring-blue-100">
                        <input
                            type="text"
                            placeholder="📝 Nova tarefa..."
                            value={name}
                            onChange={changeName}
                            className='text-base md:text-xl bg-white p-4 md:p-5 w-full outline-none'
                        />
                        <button
                            type="submit"
                            className='hover:brightness-110 active:scale-95 transition-all text-sm md:text-xl p-4 md:px-10 text-white font-bold flex items-center gap-2'
                            style={{ backgroundColor: 'var(--secundary-color, #3b82f6)' }}
                        >
                            <span>➕</span>
                            <span className="hidden sm:inline">Adicionar</span>
                        </button>
                    </div>
                </form>

                {/* Grid Responsivo com Scroll Interno */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10'>

                    {/* Coluna: Para Fazer */}
                    <div className='flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden max-h-[500px]'>
                        <div className='p-4 md:p-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10'>
                            <span className="flex items-center gap-3">
                                <span className="w-2 h-6 bg-lime-400 rounded-full"></span>
                                <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">Para Fazer</p>
                            </span>
                            <span className="bg-lime-50 text-lime-600 text-xs font-black px-2.5 py-1 rounded-lg">
                                {tasks.filter(t => t.type === 1).length}
                            </span>
                        </div>
                        {/* Espaço Scrollável */}
                        <div className='p-4 space-y-3 bg-gray-50/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
                            {tasks.filter(task => task.type === 1).map((task) => (
                                <div key={task.id} className='group p-4 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between transition-all'>
                                    <span className="text-gray-700 font-semibold truncate pr-2">{task.name}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => handleDoing(task.id)} className="p-2.5 rounded-xl bg-orange-50 text-orange-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                            🛠️
                                        </button>
                                        <button onClick={() => handleRemove(task.id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                            ⛔
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna: Em Andamento */}
                    <div className='flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden max-h-[500px]'>
                        <div className='p-4 md:p-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10'>
                            <span className="flex items-center gap-3">
                                <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
                                <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">Em Andamento</p>
                            </span>
                            <span className="bg-orange-50 text-orange-600 text-xs font-black px-2.5 py-1 rounded-lg">
                                {tasks.filter(t => t.type === 2).length}
                            </span>
                        </div>
                        {/* Espaço Scrollável */}
                        <div className='p-4 space-y-3 bg-gray-50/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
                            {tasks.filter(task => task.type === 2).map((task) => (
                                <div key={task.id} className='group p-4 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between transition-all'>
                                    <span className="text-gray-700 font-semibold truncate pr-2">{task.name}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => handleDone(task.id)} className="p-2.5 rounded-xl bg-green-50 text-green-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                            ✅
                                        </button>
                                        <button onClick={() => handleRemove(task.id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                            ⛔
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna: Concluído */}
                    <div className='flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden max-h-[500px] sm:col-span-2 lg:col-span-1'>
                        <div className='p-4 md:p-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10'>
                            <span className="flex items-center gap-3">
                                <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                                <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">Concluído</p>
                            </span>
                            <span className="bg-purple-50 text-purple-600 text-xs font-black px-2.5 py-1 rounded-lg">
                                {tasks.filter(t => t.type === 3).length}
                            </span>
                        </div>
                        {/* Espaço Scrollável */}
                        <div className='p-4 space-y-3 bg-gray-50/30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'>
                            {tasks.filter(task => task.type === 3).map((task) => (
                                <div key={task.id} className='group p-4 bg-white/60 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all'>
                                    <span className="text-gray-400 line-through decoration-purple-300 decoration-2 font-medium truncate pr-2">{task.name}</span>
                                    <button onClick={() => handleRemove(task.id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all shrink-0">
                                        ⛔
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}