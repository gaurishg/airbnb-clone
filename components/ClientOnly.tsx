'use client';

import { store } from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

interface Props {
    children: ReactNode
}

export default function ClientOnly({ children }: Props) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return <Provider store={store}>{hasMounted && children}</Provider>;
}