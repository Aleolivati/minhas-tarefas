import AddButton from '../../components/AddButton'
import Aside from '../../containers/Aside'
import ToDoLists from '../../containers/ToDoLists'

const Home = () => (
  <>
    <Aside showFilters />
    <ToDoLists />
    <AddButton />
  </>
)

export default Home
