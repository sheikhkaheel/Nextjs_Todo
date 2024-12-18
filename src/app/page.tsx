import { unstable_cache } from "next/cache";
import deleteTodo, { getTodo } from "./_actions";
import Form from "./_component";
import DelBtn from "./_delcomponent";

export default async function Todo() {
  const listOfTodo = unstable_cache(async () => await getTodo(), ['todo'], { tags: ["todo"] })

  const todos = await listOfTodo();

  return (
    <>
      <div className="todo_app text-gray-700 bg-stone-200 min-h-screen">
        <div className="form p-4">
          <Form />
        </div>

        <div className="listOfTodo font-semibold py-2 px-4">
          <h2 className="text-[2.5rem]">List of Todo</h2>
          <ul>
            {todos && todos.map((item, index) => (
              <li className="py-1 text-black" key={index}>{index + 1}: {item.task}
                <DelBtn id={item.id} />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}