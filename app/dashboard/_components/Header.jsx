"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useContext } from 'react';

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    console.log("User Detail in Header:", userDetail);
    return (
        <div className='p-5 shadow-sm flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <Image src={"/logo.svg"} alt="" width={40} height={40} />
                <h2 className='font-bold text-lg'>AI Interior Design.</h2>
            </div>

            <div className='flex gap-7 items-center'>
                <div className='flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full'>
                    <Image src={"/star.png"} alt="" width={20} height={20} />
                    <h2>{userDetail?.credits}</h2>
                </div>
                <UserButton />
            </div>
        </div>
    );
}

export default Header;