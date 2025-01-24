import { Delete } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Todo = {
  todo: { id: string; text: string }[];
  removeHandler:(todoId:string)=>void
};


const TodoList: React.FC<Todo> = (props) => {
  return (
    <div className="mt-2">
      <h2>TodoList</h2>
      {props.todo.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between ">
              <div>{item.text}</div>
              <Button onClick={()=>props.removeHandler(item.id)} variant={"destructive"}>
                <Delete />
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
export default TodoList;
