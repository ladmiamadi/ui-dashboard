import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InputFormField, { ClassName } from '../../../app/components/utils/InputFormField';
import { UserTraining } from '../../../app';
import DateSlicer from '../../helpers/DateSlicer';
import classes from './styles/TrainingForm.module.css';

interface Props {
  className?: string
  idComplement?: number,
  isFieldInvalid?: IsFieldValid,
  training: UserTraining,
  handleChange: HandleChange,
}

interface IsFieldValid {
  institution: boolean,
  degreeObtained: boolean,
  startDate: boolean,
  endDate: boolean,
}

interface HandleChange {
  institution: (value: string) => void,
  degreeObtained: (value: string) => void,
  startDate: (value: string) => void,
  endDate: (value: string) => void,
}

export default class TrainingForm extends React.Component<Props> {
  render() {
    const className: ClassName = {
      label: classes['label-training-form'],
      input: classes['input-training-form'],
    };
;
    return (
      <Container className={this.props.className}>
        <Row>
          <Col md={6}>
            <InputFormField
              id={"training-school" + this.props.idComplement}
              invalid={this.props.isFieldInvalid?.institution}
              label="École: "
              type="text"
              className={className}
              value={this.props.training.institution}
              handleChange={this.props.handleChange.institution}
            />
          </Col>
          <Col md={6}>
            <InputFormField
              id={"training-diploma" + this.props.idComplement}
              invalid={this.props.isFieldInvalid?.degreeObtained}
              label="Diplôme obtenu: "
              type="text"
              className={className}
              value={this.props.training.degreeObtained}
              handleChange={this.props.handleChange.degreeObtained}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <InputFormField
              id={"training-start" + this.props.idComplement}
              invalid={this.props.isFieldInvalid?.startDate}
              label="Début formation: "
              type="date"
              className={className}
              value={DateSlicer.getYearMonthDay(this.props.training.startDate)}
              handleChange={this.props.handleChange.startDate}
            />
          </Col>
          <Col md={6}>
            <InputFormField
              id={"training-end" + this.props.idComplement}
              invalid={this.props.isFieldInvalid?.endDate}
              label="Fin formation: "
              type="date"
              className={className}
              value={DateSlicer.getYearMonthDay(this.props.training.endDate)}
              handleChange={this.props.handleChange.endDate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}