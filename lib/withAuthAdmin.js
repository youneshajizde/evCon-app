import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

const adminAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const [isAdmin, setIsAdmin] = useState(null);
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const passkey = localStorage.getItem("adminPasskey");
        if (!passkey) {
          router.push("/sign-up");
        } else {
          setIsAdmin(true);
        }
      }
    }, [router]);

    if (isAdmin === null) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default adminAuth;
