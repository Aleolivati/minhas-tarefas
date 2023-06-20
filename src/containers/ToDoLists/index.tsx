import Tasks from '../../components/Tasks'
import { MainContainer, Title } from '../../styles/index'
import { useSelector } from 'react-redux'

import { RootReducer } from '../../store'

const ToDoLists = () => {
  const { itens } = useSelector((state: RootReducer) => state.tasks)
  const { term, criteria, value } = useSelector(
    (state: RootReducer) => state.filter
  )
  const taskFilter = () => {
    let filteredTasks = itens
    if (term !== undefined) {
      filteredTasks = filteredTasks.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (criteria === 'priority') {
        filteredTasks = filteredTasks.filter((item) => item.priority === value)
      } else if (criteria === 'status') {
        filteredTasks = filteredTasks.filter((item) => item.status === value)
      }

      return filteredTasks
    } else {
      return itens
    }
  }

  const showFilterResult = (quantity: number) => {
    let message = ''
    const complementation =
      term !== undefined && term.length > 0 ? `e "${term}"` : ''

    if (criteria === 'all') {
      message = `${quantity} tarefas encontradas como: "todas" ${complementation}`
    } else {
      message = `${quantity} tarefas encontradas como: "${criteria} - ${value}" ${complementation}`
    }
    return message
  }

  const tasks = taskFilter()
  const message = showFilterResult(tasks.length)
  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {tasks.map((t) => (
          <li key={t.title}>
            <Tasks
              id={t.id}
              title={t.title}
              description={t.description}
              priority={t.priority}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ToDoLists
