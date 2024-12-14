export type NavLinkProps = {
  title: string;
  href?: string;
  icon: ReactNode;
};

export type NavLinksType = {
  title: string;
  href: string;
  icon: ReactNode;
  position: number;
  isHidden: boolean;
};

export type HeaderProps = {
  isAuth?: boolean;
  navlinks: NavLinksType[];
  onSignOut: () => void;
};
