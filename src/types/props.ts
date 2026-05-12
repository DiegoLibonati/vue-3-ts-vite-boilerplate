export interface DefaultProps {
  className?: string;
}

export interface LinkProps extends DefaultProps {
  id: string;
  href: string;
  ariaLabel: string;
  target?: string;
}

export interface ActionProps extends DefaultProps {
  id: string;
  ariaLabel: string;
}

export interface UserCardProps extends DefaultProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}
