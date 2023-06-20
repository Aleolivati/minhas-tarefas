import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tasks from '../../models/tasks'

import * as enums from '../../utils/enums/Tasks'

type TasksState = {
  itens: Tasks[]
}

const initialState: TasksState = {
  itens: [
    {
      id: 1,
      title: 'Estudar Programação',
      priority: enums.Priority.IMPORTANT,
      status: enums.Status.PENDING,
      description: 'Concluir módulo 32 da platafforma da EBAC.'
    },
    {
      id: 2,
      title: 'Preparação Empregabilidade',
      priority: enums.Priority.URGENT,
      status: enums.Status.PENDING,
      description:
        'Preparar e revisar dúvidas e materiais para a reunião de empregabilidade da EBAC.'
    },
    {
      id: 3,
      title: 'Arrumar a casa',
      priority: enums.Priority.NORMAL,
      status: enums.Status.COMPLETED,
      description: 'Passar pano na casa e arrumar escritório.'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((task) => task.id !== action.payload)
    },
    edit: (state, action: PayloadAction<Tasks>) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.itens[taskIndex] = action.payload
      }
    },
    register: (state, action: PayloadAction<Omit<Tasks, 'id'>>) => {
      const taskAlreadyExists = state.itens.find(
        (t) => t.title.toLowerCase() === action.payload.title.toLowerCase()
      )
      if (taskAlreadyExists) {
        alert('Já existe uma tarefa com esse título')
      } else {
        const lastTask = state.itens[state.itens.length - 1]
        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.itens.push(newTask)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; finished: boolean }>
    ) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.itens[taskIndex].status = action.payload.finished
          ? enums.Status.COMPLETED
          : enums.Status.PENDING
      }
    }
  }
})

export const { remove, edit, register, changeStatus } = tasksSlice.actions
export default tasksSlice.reducer
