import { Grid, TextField } from '@material-ui/core';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React from 'react';
import { IsFormValid } from '../..';
import ImageUploader from './ImageUploader';
import useStyles from './UseStyles';
import { Editor } from '@tinymce/tinymce-react';
import { Job } from '../../../app';

interface Props {
    handleChange(e: React.ChangeEvent<any>): void,
    handleBlur(e: React.ChangeEvent<any>): void,
    onImageChange(e: React.ChangeEvent<any>): void,
    values: FormikValues,
    errors: FormikErrors<IsFormValid>,
    touched: FormikTouched<IsFormValid>,
    setNewJob(newJob: Job): void,
}

const FormBody = (props: Props) => {
  const { handleChange, handleBlur, onImageChange, values, errors, touched, setNewJob } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={6}
        >
          <TextField
            name="titleInFrench"
            id="titleInFrench"
            label="Titre en Français*"
            value={values.titleInFrench}
            type="text"
            error={
              errors.titleInFrench && touched.titleInFrench
                ? true
                : false
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            helperText={
              errors.titleInFrench && touched.titleInFrench
                ? errors.titleInFrench
                : ''
            }
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
          />
        </Grid>
        <Grid item
          xs={6}
        >
          <TextField
            name="titleInEnglish"
            id="titleInEnglish"
            label="Titre en Anglais"
            value={values.titleInEnglish}
            type="text"
            helperText={
              errors.titleInEnglish && touched.titleInEnglish
                ? 'Veuillez entrer un titre valide' : ''
            }
            error={
              errors.titleInEnglish && touched.titleInEnglish
                ? true
                : false
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          name="shortDescriptionInFrench"
          id="shortDescriptionInFrench"
          label="Description Courte en Français"
          value={values.shortDescriptionInFrench}
          type="text"
          helperText={
            errors.shortDescriptionInFrench &&
                            touched.shortDescriptionInFrench
              ? errors.shortDescriptionInFrench
              : ''
          }
          error={
            errors.shortDescriptionInFrench &&
                            touched.shortDescriptionInFrench
              ? true
              : false
          }
          onChange={handleChange}
          onBlur={handleBlur}
          className={classes.textField}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          name="shortDescriptionInEnglish"
          id="shortDescriptionInEnglish"
          label="Description Courte en Anglais"
          value={values.shortDescriptionInEnglish}
          type="text"
          helperText={
            errors.shortDescriptionInEnglish &&
                            touched.shortDescriptionInEnglish
              ? errors.shortDescriptionInEnglish
              : ''
          }
          error={
            errors.shortDescriptionInEnglish &&
                            touched.shortDescriptionInEnglish
              ? true
              : false
          }
          onChange={handleChange}
          onBlur={handleBlur}
          className={classes.textField}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
        />
      </Grid>
      <Grid item xs={12}>
        <label className="description">Description longue en Français</label>
        <Editor
          apiKey="don4t29heo2t22rdm0878kctdd1dhc1sinmdr0arnjfoaljf"
          initialValue={values.longDescriptionInFrench}
          init={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            height: 400,
          }}
          onChange={(e) => {
            setNewJob({ ...values.longDescriptionInFrench, longDescriptionInFrench: e.target.getContent() });
            console.log(e.target);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <label className="description">Description longue en Anglais</label>
        <Editor
          apiKey="don4t29heo2t22rdm0878kctdd1dhc1sinmdr0arnjfoaljf"
          initialValue={values.longDescriptionInEnglish}
          init={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            height: 400,
          }}
          onChange={(e) => {
            setNewJob({ ...values.longDescriptionInEnglish, longDescriptionInEnglish: e.target.getContent() });
            console.log(e.target);
          }}
        />
      </Grid>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={6}
        >
          <TextField
            name="linkFrench"
            id="linkFrench"
            label="Lien en Français"
            value={values.linkFrench}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            helperText={
              errors.linkFrench && touched.linkFrench
                ? errors.linkFrench
                : ''
            }
            error={
              errors.linkFrench && touched.linkFrench
                ? true
                : false
            }
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
          />
        </Grid>
        <Grid item
          xs={6}
        >
          <TextField
            name="linkEnglish"
            id="linkEnglish"
            label="Lien en Anglais"
            value={values.linkEnglish}
            type="text"
            helperText={
              errors.linkEnglish && touched.linkEnglish
                ? errors.linkEnglish
                : ''
            }
            error={
              errors.linkEnglish && touched.linkEnglish
                ? true
                : false
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}>
        <Grid item
          xs={6}
        >
          <TextField
            name="position"
            id="position"
            label="Position"
            value={values.position}
            type="text"
            helperText={
              errors.position && touched.position
                ? errors.position
                : ''
            }
            error={
              errors.position && touched.position
                ? true
                : false
            }
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{ style: { fontSize: 20, marginLeft: '20px', color: 'black' } }}
          />
        </Grid>
        <ImageUploader
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.picture}
          touched={touched.picture}
          onImageChange={onImageChange}
          className={classes.textField}
          InputProps={{
            classes: {
              input: classes.resizeFile,
            },
          }} />
      </Grid>
    </React.Fragment>
  );
};

export default FormBody;