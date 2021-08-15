import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from "@apollo/client";
import gql from 'graphql-tag'

import {useForm} from '../util/hooks'


const Login = (props) => {
    const [errors, setErrors] = useState({})

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, result) {
            props.history.push('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function loginUserCallback(){
        loginUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    type='text'
                    label='Username'
                    placeholder='Username..'
                    name='username'
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}/>
                <Form.Input
                    type='password'
                    label='Password'
                    placeholder='Password..'
                    name='password'
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}/>
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!
    ){
        login(username: $username,password: $password){
            id 
            email 
            createdAt 
            token
        }
    }`

export default Login;

