"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";
import Link from "next/link";
function EntryAdmin() {
  const [otp, setOtp] = useState();
  const [error, setError] = useState("");
  const router = useRouter();
  const encryptedKey = encryptKey(otp);
  let decryptedKey = decryptKey(encryptedKey);
  let isAdminValidated = "";
  const validatePasskey = () => {
    if (decryptedKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      router.push("/dashboard/admin");
      localStorage.setItem("adminPasskey", decryptedKey);
      localStorage.removeItem("userInformation");
    } else {
      setError("The passkey you entered is wrong! try again");
    }
  };
  isAdminValidated = localStorage.getItem("adminPasskey");

  console.log(isAdminValidated);

  return (
    <div>
      {isAdminValidated ? (
        <Link href={"/dashboard/admin"}>Enter as admin</Link>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger>Admin</AlertDialogTrigger>
          <AlertDialogContent className="bg-white rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-normal text-base text-center">
                enter the admin passkey
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex items-center justify-center">
              <InputOTP
                maxLength={6}
                className="flex justify-center gap-4"
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="flex gap-4">
                  <InputOTPSlot index={0} className="otpSlot" />
                  <InputOTPSlot index={1} className="otpSlot" />
                  <InputOTPSlot index={2} className="otpSlot" />
                  <InputOTPSlot index={3} className="otpSlot" />
                  <InputOTPSlot index={4} className="otpSlot" />
                  <InputOTPSlot index={5} className="otpSlot" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && (
              <p className="text-red-500 mt-4 text-sm text-center">{error}</p>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-black rounded-xl text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={validatePasskey}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default EntryAdmin;
