import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'



function Login() {
    const [isLoggedin, setIsLoggedin] = useState(true)

    const navigate = useNavigate()
    const initialValues = {
        email: '',
        pwd: ''
    }
    const onSubmit = values => {

        let Loggedin = false
        const usersArray = JSON.parse(localStorage.getItem('users')) || []
        usersArray.forEach(user => {
            if (values.email == 'admin' && values.pwd == 'admin') {

                Loggedin = true
                navigate('/dashboard', { state: { name: user.name, email: user.email, role: 'admin' } })

            }
            else if (values.email == user.email && values.pwd == user.password) {

                Loggedin = true
                navigate('/dashboard', { state: { name: user.name, email: user.email, role: user.role } })

            }
        })
        setIsLoggedin(Loggedin)
        values.email = ''
        values.pwd = ''
        formik.touched.email = false
        formik.touched.pwd = false



    }
    const validate = values => {

        setIsLoggedin(true)

        let errors = {}
        if (!values.email) {
            errors.email = 'Email Required!!'
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

    const handleSignup = () => {

        navigate('/sign-up')
    }
    useEffect(() => {
        let adminExists = false
        const admin = { 'name': 'admin', 'email': 'admin@portal.com', 'password': 'admin', 'role': 'admin' }
        const usersArray = JSON.parse(localStorage.getItem('users')) || []
        usersArray.forEach(user => {
            if (user.email == admin.email && user.role == admin.role) {
                adminExists = true
            }
        });
        if (!adminExists) {
            usersArray.push(admin)
            localStorage.setItem('users', JSON.stringify(usersArray))
        }
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    
                </div>
                <div className='col'>
                    <form className='labels' onSubmit={formik.handleSubmit}>
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

                            <button type='submit' disabled={!(formik.dirty && formik.isValid)}>Login</button>
                        </div>
                        <div>

                            <div className='error'> {isLoggedin ? null : <div>Invalid credentials</div>}</div>

                        </div>
                        <div>
                            <button onClick={handleSignup}>Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login