import FeedsLayout from "@/components/FeedsLayout";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <FeedsLayout>{children}</FeedsLayout>;
};

export default RootLayout;
