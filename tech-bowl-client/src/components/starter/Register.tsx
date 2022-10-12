import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { UserContext } from "../../App";
import { User } from "../../interfaces/User";
import { errorMessage, successMessage } from "../../services/ToastService";
import { getUserName, userRegister } from "../../services/UserService";

interface RegisterProps {

}
 
const Register: FunctionComponent<RegisterProps> = () => {
    const userBrief = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) navigate('/home')
    }, []);

    const formik = useFormik({
        initialValues: {name:'', email:'', password:''},
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().email().required(),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values:User)=>{
            userRegister(values).then((result)=>{
                console.log(result.data)
                localStorage.setItem('token', result.data.token)
                userBrief.setLoggedIn(true)
                successMessage(`Welcome ${getUserName()}, You Have Registered Successfully`)
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                errorMessage('Something Went Wrong With The Registration Process')
            })
        }
    })

    return ( <>
    <div className="header-container">
        <img src="header.jpg" className="w-50"/>
    </div>
    <div>
        <form onSubmit={formik.handleSubmit} className='text-center container w-50'>
        <h1 className="display-1 page-title my-4">Register</h1>
            <div className="mb-3 form-floating">
                <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="c"
                />
                <label htmlFor="inputName">Name</label>
                {formik.touched.name && formik.errors.name ? (<p className="text-danger">{formik.errors.name}</p>):null}
            </div>
            <div className="mb-3 form-floating">
                <input type="email" className="form-control" id="inputEmail" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                <label htmlFor="inputEmail" className="form-label">Email address</label>
                {formik.touched.email && formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>):null}
            </div>
            <div className="mb-3 form-floating">
                <input type="password" className="form-control" id="inputPassword" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                <label htmlFor="inputPassword" className="form-label">Password</label>
                {formik.touched.password && formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>):null}
            </div>
            <div className="">
                <button type="submit" className="w-100 btn dark-button mb-3" disabled={!(formik.isValid && formik.dirty)}>Submit</button>

                <Link className="w-100 text-link mt-4" to="/">Already Have a User? Login</Link>
            </div>
        </form>
    </div>
    </> );
}
 
export default Register;