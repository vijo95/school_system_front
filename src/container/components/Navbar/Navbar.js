import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../../store/actions/auth";

class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { authenticated } = this.props;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          { authenticated ?
            <>
              <Link to="/">
                <Menu.Item
                  name='inicio'
                  active={activeItem === 'inicio'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Menu.Item
                position='right'
                name='salir'
                active={activeItem === 'salir'}
                onClick={
                  this.handleItemClick, 
                  () => this.props.logout()
                }
              />
            </>:
            <>
              <Link to="/login/">
                <Menu.Item
                    name='Entrar'
                    active={activeItem === 'inicio'}
                    onClick={this.handleItemClick}
                  />
              </Link>
            </>
          }
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    task_test: null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
)