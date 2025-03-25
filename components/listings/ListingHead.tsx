'use client';

import Image from 'next/image';
import { User } from '@prisma/client';

import Heading from '../Heading';
import HeartButton from '../HeartButton';
import useCountries from '@/hooks/useCountries';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <div className='mt-[100px]'>
        <Heading
          title={title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
      </div>
      <div
        className='
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        '
      >
        <Image
          src={imageSrc}
          fill
          className='object-cover w-full'
          alt='Image'
        />
        <div
          className='
            absolute
            top-5
            right-5
          '
        >
          <HeartButton listingId={id} user={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
