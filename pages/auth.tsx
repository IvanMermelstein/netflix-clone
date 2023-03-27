import Input from '@/components/Input';
import axios from 'axios';
import Image from 'next/image';
import {
  useCallback, useState
} from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import LoginLogo from '../components/LoginLogo';
import Spinner from '@/components/Spinner';

const VARIANT_LOGIN = 'login';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState(VARIANT_LOGIN);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setEmail('');
    setPassword('');
    setLoginError('');
    setVariant((currentVariant) => currentVariant === VARIANT_LOGIN ? 'register' : VARIANT_LOGIN);
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      setLoginError('Email and password required');
      return;
    }
    setLoading(true);
    try {
      const resp = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
        redirect: false
      });
      if (resp?.error) setLoginError(resp.error);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [email, password]);

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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError('');
                }}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                id='password'
                type='password'
                value={password}
              />
              {loginError &&
                <div className='text-red-600 text-sm'>
                  {loginError}
                </div>
              }
            </div>
            <button
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition
              hover:disabled:bg-red-600'
              onClick={variant === VARIANT_LOGIN ? login : register}
              disabled={loading || !!loginError}
            >
              {loading ? <Spinner /> : (variant === VARIANT_LOGIN ? 'Login' : 'Sign up')}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div onClick={() => setLoading(true)}>
                <LoginLogo Logo={FcGoogle} method={'google'} />
              </div>
              <div onClick={() => setLoading(true)}>
                <LoginLogo Logo={FaGithub} method={'github'} />
              </div>
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
    </div >
  );
};

export default Auth;