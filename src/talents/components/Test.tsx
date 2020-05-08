import React from 'react';

interface Props {
  userId: number,
}

export class Test extends React.Component <Props>{
  render(){
    return("Vous avez été correctement redirigé sur la page de l'user "+ this.props.userId +" !");
  }
}