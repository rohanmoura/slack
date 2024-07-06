"use client"

import { registerWithEmail } from '@/actions/register-with-email';
import Typography from '@/components/typhography';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supaBaseBrowserClients } from '@/supabase/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { RxGithubLogo } from 'react-icons/rx';
import { z } from 'zod';

const AuthPage = () => {

  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isMounted, setisMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supaBaseBrowserClients.auth.getSession();

      if (session) {
        return router.push('/');
      }
    };

    getCurrUser();
    setisMounted(true);
  }, [router]);
  
  const formSchema = z.object({
    email: z.string().email(),
    // password: z.string().min(6),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setisAuthenticated(true);
    const response = await registerWithEmail(values);
    const { data, error } = JSON.parse(response);
    if (error) {
      console.warn("Sign In Eror", error)
      return;
    }
  }

  async function socialAuth(provider: Provider) {
    setisAuthenticated(true);
    await supaBaseBrowserClients.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    })
    setisAuthenticated(false);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className='min-h-screen p-5 grid text-center place-content-center text-black selection:bg-white'>
      <div className='max-w-[450px]'>
        <div className='flex justify-center items-center gap-3 mb-4'>
          <Image src={"/icon.ico.png"} alt='Slack' height={40} width={50} />
          <Typography text='Slack' variant="h2" />
        </div>
        <Typography text='Sign in to your Slack' variant="h2" className='mb-3' />
        <Typography text='Enter your email address' variant="p" className='opacity-90 mb-7' />
        <div className='flex flex-col space-y-4'>
          <Button disabled={isAuthenticated} variant={"outline"} className='py-6 border-2 flex space-x-3' onClick={() => socialAuth("google")}>
            <FcGoogle size={25} />
            <Typography text='Sign in with Google' variant="p" className='text-xl' />
          </Button>
          <Button disabled={isAuthenticated} variant={"outline"} className='py-6 border-2 flex space-x-3' onClick={() => socialAuth("github")}>
            <RxGithubLogo size={25} />
            <Typography text='Sign in with Github' variant="p" className='text-xl' />
          </Button>
        </div>
        <div>
          <div className='flex items-center my-6'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text="OR" variant='p' />
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticated}>
                <FormField control={form.control} name='email' render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Enter your email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }} />
                <Button type='submit' variant={"secondary"} className='bg-black/100 hover:bg-black/10 hover:text-black w-full my-5 text-white'>
                  <Typography text='Sign - in' variant='p' />
                </Button>

                <div className='
                px-5 py-4 bg-gray-100 rounded-sm'>
                  <div className='text-gray-500 flex items-center space-x-3'>
                    <MdOutlineAutoAwesome />
                    <Typography text="We will email you a magic link for a password-free sign-in" variant='p' />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
