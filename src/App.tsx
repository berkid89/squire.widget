import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getVerionInfo } from './actions';
import { loadSettings } from './actions';

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await this.props.loadSettings();
    await this.props.getVerionInfo("5aae50054fb5aa123c8f8548", "DEV");
  }


  public render() {
    return (
      this.props.software && <div className="test">
        {this.props.software.name} -
        <span> {this.props.software.releaseNotes[0].versionNumber}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    software: state.app.software
  };
};

export default connect(mapStateToProps, { loadSettings, getVerionInfo })(App);
