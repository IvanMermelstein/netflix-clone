import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface LoginLogoProps {
  Logo: IconType,
  method: string
}

const LoginLogo: FC<LoginLogoProps> = ({
  Logo, method
}) => {
  return (
    <div
      className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer 
        hover:opacity-80 transition'
      onClick={() => signIn(method, { callbackUrl: '/' })}
    >
      <Logo size={30} />
    </div>
  );
};

export default LoginLogo;