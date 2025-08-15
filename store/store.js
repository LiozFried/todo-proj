const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'

const initialState = {
    todos: [],
    // isLoading: false,
    // currentFilterBy: null,
    // loggedinUser: null,
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }
    }
}

export const store = createStore(appReducer)
window.gStore = store