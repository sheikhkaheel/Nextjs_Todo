'use client'

import deleteTodo from "./_actions"

export default function DelBtn({ id }: { id: number }) {
    return (
        <span onClick={async () => await deleteTodo(id)} className="inline-block text-white bg-rose-700 text-[0.8rem] px-3 rounded-lg ml-4">
            del
        </span>
    )
}