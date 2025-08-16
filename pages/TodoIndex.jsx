import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { loadTodos, setFilterBy } from "../store/actions/todo.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {

    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
        dispatch(setFilterBy(defaultFilter))
    }, [dispatch, searchParams])

    useEffect(() => {
        if (filterBy) {
            setSearchParams(filterBy)
            loadTodos()
        }
    }, [filterBy, setSearchParams])

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                dispatch(loadTodos())
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch(loadTodos())
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if (!todos || !filterBy) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}