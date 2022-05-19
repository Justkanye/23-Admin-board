import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from '../../../hooks/useScriptRef';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP } from './../../../store/actions';

const RestRegister = ({ className, ...rest }) => {
    let history = useHistory();
    const dispatcher = useDispatch();
    const scriptedRef = useScriptRef();
    const usersState = useSelector((state) => state.users);
    const { users } = usersState;

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    gender: 'male',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    username: Yup.string().min(3).max(12).required('Username is required'),
                    password: Yup.string().max(255).min(8).required('Password is required'),
                    gender: Yup.string().max(6).min(4).required('Gender is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    setSubmitting(false);
                    const existingUserEmail = users.filter((user) => user.email === values.email);
                    const existingUsername = users.filter((user) => user.username === values.username);
                    if (existingUserEmail.length || existingUsername.length) {
                        if (scriptedRef.current) {
                            if (existingUserEmail.length && existingUsername.length) {
                                setErrors({ submit: 'User already exists. Please login!' });
                            } else if (existingUsername.length) {
                                setErrors({ username: 'Username is not available' });
                            } else if (existingUserEmail.length) {
                                setErrors({ email: 'email is not available' });
                            }
                            setStatus({ success: false });
                            setSubmitting(true);
                        }
                    } else {
                        dispatcher({
                            type: SIGNUP,
                            payload: { user: values }
                        });
                        if (scriptedRef.current) {
                            history.push('/auth/signin');
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.username && errors.username}
                                label="Username"
                                placeholder="Username"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.username}
                            />
                            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Email Address"
                                placeholder="Email Address"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                            />
                            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Password"
                                placeholder="Password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <select
                                name="gender"
                                error={touched.gender && errors.gender}
                                className="form-control"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender}
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {touched.gender && errors.gender && <small className="text-danger form-text">{errors.gender}</small>}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}

                        <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Save credentials.
                            </label>
                        </div>

                        <Row>
                            <Col mt={2}>
                                <Button
                                    className="btn-block"
                                    color="primary"
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                >
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            <hr />
        </React.Fragment>
    );
};

export default RestRegister;
