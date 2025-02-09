import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  CardContent,
  CardHeader,
  DialogDescription,
} from '@/components/ui';
import Image from 'next/image';

const ContactDialog = () => {
  const data = [
    {
      label: 'email',
      info: 'dhdpekfa1@daum.net',
      contact: 'mailto:dhdpekfa1@daum.net',
    },
    {
      label: 'github',
      contact: 'https://github.com/dhdpekfa1',
    },
    {
      label: 'kakaoTalk',
      contact: 'dhdpekfa',
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className='nev_btn text-two dark:text-ef'>
        연락처
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80%] max-w-[95%] md:max-w-fit bg-ef dark:bg-zinc-800 border border-gray-200/20 rounded-sm'>
        <CardHeader>
          <DialogTitle className='font-bold text-second text-base md:text-xl'>
            연락처
          </DialogTitle>
          <DialogDescription className='pt-1 text-xs md:text-lg break-keep dark:text-gray-400'>
            감사하는 마음으로 배우고, 배운 만큼 성장합니다. ☘️
          </DialogDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {data.map((item) => (
              <div key={item.label} className='flex gap-2'>
                <span className='text-gray-500 text-sm md:text-lg'>
                  {item.label}:{' '}
                </span>
                {item.contact ? (
                  <a
                    href={item.contact}
                    className='text-second dark:text-point hover:scale-105  text-sm md:text-lg'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.info || item.contact}
                  </a>
                ) : (
                  <span className='text-second dark:text-point cursor-default'>
                    {item.info || item.label}
                  </span>
                )}
              </div>
            ))}
            <div className='flex items-center justify-center'>
              <Image
                src='/images/kakao_qr.png'
                alt='Kakao QR Code'
                width={400}
                height={400}
                className='w-[120px] md:w-[160px] h-auto rounded-xl mt-2'
                priority
              />
            </div>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export { ContactDialog };
