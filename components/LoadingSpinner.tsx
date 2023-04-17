import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClipLoader color="white" size={25} />
    </div>
  );
};

export { LoadingSpinner };
