// app/hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const useAuthCheck = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/blog");
    }
  }, [isLoggedIn, router]);
};

export default useAuthCheck;
