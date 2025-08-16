import { todoService } from '../../services/todo.service.js'
import { store, SET_TODOS, SET_FILTER } from '../store.js'

export function loadTodos() {
    const { filterBy } = store.getState()
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function setFilterBy(filterBy) {
    return { type: SET_FILTER, filterBy }
}