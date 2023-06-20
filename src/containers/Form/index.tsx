import { useDispatch } from 'react-redux'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { register } from '../../store/reducers/tasks'
import { Field, MainContainer, SaveButton, Title } from '../../styles'
import { FormStyle, Option, Options } from './styles'
import * as enums from '../../utils/enums/Tasks'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const addTask = (event: FormEvent) => {
    event.preventDefault()
    dispatch(
      register({ title, priority, status: enums.Status.PENDING, description })
    )
    navigate('/')
  }
  return (
    <MainContainer>
      <Title>Nova Tarefa</Title>
      <FormStyle onSubmit={addTask}>
        <Field
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Field
          as="textarea"
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Options>
          <p>Prioridades</p>
          {Object.values(enums.Priority).map((priority) => (
            <Option key={priority}>
              <input
                value={priority}
                name="priority"
                type="radio"
                onChange={(event) =>
                  setPriority(event.target.value as enums.Priority)
                }
                id={priority}
                defaultChecked={priority === enums.Priority.NORMAL}
              />
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
          <SaveButton type="submit">Cadastrar</SaveButton>
        </Options>
      </FormStyle>
    </MainContainer>
  )
}

export default Form
