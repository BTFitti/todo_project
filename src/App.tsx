import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {


  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editedTask, setEditedTask] = useState({
    enabled: false,
    task: "",
  });
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@todoList");
    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("@todoList", JSON.stringify(tasks));
  }, [tasks]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key === 'Enter'){
      addTask();
    }
  }
  

  function addTask() {
    if (!input) {
      alert("Digite sua tarefa");
      return;
    }
    if (editedTask.enabled) {
      handleEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput("");
  }
  function delTask(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }
  function editTask(item: string) {
    inputRef.current?.focus();
    setInput(item);

    setEditedTask({
      enabled: true,
      task: item,
    });
  }
  function handleEdit() {
    const findIndexOfTask = tasks.findIndex((task) => task === editedTask.task);
    const allTasks = [...tasks];
    allTasks[findIndexOfTask] = input;
    setTasks(allTasks);
    setEditedTask({
      enabled: false,
      task: "",
    });
    setInput("");
  }

  return (
    
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <input
        className="inputTask"
        placeholder="Digite uma tarefa"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button className="btnRegister" onClick={addTask}>{editedTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>

      {tasks.map((item) => (
        <ul key={item}>
          <li className="itens">
            {item}
            <button className="btnEdit" onClick={() => editTask(item)}>
              Editar
            </button>
          </li>
          <div className="teste">
            <button className="btnDelete" onClick={() => delTask(item)}>
              Excluir
            </button>
          </div>
        </ul>
      ))}
    </div>
    
  );
}

export default App;
