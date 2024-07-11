"use client";

import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import Typography from './typhography';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { createChannel } from '@/actions/create-channels';
import { useRouter } from 'next/navigation';

const CreateChannelDialog: FC<{
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    workspaceId: string;
    userdataId: string;
}> = ({
    dialogOpen,
    setDialogOpen,
    workspaceId,
    userdataId,
}) => {

        const formSchema = z.object({
            name: z.string().min(5, { message: "Channel name must be at least 5 characters" })
        })

        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: '',
            }
        })

        const [isSubmitted, setIsSubmitted] = useState(false);

        const router = useRouter()

        const onsubmit = async ({ name }: z.infer<typeof formSchema>) => {
            try {
                setIsSubmitted(true);
                await createChannel({
                    name,
                    userdataId,
                    workspaceId
                });
                router.refresh();
                setIsSubmitted(false);
                setDialogOpen(false);
                form.reset();
                toast.success("Channel Creation Success")
            } catch (error) {
                setIsSubmitted(false);
            }
        }

        return (
            <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(prev => !prev)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='my-4'>
                            <Typography text='Create Channel' variant='h3' />
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)}>
                            <FormField name='name' control={form.control} render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            <Typography text='Name' variant='p' />
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter channel name' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            <Typography text='This is your channel name' variant='p' className='text-error mb-4' />
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />
                            <Button className='my-2' disabled={isSubmitted} type='submit'>
                                {isSubmitted ? 'Creating...' : 'Create'}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    }

export default CreateChannelDialog
