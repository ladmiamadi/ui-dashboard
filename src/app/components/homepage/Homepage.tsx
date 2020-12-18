import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Module } from '../../index.d';
import { RootDispatch, RootState } from '../../state/store';
import './styles/Homepage.css';

interface Props {
  modules: Module[],
  fetchModules: () => Promise<void>,
}

export class Homepage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.fetchModules();
  }

  render() {
    return (
      <div>
        <article className="container">
          <div className="section-top-border">
            <div className="row row-homepage">
              {this.props.modules.map((module, index) =>
                <div className="col-md-4 col-sm-12 my-2" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{module.name}</h5>
                      <p className="card-text">{module.description}</p>
                      <Link to={module.link}>{module.linkText}</Link>
                    </div>
                  </div>
                </div>,
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({ modules: state.modules.modules });

const mapDispatch = (dispatch: RootDispatch) => ({
  fetchModules: dispatch.modules.fetchModules,
});

export default connect(mapState, mapDispatch)(Homepage);
