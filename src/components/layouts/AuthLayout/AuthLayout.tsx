import PageHead from "@/components/common/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

export const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <>
      <PageHead title={title} />
      <section>{children}</section>
    </>
  );
};
