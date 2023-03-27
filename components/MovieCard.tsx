import { FC } from 'react';
import Image from 'next/image';
import { BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';
import { useRouter } from 'next/router';
import useInfoModal from '@/hooks/useInfoModal';
import { BiChevronDown } from 'react-icons/bi';

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div
      className='group bg-zinc-900 col-span relative h-[24vw] lg:h-[12vw]'
      onClick={() => openModal(data?.id)}
    >
      <Image
        src={data?.thumbnail}
        alt={`${data?.title} thumbnail`}
        width={300}
        height={200}
        className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 
          sm:group-hover:opacity-0 delay-300 w-full h-[24vw] lg:h-[12vw]'
      />
      <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 
        w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] 
        group-hover:opacity-100'>
        <Image
          src={data?.thumbnail}
          alt={`${data?.title} thumbnail`}
          width={300}
          height={200}
          className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]'
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div
              onClick={() => null}
              className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center 
                items-center transitiion hover:bg-neutral-300'
            >
              <BsFillPlayFill size={25} onClick={() => router.push(`/watch/${data?.id}`)} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={() => openModal(data?.id)}
              className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 
                rounded-full flex justify-center items-center transition hover:border-neutral-300'
            >
              <BiChevronDown
                className='text-white group-hover/item:text-neutral-300 w-4'
                size={25}
              />
            </div>
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            New <span className='text-white'>2023</span>
          </p>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{data?.duration}</p>
          </div>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default MovieCard;