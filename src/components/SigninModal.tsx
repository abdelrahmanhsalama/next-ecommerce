import { signIn } from "next-auth/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SigninModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50
"
    >
      <div className="bg-white rounded-md p-8 w-max shadow-md flex flex-col">
        <p className="mb-4 text-center">
          🔑<br></br>Login to Add Products to<br></br>Cart or Wishlist!
        </p>
        <button
          className="text-white bg-black border-2 border-black rounded-md py-2 px-4 lg:hover:text-black lg:hover:bg-white transition duration-250 cursor-pointer mb-2"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
        <button className="cursor-pointer" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SigninModal;
