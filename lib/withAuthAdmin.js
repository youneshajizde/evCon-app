import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Audio, ColorRing, MutatingDots } from "react-loader-spinner";

const adminAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const isAdmin = localStorage.getItem("adminPasskey");
    const router = useRouter();

    useEffect(() => {
      if (!isAdmin) {
        router.push("/sign-up");
      }
    }, [isAdmin, router]);

    if (!isAdmin) {
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
