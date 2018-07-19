import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Form from "react-jsonschema-form";
import TextField from "@material-ui/core/es/TextField/TextField";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Icon from "@material-ui/core/es/Icon/Icon";
import Button from "@material-ui/core/es/Button/Button";


const styles = theme => ({
    hover: {
        position: "relative",
        border: "1px solid transparent",
        transition: "all .2s",
        "&:hover" : {
            border: "1px dashed #aaa"
        }
    },
    closeBtn: {
        position: "absolute",
        top: "-20px",
        right: "-20px"
    }
});
class ViewWrapper extends Component{

    CustomInput = (prop) => {
        return (
            <Paper square elevation={1} className={this.props.classes.hover}>
                <CardContent onClick={() => this.props.changeEditor(prop)}>
                    <TextField fullWidth
                        disabled
                        id="custom"
                        label={prop.schema.title}
                    />
                </CardContent>
                <Button variant="fab" mini color="secondary" className={this.props.classes.closeBtn}>
                    <Icon>close</Icon>
                </Button>
            </Paper>
        );
    };

    CustomCheckbox = (prop) =>{
        return (
            <div>
                {prop.title}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={prop.value}
                            onChange={() => prop.onChange(!prop.value)}
                            value={prop.title}
                        />
                    }
                    label={prop.schema.title}
                />
            </div>
        );
    };

    CustomTitleField = ({title, required}) => {
        const legend = required ? title + '*' : title;
        return <h3 id="custom">{legend}</h3>;
    };

    CustomFieldTemplate = (e) => {
        const {id, className, label, help, required, description, errors, children} = e;
        return <div >{children}</div>;
    };
    render () {
        const {classes} = this.props;
        const fields = {
            TitleField: this.CustomTitleField,
            StringField: this.CustomInput

        };

        const widgets = {
            CheckboxWidget: this.CustomCheckbox
        };



        return (
            <Au>
                <Form schema={this.props.schema}
                      fields={fields}
                      widgets={widgets}
                      FieldTemplate={this.CustomFieldTemplate}
                      uiSchema={this.props.uiSchema}
                >
                    <div>
                    </div>
                </Form>
            </Au>
        );
    }
};

ViewWrapper.propTypes = {};
ViewWrapper.defaultProps = {};

export default withStyles(styles, {withTheme: true})(ViewWrapper);