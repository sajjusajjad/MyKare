import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




function Login() {

    const [duplicateUser, setDuplicateUser] = useState(false)
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        pwd: ''
    }
    const onSubmit = values => {
        let emailCheck = false


        let person = { name: values.name, email: values.email, password: values.pwd, role: 'user' }
        const usersArray = JSON.parse(localStorage.getItem('users')) || []


        usersArray.forEach(user => {
            if (values.email == user.email) {

                emailCheck = true
            }
        })

        if (!emailCheck) {
            usersArray.push(person)
            localStorage.setItem('users', JSON.stringify(usersArray))
            alert(`${values.name} registered succesfully!!`)
            navigate('/')
        }
        setDuplicateUser(emailCheck)

        values.name = ''
        values.email = ''
        values.pwd = ''
        formik.touched.name = false
        formik.touched.email = false
        formik.touched.pwd = false


    }
    const validate = values => {

        setDuplicateUser(false)
        let errors = {}
        if (!values.name) {
            errors.name = 'Name Required!!'
        }
        if (!values.email) {
            errors.email = 'Email Required!!'
        }
        else if (!(/\S+@\S+\.\S+/.test(values.email))) {
            errors.email = 'Valid Email Required!!'
        }
        if (!values.pwd) {
            errors.pwd = 'Password Required!!'
        }
        return errors

    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,

    })




    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    
                </div>
                <div className='col'>
                    <form className='labels' onSubmit={formik.handleSubmit}>
                        <div className='form-control'>
                            <div>
                                <label>Name</label>
                            </div>
                            <div>

                                <input type='text' value={formik.values.name} onChange={formik.handleChange} name='name' onBlur={formik.handleBlur} />
                            </div>
                            <div className='error'> {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}</div>

                        </div>
                        <div className='form-control'>
                            <div>
                                <label>Email</label>
                            </div>
                            <div>

                                <input type='text' value={formik.values.email} onChange={formik.handleChange} name='email' onBlur={formik.handleBlur} />
                            </div>
                            <div className='error'> {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}</div>

                        </div>
                        <div className='form-control'>
                            <div>
                                <label>Password</label>
                            </div>
                            <div>

                                <input type='password' value={formik.values.pwd} onChange={formik.handleChange} name='pwd' onBlur={formik.handleBlur} />
                            </div>
                            <div className='error'>{formik.touched.pwd && formik.errors.pwd ? <div>{formik.errors.pwd}</div> : null}</div>
                        </div>
                        <div>

                            <button type='submit' disabled={!(formik.dirty && formik.isValid)}>Register</button>
                        </div>
                        <div className='error'>
                            {duplicateUser ? <p>User already exisits!!</p> : null}
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login