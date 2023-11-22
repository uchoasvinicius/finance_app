'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '@mui/joy/Input';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
const schema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().nonempty('Insira uma senha válida')
});

type FormProps = z.infer<typeof schema>;
export default function LoginComponent() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleForm = async (data: FormProps) => {
    setErrorMessage('');
    const login = {
      email: 'test@email.com',
      password: '123',
      name: 'John Doe'
    };
    const info = {
      email: data.email,
      password: data.password
    };

    if (login.email === info.email && info.password === login.password) {
      const dataToEncode = btoa(
        JSON.stringify({
          email: login.email,
          name: login.name
        })
      );
      setCookie('token', dataToEncode, {
        maxAge: 60 * 6 * 24 * 10
      });
      router.push('/dashboard');
    } else {
      setErrorMessage('E-mail ou senha inválidos.');
    }
  };
  return (
    <>
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md'
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email')}
                // html input attribute
                name="email"
                type="email"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password')}
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
              />
            </FormControl>

            <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
              Log in
            </Button>
          </form>
          <Typography fontSize="sm" sx={{ alignSelf: 'center' }}>
            email: test@email.com / password: 123
          </Typography>
        </Sheet>
      </main>
    </>
  );
}
