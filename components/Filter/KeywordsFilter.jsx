import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Dialog } from "@reach/dialog"
import CheckboxItem from './CheckboxItem'
import queryString from 'query-string'
import Router from 'next/router'
import "@reach/dialog/styles.css"
import './style.scss'

const KeywordsFilter = ({query}) => {

    const [dialogIsOpen, toggleDialog] = useState(false)
    const [selection, changeSelection] = useState((query.keywords)? [].concat(query.keywords) : [])

    // Add and remove checked and unchecked items from array
    const handleChange = (e) => {
        let {checked, value} = e.target
        if(checked){
            changeSelection([...selection, value]  )
        } else {
            changeSelection(selection.filter(el=>{
                return el != value
            }))
        }
    }

    // Create new query from state and push new route
    const updateResults = (e) => {
        if(e) e.preventDefault()
        let newQuery = {
            ...query,
            keywords: selection
        }
        Router.push(`/recommendations?${queryString.stringify(newQuery)}`)
        toggleDialog(false)
    }

    // Create new query, clear state and push new route
    const clearFilter = (e) => {
        if(e) e.preventDefault()
        changeSelection([])
        let newQuery = {
            ...query,
            keywords: []
        }
        Router.push(`/recommendations?${queryString.stringify(newQuery)}`)
        toggleDialog(false)
    }

    return (
        <>
            <button 
                className={(selection.length > 0)? "filter-button filter-button--active" : "filter-button"}
                onClick={() => {toggleDialog(true)}}
                >
                Kinds of support
            </button>

            <Dialog
                className="filter-dialog"
                isOpen={dialogIsOpen}
                onDismiss={updateResults}
                >

                <form method="get" action="/recommendations" onSubmit={updateResults}>
                    <div className="filter-dialog__body">
                        <h2 className="filter-dialog__title">Kinds of support</h2>

                        <div className="filter-dialog__options">
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="caring" label="Looking after someone"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="transport" label="Getting out and about"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="housework" label="Housework"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="meals" label="Meals and nutrition"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="equipment" label="Equipment and gadgets"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="hygiene" label="Personal hygiene and continence"/>
                            <CheckboxItem selectionState={selection} onChange={handleChange} name="keywords" value="money" label="Money matters"/>
                        </div>

                    </div>

                    <footer className="filter-dialog__footer">
                        <button className="filter-dialog__action" 
                            type="submit" 
                            >
                            Apply
                        </button>
                        <button className="filter-dialog__action filter-dialog__action--secondary" onClick={clearFilter}>Show all</button>
                    </footer>
                </form>
            </Dialog>
            
        </>
    )
}

KeywordsFilter.propTypes = {
    query: PropTypes.object.isRequired
}

export default KeywordsFilter