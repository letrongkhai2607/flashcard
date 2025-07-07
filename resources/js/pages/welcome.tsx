import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Landing from './landing';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <React.Fragment>
            <Landing />
        </React.Fragment>
    );
}
