import {Fragment, ReactNode} from "react";
import ServerHeader from "../header/ServerHeader";
import ClientLayout from "./ClientLayout";

interface LayoutProps {
  children: ReactNode;
  paddingTop?: boolean;
}

export default function Layout({ children, paddingTop = true }: LayoutProps) {
  return (
    <Fragment>
      <ServerHeader />
      <ClientLayout paddingTop={paddingTop}>{children}</ClientLayout>
    </Fragment>
  );
}
