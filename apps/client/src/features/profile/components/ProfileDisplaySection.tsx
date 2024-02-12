import { useGetProfileQuery } from "@shelby/api";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfileInfoItem } from ".";

interface ProfileDisplaySection {
  onEditProfile: () => void;
}

export const ProfileDisplaySection: React.FC<ProfileDisplaySection> = ({
  onEditProfile,
}) => {
  const { data: profile } = useGetProfileQuery({});

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
            <AvatarFallback>{profile?.data.name?.charAt(0)}</AvatarFallback>
            <AvatarImage src={profile?.data.profilePictureUrl || ""} />
          </Avatar>
          <div className="flex flex-col justify-center truncate">
            <h3 className="truncate text-xl font-semibold sm:text-2xl">
              {profile?.data.name}
            </h3>
          </div>
        </div>
        <Button
          onClick={onEditProfile}
          className="hidden self-center lg:inline-block"
          variant="secondary"
        >
          Edit Profile
        </Button>
      </div>

      <Button
        onClick={onEditProfile}
        className="w-full lg:hidden"
        variant="secondary"
      >
        Edit Profile
      </Button>
    </div>
  );
};
