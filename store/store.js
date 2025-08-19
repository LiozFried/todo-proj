const { createStore } = Redux

import { userService } from '../services/user.service.js'

export const SET_TODOS = 'SET_TODOS'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TODO = 'ADD_TODO'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: null,
    doneTodosPercent: 0,
    maxPage: 0,
    // loggedinUser: null,
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case ADD_TODO:
            return { ...state, todos: [cmd.todo, ...state.todos] }

        case SET_FILTER:
            return { ...state, filterBy: cmd.filterBy }


        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        case SET_DONE_TODOS_PERCENT:
            return { ...state, doneTodosPercent: cmd.doneTodosPercent }

        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store