import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import useStyles from './UseStyles';
import { Job } from '../../../app';
import { RootDispatch, RootState } from '../../../app/state/store';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import FormFooter from './FormFooter'
import { isValueExists } from '../../state/models/helpers/OffersHelpers';
import history from '../../../app/helpers/history';
import _ from 'lodash';
import { apiService } from '../../../app/http/service';
import { IsFormValid } from '../..';
import FormBody from './FormBody';

interface Props {
    setNewJob(newJob: Job): void,
    job: Job,
    createOffer: (job: Job) => Promise<Job | null>,
    positionCollection: string[],
    linkFrenchCollection: string[],
    linkEnglishCollection: string[],
    updateSelectedOffer: (selectedOffer: Job) => void,
}

interface State {
    addEdit: boolean,
    formErrors: boolean,
    imageFile: File,
}

class NewOfferForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            addEdit: false,
            imageFile: new File([''], ''),
            formErrors: false,
        };

        this.setAddEdit = this.setAddEdit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.setFormErrors = this.setFormErrors.bind(this);
    };

    setAddEdit() {
        this.setState({ addEdit: true });
    }

    onImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.files && event.target.files[0]) {
            let image = event.target.files[0];
            this.setState({
                imageFile: image
            });
        }
    }

    setFormErrors() {
        this.setState({ formErrors: true });
    }

    fileUploadHandler = async (file: File) => {
        const formData = new FormData();

        formData.append('uploadFile', file, file.name);

        const { data } = await apiService.post('/api/upload/images', formData)
    }

    redirectToOfferEdition(newCreatedOffer: Promise<Job | null>) {
        newCreatedOffer.then(job => {
            if (job != null) {
                this.props.updateSelectedOffer(_.cloneDeep(job));
                history.push('/dashboard/our-offers/edit/' + job.id);
            }
        });
    }

    render() {
        return (
            <div >
                <Formik
                    initialValues={{
                        titleInFrench: '',
                        titleInEnglish: '',
                        shortDescriptionInFrench: '',
                        shortDescriptionInEnglish: '',
                        longDescriptionInFrench: '',
                        longDescriptionInEnglish: '',
                        position: '',
                        linkEnglish: '',
                        linkFrench: '',
                        picture: '',
                    }}

                    onSubmit={(values: IsFormValid, actions) => {
                        this.props.setNewJob({
                            ...this.props.job, titleInFrench: values.titleInFrench,
                            titleInEnglish: values.titleInEnglish,
                            shortDescriptionInFrench: values.shortDescriptionInFrench,
                            shortDescriptionInEnglish: values.shortDescriptionInEnglish,
                            linkFrench: values.linkFrench,
                            linkEnglish: values.linkEnglish,
                            position: values.position,
                            picture: this.state.imageFile.name
                        });

                        this.fileUploadHandler(this.state.imageFile);

                        if (this.state.addEdit) {
                            this.redirectToOfferEdition(this.props.createOffer(this.props.job));
                        } else {
                            this.props.createOffer(this.props.job);
                            setTimeout(() => { actions.setSubmitting(false) }, 500);
                            actions.resetForm();
                            history.push('/dashboard/our-offers/');
                        }
                    }
                    }

                    validationSchema={Yup.object().shape({
                        titleInFrench: Yup.string()
                            .required('Champs requis!')
                            .matches(/^[a-zA-Z]+$/),

                        position: Yup.string()
                            .test({
                                name: "position test",
                                message: "Cette Position existe déja!",
                                test: value => {
                                    return !isValueExists(value, this.props.positionCollection)
                                }
                            }),

                        linkFrench: Yup.string()
                            .test({
                                name: "position test",
                                message: "Ce lien existe déja!",
                                test: value => {
                                    return !isValueExists(value, this.props.linkFrenchCollection)
                                }
                            }),

                        linkEnglish: Yup.string()
                            .test({
                                name: "position test",
                                message: "Ce lien existe déja!",
                                test: value => {
                                    return !isValueExists(value, this.props.linkEnglishCollection)
                                }
                            }),
                    })}
                >
                    {(props: FormikProps<IsFormValid>) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleBlur,
                            handleChange,
                            resetForm,
                        } = props
                        const classes = useStyles();

                        return (
                            <Form
                                className={classes.form}>
                                <Grid
                                    container
                                    justify="space-around"
                                    direction="row"
                                >
                                    <FormBody
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors}
                                        touched={touched}
                                        values={values}
                                        onImageChange={this.onImageChange}

                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <FormFooter
                                        resetForm={resetForm}
                                        setAddEdit={this.setAddEdit}
                                    />
                                </Grid>
                                <p>{this.state.formErrors ? 'Le forumaire contient des erreurs' : ''}</p>
                            </Form>
                        )
                    }}
                </Formik>
            </div >
        );
    }
}

const mapState = (state: RootState) => ({
    job: state.job.newJob,
    positionCollection: state.job.positionCollection,
    linkFrenchCollection: state.job.linkFrenchCollection,
    linkEnglishCollection: state.job.linkEnglishCollection,
});

const mapDispatch = (dispatch: RootDispatch) => ({
    createOffer: dispatch.job.postNewOfferInDb,
    setNewJob: dispatch.job.setNewJob,
    updateSelectedOffer: dispatch.selectedOffer.updateSelectedOffer
});

export default connect(mapState, mapDispatch)(NewOfferForm);

