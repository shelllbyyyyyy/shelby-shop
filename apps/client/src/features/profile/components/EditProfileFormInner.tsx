import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProfileQuery } from "@shelby/api";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
      name: "",
      phoneNumber: "",
      address: "",
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
      <div className="mb-6 flex items-center gap-6">
        <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
          <AvatarFallback>{profile?.data.name?.charAt(0)}</AvatarFallback>
          <AvatarImage src={previewProfilePictureUrl} />
        </Avatar>
        <Input
          onChange={handleInputProfilePictureChange}
          type="file"
          className="hidden"
          ref={inputProfilePictureRef}
        />
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => inputProfilePictureRef.current?.click()}
            size="sm"
            variant="ghost"
          >
            Change
          </Button>
          <Button
            onClick={() => setSelectedProfilePictureFile(null)}
            variant="destructive"
            size="sm"
          >
            Remove
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({
              ...values,
              profilePictureFile: selectedProfilePictureFile || undefined,
            })
          )}
          className="flex flex-col gap-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex gap-2">
            <Button size="sm" type="submit">
              Save
            </Button>
            {onCancel && (
              <Button onClick={onCancel} size="sm" variant="secondary">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
