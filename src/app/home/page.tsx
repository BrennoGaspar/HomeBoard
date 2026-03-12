'use client'

export default function HomePage() {

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        // Sua lógica de backend entrará aqui
    }

    

    return (

        <div className='flex items-center justify-center w-full min-h-screen p-4'>
            <div className='w-full max-w-6xl'>
                <h1 className='text-[50px] font-bold text-center p-5'>To-Do List📍</h1>

                {/* Formulário de Adição */}
                <form onSubmit={handleAdd} className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="📝 Adicionar nova tarefa"
                        className='text-xl rounded-l-lg bg-white p-3 w-full max-w-md shadow-sm focus:outline-none border-y border-l border-gray-200'
                    />
                    <button
                        type="submit"
                        className='rounded-r-lg bg-[--secundary-color] hover:opacity-90 transition-opacity text-xl p-3 px-6 text-white font-semibold shadow-sm'
                        style={{ backgroundColor: 'var(--secundary-color, #3b82f6)' }} // Fallback caso a variável não esteja no CSS
                    >
                        ➕ Adicionar
                    </button>
                </form>

                {/* Grid de Colunas (Kanban Style) */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-4'>

                    {/* Coluna: Para Fazer */}
                    <div className='flex flex-col bg-white rounded-xl shadow-lg border-t-4 border-lime-400 min-h-[400px]'>
                        <div className='p-4 border-b border-gray-100'>
                            <p className="text-center font-bold text-gray-700 uppercase tracking-wider">Para Fazer</p>
                        </div>
                        <div className='p-4 flex-grow space-y-3'>
                            {/* Exemplo de card de tarefa */}
                            <div className='p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-white transition-colors'>
                                📌 Exemplo de tarefa pendente
                            </div>
                        </div>
                    </div>

                    {/* Coluna: Em Andamento */}
                    <div className='flex flex-col bg-white rounded-xl shadow-lg border-t-4 border-orange-400 min-h-[400px]'>
                        <div className='p-4 border-b border-gray-100'>
                            <p className="text-center font-bold text-gray-700 uppercase tracking-wider">Em Andamento</p>
                        </div>
                        <div className='p-4 flex-grow space-y-3'>
                            <div className='p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-white transition-colors'>
                                ⚙️ Trabalhando nisso agora...
                            </div>
                        </div>
                    </div>

                    {/* Coluna: Concluído */}
                    <div className='flex flex-col bg-white rounded-xl shadow-lg border-t-4 border-purple-700 min-h-[400px]'>
                        <div className='p-4 border-b border-gray-100'>
                            <p className="text-center font-bold text-gray-700 uppercase tracking-wider">Concluído</p>
                        </div>
                        <div className='p-4 flex-grow space-y-3'>
                            <div className='p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm line-through text-gray-400'>
                                ✅ Tarefa finalizada
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}