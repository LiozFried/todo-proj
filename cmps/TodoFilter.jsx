import { setFilterBy } from "../store/actions/todo.actions.js"
import { todoService } from "../services/todo.service.js"

const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect, useRef } = React

export function TodoFilter() {

    const filterBy = useSelector(state => state.filterBy)
    const { maxPage } = useSelector(state => state)
    const dispatch = useDispatch()

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const elInputRef = useRef(null)

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])

    useEffect(() => {
        if (elInputRef.current) {
            elInputRef.current.focus()
        }
    }, [])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        dispatch(setFilterBy(filterByToEdit))
    }

    function onClearFilter() {
        const newFilter = todoService.getDefaultFilter()
        dispatch(setFilterBy(newFilter))
    }

    function onSetPage(diff) {
    const currentPageIdx = +filterBy.pageIdx
    let newPageIdx = currentPageIdx + diff
    if (newPageIdx < 0) newPageIdx = 0
    if (newPageIdx > maxPage - 1) newPageIdx = maxPage - 1

    const newFilter = { ...filterBy, pageIdx: newPageIdx }
    dispatch(setFilterBy(newFilter))
}

    const { txt, importance, isDone, sort, pageIdx } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>

                <label htmlFor="txt">Text:</label>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                    ref={elInputRef}
                />

                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <label htmlFor="isDone">Status:</label>
                <select name="isDone" id="isDone" value={isDone} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="done">Done</option>
                    <option value="active">Active</option>
                </select>

                <label htmlFor="sort">Sort by:</label>
                <select name="sort" id="sort" value={sort} onChange={handleChange}>
                    <option value="">None</option>
                    <option value="txt">Text</option>
                    <option value="createdAt">Created Date</option>
                </select>

                <div className="btn-group">
                    <button>Set Filter</button>
                    <button type="button" onClick={onClearFilter}>Clear Filters</button>
                </div>
            </form>

            <div className="pagination">
                <button onClick={() => onSetPage(-1)}>Prev</button>
                <span>{pageIdx + 1} / {maxPage}</span>
                <button onClick={() => onSetPage(1)}>Next</button>
            </div>
        </section>
    )
}