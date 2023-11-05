import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './Tasks.module.css'
import { PlusCircle } from 'phosphor-react'
import clipboard from '../assets/clipboard.svg'
import { Task } from './Task'

interface TaskProps {
  id: string
  title: string
  isCompleted: boolean
}

export function TaskList() {
  const [completedTasks, setCompletedTasks] = useState(Number)
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [textTask, setTaskText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const createTask = (event: FormEvent) => {
    event.preventDefault()

    if (!textTask) {
      setErrorMessage('Digite o nome da tarefa')
      return
    }

    const newTask = {
      id: uuidv4(),
      title: textTask,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])

    setTaskText('')
  }

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    if (!value) {
      setErrorMessage('Digite o nome da tarefa')
    } else {
      setErrorMessage(null)
    }

    setTaskText(event.target.value)
  }

  function handleCompletedTasks() {
    const completedTasks = tasks.filter((task) => task.isCompleted === true)
    setCompletedTasks(completedTasks.length)
  }

  function changeIsComplete(id: string) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted
      }
    })
    handleCompletedTasks()
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id
    })
    tasks.forEach((task) => {
      if (task.id === id && task.isCompleted === true) {
        changeIsComplete(id)
      }
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <main>
      <div className={styles.taskForm}>
        <form onSubmit={createTask}>
          <input
            name="task"
            type="text"
            placeholder="Adicione uma nova tarefa"
            className={styles.content}
            value={textTask}
            onChange={handleTextChange}
          />
          <button type="submit" className={styles.btn}>
            Criar
            <PlusCircle />
          </button>
        </form>
        {!!errorMessage && (
          <p className={styles.errorContainer}>{errorMessage}</p>
        )}
      </div>

      <div className={styles.overviewBox}>
        <section className={styles.overview}>
          <div className={styles.counter}>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.counterTwo}>
            <p>Concluídas</p>
            <span>{completedTasks}</span>
          </div>
        </section>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              onChangeIsComplete={changeIsComplete}
              onDeleteTask={handleDeleteTask}
            />
          )
        })
      ) : (
        <article className={styles.noTasks}>
          <div className={styles.tasksContainer}>
            <img src={clipboard} alt="Clipboard" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <br />
              <span>Crie tarefas e organize seus itens a fazer</span>
            </p>
          </div>
        </article>
      )}
    </main>
  )
}
