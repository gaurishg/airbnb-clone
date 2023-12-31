'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { loginModalSliceActions } from '@/app/store/loginModalSlicer';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
    const router = useRouter();
    const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);
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
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false
        }).then(value => {
            if (value?.ok) {
                toast.success("Logged in");
                router.refresh();
                dispatch(loginModalSliceActions.onClose());
            } 
            if (value?.error) {
                toast.error(value.error);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to your account'/>
            <Input
                id='email'
                label='Email'
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

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {signIn('google');}}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light    
                '
            >
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>Already have an account?</div>
                    <div
                        onClick={() => dispatch(loginModalSliceActions.onClose())}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        '
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={() => dispatch(loginModalSliceActions.onClose())}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />;
}