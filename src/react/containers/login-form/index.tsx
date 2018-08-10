import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { updateUsername, updatePassword } from '../../../redux/action-creators';
import { State } from '../../../@types/redux-types';
import { Dispatch } from 'redux';

interface StateProps {
  password: string;
  username: string;
}

interface DispatchProps {
  UpdatePassword: (password: string) => void;
  UpdateUsername: (username: string) => void;
}

type Props = StateProps & DispatchProps;

const styles = () => createStyles({});

interface InternalState {
  showPassword: boolean;
}

type FinalInternalState = Readonly<InternalState>;

class LoginForm extends Component<Props & WithStyles<typeof styles>, FinalInternalState> {
  readonly state = {
    showPassword: false,
  };

  static propTypes = {
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    UpdatePassword: PropTypes.func.isRequired,
    UpdateUsername: PropTypes.func.isRequired,
  };

  private changeVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  public render() {
    const { password, UpdatePassword, username, UpdateUsername } = this.props;
    const { showPassword } = this.state;

    return (
      <form>
        <FormControl>
          <InputLabel htmlFor="adornment-username">Username/E-Mail</InputLabel>
          <Input
            id="adornment-username"
            type="text"
            value={username}
            onChange={event => UpdateUsername(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => UpdatePassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility" onClick={this.changeVisibility}>
                  {showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    );
  }
}

const decorateLoginForm = withStyles(styles);

const StyledLoginForm = decorateLoginForm<Props>(LoginForm);

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({ LOGIN: { username, password } }) => ({
  username,
  password,
});

type MapDispatchToProps = (dispatch: Dispatch) => DispatchProps;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  UpdateUsername: (username: string): void => {
    dispatch(updateUsername(username));
  },
  UpdatePassword: (password: string): void => {
    dispatch(updatePassword(password));
  },
});

const ConnectedStyledLoginForm = connect<StateProps, DispatchProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(StyledLoginForm);

export default ConnectedStyledLoginForm;
