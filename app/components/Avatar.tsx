'use client';

import Image from "next/image";
import placeholderPic from '@/public/images/placeholder.jpg';

export default function Avatar() {
    return <Image 
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={placeholderPic}
    />
}