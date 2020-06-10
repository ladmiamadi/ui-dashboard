import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../state/store';
import { connect } from 'react-redux';
import { Module } from '../../index';
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
                <div className="col-md-4 col-sm-12 my-2" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ module.name }</h5>
                      <p className="card-text">{ module.description }</p>
                      <Link to={module.link}>{ module.linkText }</Link>
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

const mapState = (state: RootState) => ({ modules: state.modules.modules });

export default connect(mapState)(Homepage);
