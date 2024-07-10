"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa'
import Typography from './typhography'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from './ui/input'
import ImageUpload from './image-upload'
import slugify from 'slugify'
import { v4 as uuidv4 } from "uuid"
import { createWorkspace } from '@/actions/create-workspace'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useCreateWorkSpaceValues } from '@/hooks/create-workspace-values'

const CreateWorkSpace = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()
    const { imageUrl, updateImageURL } = useCreateWorkSpaceValues()

    const formSchema = z.object({
        name: z.string().min(2, { message: "Please enter a name" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    async function OnSubmit({ name }: z.infer<typeof formSchema>) {
        console.log(name);
        const slug = slugify(name, { lower: true });
        const invite_code = uuidv4();
        setIsSubmitting(true)
        const result = await createWorkspace({ name, slug, invite_code, imageUrl });
        setIsSubmitting(false)
        if (result?.error) {
            console.log(result.error);
        }

        form.reset();
        updateImageURL("");
        setIsOpen(false);
        router.refresh();
        toast.success("🦄 Workspace successfully created")
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(preValue => !preValue)}>
            <DialogTrigger>
                <div className='flex items-center gap-2 p-2'>
                    <Button variant={"secondary"}>
                        <FaPlus />
                    </Button>
                    <Typography variant='p' text='Add Workspace' />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='my-4'>
                        <Typography variant='h4' text='Create a new workspace' />
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(OnSubmit)} className='space-y-8'>
                        <FormField control={form.control} name='name' render={({ field }) => <FormItem>
                            <FormLabel>
                                <Typography text='Name' variant='p' />
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Your Company Name' {...field} />
                            </FormControl>
                            <FormDescription>
                                <Typography text='This is your workspace name' variant='p' />
                            </FormDescription>
                            <FormMessage />
                        </FormItem>} />

                        <ImageUpload />

                        <Button disabled={isSubmitting} type='submit' >
                            <Typography variant='p' text='Submit' />
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkSpace
