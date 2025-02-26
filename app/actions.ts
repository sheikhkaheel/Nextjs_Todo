"use server";

import { db } from "@/server/db";
import { todoSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function createTask(data: FormData) {
  try {
    if (!data) throw new Error("Provide a Todo");
    const task = data.get("task")!.toString();
    if (task === "") return { success: false };
    const newTask = await db
      .insert(todoSchema)
      .values({ task })
      .returning({ task: todoSchema.task });
    revalidateTag("task");

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error(`Interal Server Error: ${err}`);
  }
}

export async function getTasks() {
  try {
    const tasks = await db.select().from(todoSchema);
    return tasks;
  } catch (err) {
    console.log(err);
    throw new Error(`Interal Server Error: ${err}`);
  }
}

export async function deleteTask(id: string) {
  try {
    if (!id) throw new Error("Id does not exists.");
    const task = await db.delete(todoSchema).where(eq(todoSchema.id, id));
    revalidateTag("task");
  } catch (err) {
    console.log(err);
    throw new Error(`Interal Server Error: ${err}`);
  }
}

export async function editTask(data: { id: string; task: string }) {
  try {
    const task = await db
      .update(todoSchema)
      .set({ id: data.id, task: data.task })
      .where(eq(todoSchema.id, data.id));

    revalidateTag("task");

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error(`Interal Server Error: ${err}`);
  }
}
