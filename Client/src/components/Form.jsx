export default function Form ({origin,handleSubmit,submitText,children}){    
    return(
    <form id={`${origin}-form`} onSubmit={handleSubmit}>
        {children}
        <button type="submit" className="btn main-submit" for={`${origin}-form`} >{submitText}</button>
    </form>
    ) 
}
