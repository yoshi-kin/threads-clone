"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { ChangeEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation"
import { CommentValidation } from "@/lib/validations/thread"
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions"
import Image from "next/image"

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log("is going to create thread")
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)
    form.reset()
    // await createThread({
    //   text: values.thread,
    //   communityId: null,
    //   path: pathname
    // })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment