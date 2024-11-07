import * as SignUp from "@clerk/elements/sign-up";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import Loader from "../ui/Loader";

type ClerkAuthButtonProps = {
  title: string;
  ActionComponent: typeof SignUp.Action | typeof SignIn.Action;
  isChecked?: boolean;
};

const ClerkAuthButton = ({
  title,
  ActionComponent,
  ...props
}: ClerkAuthButtonProps) => {
  return (
    <ActionComponent
      submit
      className="w-full cursor-pointer rounded-full bg-black h-[52px] text-center transition-all duration-500 ease-in-out text-base font-medium text-white shadow outline-none  hover:bg-[#4B24CD] active:text-white/70"
      {...props}
    >
      <Clerk.Loading>
        {(isLoading) => (isLoading ? <Loader color="#fff" /> : title)}
      </Clerk.Loading>
    </ActionComponent>
  );
};

export default ClerkAuthButton;
