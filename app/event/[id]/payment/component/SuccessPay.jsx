"use client";

import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import successGif from "@/public/assets/paid.gif";
import Link from "next/link";
import { useUser } from "@/lib/userContext";
function SuccessPay({ open, setOpen }) {
  const { user } = useUser();
  return (
    <AlertDialog className="rounded-xl" open={open}>
      <AlertDialogContent className="bg-white text-black rounded-2xl flex flex-col justify-center items-center">
        <AlertDialogHeader>
          {/* <AlertDialogTitle>Payment Successful</AlertDialogTitle> */}
          <div className="flex items-center justify-center">
            <Image src={successGif} width={190} height={190} />
          </div>
          <AlertDialogDescription>
            Your payment has been successfully processed. Thank you!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="bg-black text-white rounded-xl"
          >
            Close
          </AlertDialogCancel>
          <Link href={`/dashboard/user/${user?.id}`}>
            <AlertDialogAction className="bg-blue-600 text-white rounded-xl hover:bg-white hover:text-black hover:border-[1px] hover:border-black">
              Check Dashboard
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SuccessPay;
