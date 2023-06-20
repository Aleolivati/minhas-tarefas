import * as S from './styles'
import * as enums from '../../utils/enums/Tasks'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../../store/reducers/filter'
import { RootReducer } from '../../store'

export type Props = {
  label: string
  criteria: 'priority' | 'status' | 'all'
  value?: enums.Priority | enums.Status
}

const CardFilter = ({ label, criteria, value }: Props) => {
  const dispatch = useDispatch()
  const { filter, tasks } = useSelector((state: RootReducer) => state)
  const filtering = () => {
    dispatch(
      filterChange({
        criteria,
        value
      })
    )
  }

  const isActive = () => {
    const sameCriteria = filter.criteria === criteria
    const sameValue = filter.value === value

    return sameCriteria && sameValue
  }

  const taskCounter = () => {
    if (criteria === 'all') return tasks.itens.length
    if (criteria === 'priority') {
      return tasks.itens.filter((item) => item.priority === value).length
    }
    if (criteria === 'status') {
      return tasks.itens.filter((item) => item.status === value).length
    }
  }

  const active = isActive()
  const counter = taskCounter()

  return (
    <S.Card active={active} onClick={filtering}>
      <S.Counter>{counter}</S.Counter>
      <S.Label>{label}</S.Label>
    </S.Card>
  )
}

export default CardFilter
