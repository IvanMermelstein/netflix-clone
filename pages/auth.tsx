import Input from '@/components/Input';
import Image from 'next/image';
import {
  useCallback, useState
} from 'react';

const VARIANT_LOGIN = 'login';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState(VARIANT_LOGIN);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === VARIANT_LOGIN ? 'register' : VARIANT_LOGIN);
  }, []);

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
            <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
              {variant === VARIANT_LOGIN ? 'Login' : 'Sign up'}
            </button>
            <p className='text-neutral-500 mt-12'>
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