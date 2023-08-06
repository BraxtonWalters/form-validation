import React, {useReducer} from 'react'

const emailRegEx = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-.]+.[a-zA-Z]{2,}$");


const nameRegEx = new RegExp("^[a-z0-9_-]{3,15}$");

const reducer = (state, action) => {
    switch (action.type) {
        case "firstName":
            if (nameRegEx.test(state.firstName)) {
                return {...state, firstName: action.payload, firstValid: true};
            }
            else {
                return {...state, firstName: action.payload, firstValid: false}
            }
        case "lastName":
            if (nameRegEx.test(state.lastName)) {
                return {...state, lastName: action.payload};
            }
            else {
                return {...state, lastName: action.payload, lastValid: !state.lastValid}
            }
        case "email":
            if (emailRegEx.test(state.email)) {
                return {...state, email: action.payload};
            }
            else {
                return {...state, email: action.payload, emailValid: !state.emailValid}
            }
        default:
            throw new Error();
    }
}

const Form = () => {
    const [state, dispatch] = useReducer(reducer, {
        firstName: "",
        lastName: "",
        email: "",
        firstValid: true,
        lastValid: true,
        emailValid: true
    })

  return (
    <div>
        <form className='container mt-5'>
            <label className={state.firstValid ? "mb-1 ms-2 text-info" : "mb-1 ms-2 text-danger"} htmlFor="firstName">{state.firstValid ? "First Name" : "First Name Must Be Greater Than 3 characters"}</label>
            <input 
                value={state.firstName} 
                onChange={(e) => dispatch({type: "firstName", payload: e.target.value})}
                className= "mb-5 form-control"
                type="text"
                name="firstName"
            />
            <label className={state.lastValid ? "mb-1 ms-2 text-info" : "mb-1 ms-2 text-danger"}htmlFor="lastName">{state.lastValid ? "Last Name" : "Last Name Must Be Greater Than 3 characters"}</label>
            <input 
                value={state.lastName} 
                onChange={(e) => dispatch({type: "lastName", payload: e.target.value})} 
                className='mb-5 form-control' 
                type="text" 
                name="LastName"
            />
            <label className={state.emailValid ? "mb-1 ms-2 text-info" : "mb-1 ms-2 text-danger"}htmlFor="email">{state.emailValid ? "Email" : "Email is not valid"}</label>
            <input 
                value={state.email} 
                onChange={(e) => dispatch({type: "email", payload: e.target.value})} 
                className='mb-5 form-control' 
                type="email" 
                name="email"
            />
            <div className='d-flex justify-content-end'>
            <button className='btn btn-info'>Submit</button>
            </div>
        </form>
        {state.firstValid ? <p className='text-white'>{state.firstName}</p> : <p className='text-white'>fuck not valid</p>}
        
        
    </div>
  )
}

export default Form