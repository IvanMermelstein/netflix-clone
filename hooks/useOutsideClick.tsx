import {
  RefObject, useEffect
} from 'react';

const useOutsideClick = (ref: RefObject<HTMLDivElement>, func: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) func();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};

export default useOutsideClick;