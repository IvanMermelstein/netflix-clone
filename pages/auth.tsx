import Input from '@/components/Input';
import axios from 'axios';
import Image from 'next/image';
import {
  useCallback, useState
} from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import LoginLogo from '../components/LoginLogo';

const VARIANT_LOGIN = 'login';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState(VARIANT_LOGIN);
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === VARIANT_LOGIN ? 'register' : VARIANT_LOGIN);
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] 
      bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" className="h-12" width={180} height={50} />
        </nav>
        <div className="flex justify-center">
          <div
            className="bg-black bg-opacity-70 p-16 self-center mt-2 
            lg:w-2/5 max-w-md rounded-md w-full"
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === VARIANT_LOGIN ? 'Sign In' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {
                variant === 'register' && (
                  <Input
                    label='Username'
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    value={name}
                  />
                )
              }
              <Input
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
              onClick={variant === VARIANT_LOGIN ? login : register}
            >
              {variant === VARIANT_LOGIN ? 'Login' : 'Sign up'}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <LoginLogo Logo={FcGoogle} method={'google'} />
              <LoginLogo Logo={FaGithub} method={'github'} />
            </div>
            <p className='text-neutral-500 mt-8'>
              {variant === VARIANT_LOGIN ? 'First time using Netflix?' : 'Already have an account?'}
              <span
                className='text-white ml-1.5 hover:underline cursor-pointer'
                onClick={toggleVariant}
              >
                {variant === VARIANT_LOGIN ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;