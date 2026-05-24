export interface LinkProps {
  id: string;
  href: string;
  ariaLabel: string;
  target?: string;
}

export interface ActionProps {
  id: string;
  ariaLabel: string;
}

export interface UserCardProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface UserPageProps {
  id: string;
}
