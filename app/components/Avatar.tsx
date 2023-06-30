'use client';

import Image from "next/image";
import placeholderPic from '@/public/images/placeholder.jpg';

interface Props {
    src?: string | null;
}

export default function Avatar({ src }: Props) {
    return <Image 
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={src || placeholderPic}
    />
}