'use client';

import axios from 'axios';
import {} from 'react-icons/ai';
import {} from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { registerModalSliceActions } from '@/store/modalSlicer';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';

export default function RegisterModal() {
    const isOpen = useSelector((state: RootState) => state.registerModal.isOpen);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                dispatch(registerModalSliceActions.onClose());
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account'/>
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    return <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={() => dispatch(registerModalSliceActions.onClose())}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
    />;
}