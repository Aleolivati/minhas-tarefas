import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CardFilter from '../../components/CardFilter'
import * as S from './styles'
import * as enums from '../../utils/enums/Tasks'
import { Button, Field } from '../../styles'
import { RootReducer } from '../../store'
import { termChange } from '../../store/reducers/filter'

type Props = {
  showFilters: boolean
}

const Aside = ({ showFilters }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { term } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.AsideStyle>
      <div>
        {showFilters ? (
          <>
            <Field
              type="text"
              placeholder="Buscar"
              value={term}
              onChange={(event) => dispatch(termChange(event.target.value))}
            />
            <S.Filters>
              <S.Subtitle>Prioridades</S.Subtitle>
              <S.Subtitle>Status</S.Subtitle>
              <CardFilter
                criteria="priority"
                value={enums.Priority.IMPORTANT}
                label="importantes"
              />
              <CardFilter
                criteria="status"
                value={enums.Status.PENDING}
                label="pendentes"
              />
              <CardFilter
                criteria="priority"
                value={enums.Priority.URGENT}
                label="urgentes"
              />
              <CardFilter
                criteria="status"
                value={enums.Status.COMPLETED}
                label="concluídas"
              />
              <CardFilter
                criteria="priority"
                value={enums.Priority.NORMAL}
                label="normal"
              />
              <CardFilter criteria="all" label="todas" />
            </S.Filters>
          </>
        ) : (
          <Button onClick={() => navigate('/')}>
            Voltar a lista de tarefas
          </Button>
        )}
      </div>
    </S.AsideStyle>
  )
}

export default Aside
