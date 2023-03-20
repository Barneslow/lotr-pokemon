import { FightContext } from "@/context/FightContext";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";

type ProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { team, enemy } = useContext(FightContext);
  const router = useRouter();

  useEffect(() => {
    if (team.length === 0 || enemy.length === 0) {
      router.push("/");
      console.log("hi");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
