import { todoService } from '../../services/todo.service.js'
import { store, SET_TODOS, SET_FILTER, SET_IS_LOADING, SET_DONE_TODOS_PERCENT, SET_MAX_PAGE, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../store.js'
import { addActivity } from './user.action.js'

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

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(({ maxPage, doneTodosPercent, savedTodo }) => {
            store.dispatch({ type, todo: savedTodo })
            _setTodosData(doneTodosPercent, maxPage)
            return savedTodo
        })
        .then((res) => {
            const actioName = todo._id ? 'Update' : 'Added'
            return addActivity(`${actioName} a Todo: ${todo.txt}`)
                .then(() => res)
        })
        .catch((err) => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(({ maxPage, doneTodosPercent }) => {
            store.dispatch({ type: REMOVE_TODO, todoId })
            _setTodosData(doneTodosPercent, maxPage)
        })
        .then(() => addActivity('Removed the todo: ' + todoId))
        .catch((err) => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    return { type: SET_FILTER, filterBy }
}

function _setTodosData(doneTodosPercent, maxPage) {
    store.dispatch({ type: SET_DONE_TODOS_PERCENT, doneTodosPercent })
    store.dispatch({ type: SET_MAX_PAGE, maxPage })
}