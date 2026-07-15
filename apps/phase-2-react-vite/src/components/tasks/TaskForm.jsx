import { useState } from 'react'
import FormField from './FormField.jsx'

const INITIAL_FORM = {
  title: '',
  category: 'home',
  dueDate: '',
}

function TaskForm({ onTaskAdd }) {
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [formError, setFormError] = useState('')

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = formValues.title.trim()

    if (!title) {
      setFormError('Enter a task title.')
      return
    }

    onTaskAdd({
      title,
      category: formValues.category,
      dueDate: formValues.dueDate || null,
    })
    setFormValues(INITIAL_FORM)
    setFormError('')
  }

  return (
    <form className="task-form" noValidate onSubmit={handleSubmit}>
      <FormField label="Task title" name="task-title">
        <input
          id="task-title"
          name="title"
          type="text"
          value={formValues.title}
          onChange={handleFieldChange}
          autoComplete="off"
          aria-describedby="task-form-error"
          required
        />
      </FormField>

      <FormField label="Category" name="task-category">
        <select
          id="task-category"
          name="category"
          value={formValues.category}
          onChange={handleFieldChange}
        >
          <option value="home">Home</option>
          <option value="maintenance">Maintenance</option>
          <option value="shopping">Shopping</option>
        </select>
      </FormField>

      <FormField label="Due date (optional)" name="task-due-date">
        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={formValues.dueDate}
          onChange={handleFieldChange}
        />
      </FormField>

      <button type="submit">Add task</button>
      <p className="form-error" id="task-form-error" aria-live="polite">
        {formError}
      </p>
    </form>
  )
}

export default TaskForm
