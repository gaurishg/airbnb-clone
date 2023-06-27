'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import logoPic from '@/public/images/logo.png';

export default function Logo() {
    const router = useRouter();

    return <Image 
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src={logoPic}
    />
}