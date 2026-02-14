import { GetTasks } from "./api/api"

function App() {
  return (
    <>
    <h1>Gerenciador de Tarefas</h1>
    <p>Seja bem vindo ao gerenciador de tarefas!</p>
    <button onClick={GetTasks}>Clica aqui pae</button>
    </>
  )
}
export default App
