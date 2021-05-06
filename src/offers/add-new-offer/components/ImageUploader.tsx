import { Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';

interface Props {
    handleChange(e: React.ChangeEvent<any>): void,
    handleBlur(e: React.ChangeEvent<any>): void,
    onImageChange(e: React.ChangeEvent<any>): void,
    errors: string | undefined,
    touched: boolean | undefined,
    className: string,
    InputProps: Object,
}

class ImageUploader extends Component<Props> {
    render() {
        return (
            <Grid item
                xs={6}
            >
                <TextField
                    name="picture"
                    id="picture"
                    label=""
                    type="file"
                    onChange={this.props.onImageChange}
                    onBlur={this.props.handleBlur}
                    className={this.props.className}
                    helperText={
                        this.props.errors && this.props.touched
                            ? this.props.errors
                            : ''
                    }
                    error={
                        this.props.errors && this.props.touched
                            ? true
                            : false
                    }
                    InputProps={this.props.InputProps}
                />
            </Grid>
        );
    }
}

export default ImageUploader;