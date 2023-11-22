'use client';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  router.push('/dashboard');
  // const [after, setAfter] = useState(10)

  return <div></div>;
};

export default Page;
