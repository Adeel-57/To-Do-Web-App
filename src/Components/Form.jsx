import React, { useState } from 'react'
import '../App.css'
import useLocalStorage from '../Hooks/LocalStorage'

const TaskInput = ({setdata}) => {
    const [error, setError] = useState('')
    const [aim, setAim] = useLocalStorage('newTask',{
        title: '',
        details: '',
    })
    const validation = {
        title: [{ required: true, msg: 'Title is required to add a new task' }]
    }
    function Validate(e) {
        const err = {};
        (Object.entries(e).forEach(([key, value]) => {
            validation[key]?.forEach((rule) => {
                if (rule.required && !value.trim()) {
                    err[key] = rule.msg
                }
            })
        }))
        return err
    }
    function onSubmit(e) {
        e.preventDefault();
        const err = Validate(aim);
        if (!Object.entries(err).length) {
            setdata(pre => [...pre, {...aim, id:crypto.randomUUID()}])
            setAim({
                title: '',
                details: '',
            })
            setError({})
        }
        else {
            setError(err)
        }
    }
    function onChange(e) {
        const { name, value } = e.target;
        setAim((pre) => ({ ...pre, [name]: value }))
    }
    return (
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder='Enter your task title' value={aim.title} name='title' onChange={onChange} />
                    <p>{error.title}</p>
                </div>
                <input autoComplete='off' type="text" placeholder='Enter task detail' value={aim.details} name='details' onChange={onChange} />
                <button type='submit'>Add New</button>
            </form>
    )
}

export default TaskInput