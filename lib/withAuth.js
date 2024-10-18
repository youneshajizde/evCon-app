import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { user } = useUser();
    const router = useRouter();

   

    useEffect(() => {
      if (!user) {
        router.push("/sign-up");
      }
    }, [user, router]);

    if (!user) {
      return      <div className="flex items-center justify-center h-screen">
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
