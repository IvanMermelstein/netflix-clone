import { FC } from 'react';

interface MobileMenuProps {
  visible?: boolean;
  labels: string[];
}

const MobileMenu: FC<MobileMenuProps> = ({
  visible, labels
}) => {
  if (!visible) return null;

  return (
    <div className='bg-black w-44 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex text-sm'>
      <div className='flex flex-col gap-4'>
        {
          labels.map((label: string) => (
            <div key={label} className='px-3 text-center text-white hover:underline'>
              {label}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MobileMenu;