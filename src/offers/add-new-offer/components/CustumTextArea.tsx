import React from 'react';
import { Job } from '../../../app';

interface Props {
    keyName: string,
    label: string,
    value: string | null,
    setNewJob(newJob: Job): void
    job: Job
}

interface State {
    bold: boolean,
    italized: boolean,
    underlined: boolean,
    textAreaValue: string | undefined | null
}

export class CustumTextArea extends React.Component<Props, State>{
    private myRef: any;

    constructor(props: Props) {
        super(props);

        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicsClick = this.onItalicsClick.bind(this);
        this.onUnderlineClick = this.onUnderlineClick.bind(this);

        this.myRef = React.createRef();

        this.state = {
            bold: false,
            italized: false,
            underlined: false,
            textAreaValue: this.props.value
        };
    }

    onBoldClick(event: any) {
        event.target.setAttribute("class", !this.state.bold ? "SelectedType" : "");

        if (this.state.bold) {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "</strong>"
            })
            this.updateTheOffer(this.myRef.current.textContent + "</strong>");
        } else {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "<strong>"
            });
            this.updateTheOffer(this.myRef.current.textContent + "<strong>");
        }
        this.setState({
            bold: !this.state.bold
        });
    }

    onItalicsClick(event: any) {
        event.target.setAttribute("class", !this.state.italized ? "SelectedType" : "");

        if (this.state.italized) {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "</em>"
            });
            this.updateTheOffer(this.myRef.current.textContent + "</em>");

        } else {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "<em>"
            })
            this.updateTheOffer(this.myRef.current.textContent + "<em>");
        }
        this.setState({
            italized: !this.state.italized

        });
    }
    onUnderlineClick(event: any) {
        event.target.setAttribute("class", !this.state.underlined ? "SelectedType" : "");

        if (this.state.underlined) {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "</u>"
            })
            this.updateTheOffer(this.myRef.current.textContent + "</u>");

        } else {
            this.setState({
                textAreaValue: this.myRef.current.textContent + "<u>"
            })
            this.updateTheOffer(this.myRef.current.textContent + "<u>");
        }
        this.setState({
            underlined: !this.state.underlined

        });
    }

    updateTheOffer(newValue: any) {
        if (this.props.keyName === 'long_description_in_french') {
            this.props.setNewJob({ ...this.props.job, longDescriptionInFrench: newValue });
        } else {
            this.props.setNewJob({ ...this.props.job, longDescriptionInEnglish: newValue });
        }

        this.myRef.current.textContent = newValue;
        this.myRef.current.focus();
        this.setEndOfContenteditable(this.myRef.current);
    }

    setEndOfContenteditable(contentEditableElement: any) {
        var range: any;
        var selection: any;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    render() {
        return (
            <React.Fragment>
                <label className="form-label" htmlFor={this.props.keyName}>
                    {this.props.label}
                </label>
                <div className="generic-field-form-tx-area-custum">
                    <span className="Controls">
                        <button type="button" onClick={this.onBoldClick} ><strong>B</strong></button>
                        <button type="button" onClick={this.onItalicsClick}><em>I</em></button>
                        <button type="button" onClick={this.onUnderlineClick}><u>U</u></button>
                    </span>
                    <div
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        className="textarea"
                        id={this.props.keyName}
                        ref={this.myRef}
                        onInput={(e) => {
                            this.setState({
                                textAreaValue: e.currentTarget.textContent
                            });
                            this.updateTheOffer(e.currentTarget.textContent);

                        }}>
                        {this.props.value}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}