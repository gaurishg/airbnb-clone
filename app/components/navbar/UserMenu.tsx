'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { signOut } from 'next-auth/react';
import { loginModalSliceActions } from '@/app/store/loginModalSlicer';
import { registerModalSliceActions } from '@/app/store/registerModalSlicer';
import { SafeUser } from '@/app/types';

interface Props {
    currentUser?: SafeUser | null
}

export default function UserMenu({ currentUser }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleopen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);

    return <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={() => {}}
                className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleopen}
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div
                className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                {currentUser ? (<div className='flex flex-col cursor-pointer'>
                    <>
                        <MenuItem
                            onClick={() => {}}
                            label='My trips'
                        />
                        <MenuItem
                            onClick={() => {}}
                            label='My favourites'
                        />
                        <MenuItem
                            onClick={() => {}}
                            label='My reservations'
                        />
                        <MenuItem
                            onClick={() => {}}
                            label='My properties'
                        />
                        <MenuItem
                            onClick={() => {}}
                            label='Airbnb my home'
                        />
                        <hr />
                        <MenuItem
                            onClick={signOut}
                            label='Logout'
                        />
                    </>
                </div>) : (<>
                    <MenuItem
                            onClick={() => {
                                dispatch(loginModalSliceActions.onOpen());
                                setIsOpen(false);
                            }}
                            label='Login'
                        />
                        <MenuItem
                            onClick={() => {
                                dispatch(registerModalSliceActions.onOpen());
                                setIsOpen(false);
                            }}
                            label='Sign up'
                        />
                </>)}
            </div>
        )}
    </div>
}