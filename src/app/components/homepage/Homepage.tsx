import React from 'react';
import { RootState } from '../../state/store';
import { connect } from 'react-redux';
import { Module } from '../../index.d';
import './styles/Homepage.css';

interface Props {
  modules: Module[],
}

export class Homepage extends React.Component<Props> {
  render() {
    return (
      <div>
        <article className="container">
          <div className="section-top-border">
            <div className="row row-homepage">
              { this.props.modules.map((module, index) =>
                <div className="col-md-4 col-sm-12 my-2" key={ index }>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ module.name }</h5>
                      <p className="card-text">{ module.description }</p>
                      <a className="link-text" href="/">{ module.linkText }</a>
                    </div>
                  </div>
                </div>) }
            </div>
          </div>
        </article>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({ modules: state.modules.list });

export default connect(mapState)(Homepage);
