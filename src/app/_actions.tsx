'use server'

import { eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '~/server/db'
import { tasks } from '~/server/db/schema'

export const insertTodo = async (data: FormData) => {
    const input = data.get('task')?.toString();
    if (input)
        await db.insert(tasks).values({ task: input }).returning();
    revalidateTag('todo')
    revalidatePath('/');
    return { message: "Submitted Successfully" };
}

export const getTodo = async () => {
    const result = await db.select().from(tasks);
    return result;
}

export default async function deleteTodo(id: number) {
    if (id !== undefined) {
        const result = await db.delete(tasks).where(eq(tasks.id, id));
        console.log(result);
        revalidateTag('todo');
    }
}