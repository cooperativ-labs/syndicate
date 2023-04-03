import cn from 'classnames';
import React from 'react';

interface NavLinkProps {
  link: string;
  text: string;
  disabled?: boolean;

  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ link, text, disabled, external }) => {
  return (
    <a href={!disabled && link} target={external && '_blank'} rel={external && 'noreferrer'}>
      <span
        className={cn(
          'uppercase font-semibold text-sm hover:text-cGold mr-3 md:mr-10',

          disabled && 'text-opacity-50'
        )}
      >
        {text}
      </span>
    </a>
  );
};

export default NavLink;
