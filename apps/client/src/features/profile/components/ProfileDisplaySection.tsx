import { useGetProfileQuery } from "@shelby/api";

import Wrapper from "@/app/admin/_components/Wrapper";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileDisplaySection {
  onEditProfile: () => void;
}

export const ProfileDisplaySection: React.FC<ProfileDisplaySection> = ({
  onEditProfile,
}) => {
  const { data: profile } = useGetProfileQuery({});

  return (
    <div className="flex flex-col h-screen w-full gap-4 lg:gap-8">
      <div className="flex h-72 w-full justify-center items-center bg-accent/80">
        <Avatar className="h-36 w-36 sm:h-48 sm:w-48">
          <AvatarFallback>{profile?.data.name?.charAt(0)}</AvatarFallback>
          <AvatarImage src={profile?.data.profilePictureUrl!} />
        </Avatar>
      </div>

      <div className="flex flex-col h-auto w-full justify-center items-center">
        <Wrapper>
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
                <p className="text-sm md:text-md">Name :</p>
                <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                  {profile?.data.name}
                </h3>
              </div>
            </CardContent>
            <CardContent className="flex">
              <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
                <p className="text-sm md:text-md">Phone Number :</p>
                <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                  {profile?.data.phoneNumber}
                </h3>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onEditProfile} variant="secondary">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </Wrapper>
      </div>
    </div>
  );
};
