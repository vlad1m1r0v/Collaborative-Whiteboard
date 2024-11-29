import { LogOut } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

const AuthButton = () => {
  const { user, logout } = useAuth();

  console.log({user});

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} className="flex items-center gap-2 p-5">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={user!.avatarUrl!} />
              <AvatarFallback>{getInitials(user!.firstName!, user!.lastName!)}</AvatarFallback>
            </Avatar>
            <p>{user!.firstName!} {user!.lastName!}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dropdown-content-width-full">
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AuthButton;