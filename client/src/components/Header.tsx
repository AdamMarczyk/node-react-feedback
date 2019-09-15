import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


interface IHeaderProps {
  auth: any
}

const Header = (props: IHeaderProps) => {
  const renderContent = () => {
    switch (props.auth) {
      case null:
        return 'Still deciding';
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: '0 10px' }}>
            Credits: {props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={props.auth ? '/surveys' : '/'}
          className="left brand-logo"
        >
          Emaily
          </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}

function mapStateToProps({ auth }: any) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
