import { todoService } from '../../services/todo.service.js'
import { store, SET_TODOS, SET_FILTER, SET_IS_LOADING, SET_DONE_TODOS_PERCENT, SET_MAX_PAGE, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../store.js'

export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const { filterBy } = store.getState()
    return todoService.query(filterBy)
        .then(({ todos, maxPage, doneTodosPercent }) => {
            store.dispatch({ type: SET_TODOS, todos })
            _setTodosData(doneTodosPercent, maxPage)
            return todos
        })
        .catch((err) => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function setFilterBy(filterBy) {
    return { type: SET_FILTER, filterBy }
}

function _setTodosData(doneTodosPercent, maxPage) {
    store.dispatch({ type: SET_DONE_TODOS_PERCENT, doneTodosPercent })
    store.dispatch({ type: SET_MAX_PAGE, maxPage })
}