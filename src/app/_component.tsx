'use client'

import React, { useState } from "react";
import { insertTodo } from "./_actions";

export default function Form() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMsg, setIsMsg] = useState<String>('');

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSuccess(true);
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const result = await insertTodo(formData);
        if (result) {
            setIsSuccess(false);
            setIsMsg(result.message)
            setTimeout(() => { setIsMsg('') }, 2000)
            form.reset();
        }
    }
    return (
        <form onSubmit={handleForm}>
            <label className="text-[1rem] pr-4">Enter you task</label>
            <input type="text" name='task' className="px-4 py-2 text-gray-600 rounded-lg" />
            <button type="submit" disabled={isSuccess} className="ml-4 border-green-600 border rounded-lg text-green-600 hover:bg-green-600 hover:text-white px-4 py-2">{isSuccess ? 'Adding' : 'Add'}</button>
            <span className="py-4 px-4 text-green-600 ml-4">{isMsg}</span>
        </form>
    )
}