"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import Link from "next/link";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">Hello, {user?.fullName}</h2>
        <Link href={"/dashboard/Create-new"}>
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {userRoomList?.length == 0 ? <EmptyState /> : <div>{/* Listing */}</div>}
    </div>
  );
}

export default Listing;
