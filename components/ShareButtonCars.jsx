'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtonCars = ({ car, PUBLIC_DOMAIN }) => {
  // NOTE: here we receive a prop from our parent page component which is
  // server rendered and knows if we are in deployed to Vercel or developing
  // locally.

  const shareUrl = `${PUBLIC_DOMAIN}/cars/${car._id}`;
  const name = `${car.brand} ${car.model}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Car:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareUrl}
          quote={name}
          hashtag={`#${car.brand.replace(/\s/g, '')}${car.model.replace(/\s/g, '')}${car.year}`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={name}
          hashtags={[`${car.brand.replace(/\s/g, '')}${car.model.replace(/\s/g, '')}${car.year}`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={name}
          separator=':: '
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={name}
          body={`Check out this luxury car: `}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtonCars;