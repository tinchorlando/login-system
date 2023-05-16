export default function FormInput ({origin,type,text,name = type,required,handleChange,error}){
    return(
        <label htmlFor={`${type}-${origin}`} className="input-label">
            {text}
            <input id={`${type}-${origin}${name ? `-${name}` : null}`} className="form-input" type={type} name={name} onChange={handleChange} required={required} />
        </label>
    )
}