import { FC, ReactNode } from "react";

type RenderIfProps = {
  children: ReactNode;
  condition: boolean;
  fallback?: ReactNode;
};

export const RenderIf: FC<RenderIfProps> = ({
  children,
  condition,
  fallback = null,
}) => {
  return condition ? <>{children}</> : <>{fallback}</>;
};
