// usePathname notes the address of the webpage we're on

import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        icon: <MessageSquare />,
        active: pathname.startsWith("/conversations"),
      },
      {
        name: "Friends",
        href: "/friends",
        icon: <MessageSquare />,
        active: pathname.startsWith("/friends"),
      },
    ],
    [pathname]
  );
  return paths;
};
