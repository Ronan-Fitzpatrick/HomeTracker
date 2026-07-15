function FormField({ children, label, name }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  )
}

export default FormField
