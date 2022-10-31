import React, {Key} from 'react';
import * as styles from '../../styles/templates/Shared/Footer.module.scss';
import {Link} from 'gatsby';

interface Props {
  footerData: any,
}

const Footer:React.FC<Props> = ({footerData}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>{footerData && footerData['single_line']}</p>
        </div>
        <div className={styles.policyLinks}>
          {footerData?.bottomnavigation
              .map((navs: any, index: Key) => {
                // console.log('navs ', navs);
                // const link =
                // utils.getLocalizedPageLink(data?.locale, navs.url);
                return <Link key={index} to="/">{navs.title}</Link>;
              })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// TODO: fix nav links for footer
