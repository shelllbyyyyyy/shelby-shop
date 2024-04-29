import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProfileQuery } from "@shelby/api";

import Wrapper from "@/app/admin/_components/Wrapper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EditProfileFormSchema, editProfileFormSchema } from "@/types";

type EditProfileFormInnerProps = {
  onSubmit: (
    values: EditProfileFormSchema & { profilePictureFile?: File }
  ) => void;
  onCancel?: () => void;
};

export const EditProfileFormInner: React.FC<EditProfileFormInnerProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [selectedProfilePictureFile, setSelectedProfilePictureFile] =
    useState<File | null>(null);
  const inputProfilePictureRef = useRef<HTMLInputElement>(null);

  const { data: profile } = useGetProfileQuery({});

  const form = useForm<EditProfileFormSchema>({
    defaultValues: {
      name: profile?.data.name || undefined,
      phoneNumber: profile?.data.phoneNumber || undefined,
      address: profile?.data.address || undefined,
    },
    resolver: zodResolver(editProfileFormSchema),
    reValidateMode: "onChange",
  });

  const handleInputProfilePictureChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const MAX_SIZE = 5 * 1024 * 1024;

    if (event.target.files?.length) {
      if (event.target.files[0].size > MAX_SIZE) {
        return alert("Batas file size 5 MB");
      }

      setSelectedProfilePictureFile(event.target.files[0]);
    }
  };

  const previewProfilePictureUrl = useMemo(() => {
    if (selectedProfilePictureFile)
      return URL.createObjectURL(selectedProfilePictureFile);

    return profile?.data.profilePictureUrl || "";
  }, [profile?.data.profilePictureUrl, selectedProfilePictureFile]);

  return (
    <>
      <div className="flex flex-col h-screen w-full max-sm:mb-24">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex h-72 w-full bg-accent/80 justify-center items-center">
            <Avatar className="h-36 w-36 sm:h-48 sm:w-48">
              <AvatarFallback>{profile?.data.name?.charAt(0)}</AvatarFallback>
              <AvatarImage src={previewProfilePictureUrl} />
            </Avatar>
            <Input
              onChange={handleInputProfilePictureChange}
              type="file"
              className="hidden"
              ref={inputProfilePictureRef}
            />
          </div>
          <div className="flex gap-2 py-4">
            <Button
              onClick={() => inputProfilePictureRef.current?.click()}
              size="sm"
            >
              Change
            </Button>
            <Button
              onClick={() => setSelectedProfilePictureFile(null)}
              variant="secondary"
              size="sm"
            >
              Remove
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-auto w-full justify-center items-center">
          <Wrapper>
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    onSubmit({
                      ...values,
                      profilePictureFile:
                        selectedProfilePictureFile || undefined,
                    })
                  )}
                  className="flex flex-col gap-1"
                >
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your name . . ."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your number . . ."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardContent>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your address . . ."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" type="submit">
                        Save
                      </Button>
                      {onCancel && (
                        <Button
                          onClick={onCancel}
                          size="sm"
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </Wrapper>
        </div>
      </div>
    </>
  );
};
