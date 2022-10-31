import {Link} from 'gatsby';
import React, {useState} from 'react';
import * as styles from '../../styles/templates/Shared/Header.module.scss';

const Header:React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.header_leftSection}>
        <Link to="/">
          <img src="/images/logo/header-logo.svg"
            alt="brand"
            className={styles.brandLogo}
          />
        </Link>
      </div>
      <div className={styles.header_rightSection}>
        <p>Sign In</p>
      </div>
    </header>
  );
};

export default Header;
