import { todoService } from '../../services/todo.service.js'
import { store, SET_TODOS, SET_FILTER } from '../store.js'

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function setFilterBy(searchParams) {
    return todoService.getFilterFromSearchParams(searchParams)
        .then(filterBy => store.dispatch({ type: SET_FILTER, filterBy }))
}