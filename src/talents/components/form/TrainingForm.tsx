import fr from 'date-fns/locale/fr';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Container, Row, Col } from 'reactstrap';
import InputFormField, { ClassName } from '../../../app/components/utils/InputFormField';
import { UserTraining } from '../../../app';
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
}

interface HandleChange {
  institution: (value: string) => void,
  degreeObtained: (value: string) => void,
  startDate: (value: Date | null) => void,
  endDate: (value: Date | null) => void,
}

export default class TrainingForm extends React.Component<Props> {
  render() {
    const className: ClassName = {
      label: classes['label-training-form'],
      input: classes['input-training-form'],
    };

    return (
      <Container className={this.props.className}>
        <Row>
          <Col md={6}>
            <InputFormField
              id={'training-school' + this.props.idComplement}
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
              id={'training-diploma' + this.props.idComplement}
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
            <label className={classes['label-training-form']}>début formation: </label>
            <ReactDatePicker
              className={classes['datepicker']}
              selected={this.props.training.startDate}
              isClearable
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale={fr}
              onChange={this.props.handleChange.startDate}
            />
          </Col>
          <Col md={6}>
            <label className={classes['label-training-form']}>fin formation: </label>
            <ReactDatePicker
              className={classes['datepicker']}
              selected={this.props.training.endDate}
              isClearable
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale={fr}
              onChange={this.props.handleChange.endDate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
