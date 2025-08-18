const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: null,
    // loggedinUser: null,
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case SET_FILTER:
            return { ...state, filterBy: cmd.filterBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store