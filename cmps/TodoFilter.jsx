import { setFilterBy } from "../store/actions/todo.actions.js"

const { useSelector, useDispatch } = ReactRedux

export function TodoFilter() {

    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        const newFilter = { ...filterBy, [field]: value }
        dispatch(setFilterBy(newFilter))
    }

    // // Optional support for LAZY Filtering with a button
    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     onSetFilterBy(filterByToEdit)
    // }

    const { txt, importance } = filterBy
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form
            // onSubmit={onSubmitFilter}
            >
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                {/* <button hidden>Set Filter</button> */}
            </form>
        </section>
    )
}