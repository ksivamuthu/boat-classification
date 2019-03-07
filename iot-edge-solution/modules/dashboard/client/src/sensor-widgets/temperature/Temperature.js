import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      textAlign: 'center',
      width: 275,
    },
    title: {
      fontSize: 14,
    }
};  
class TemperatureWidget extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }

    render() {
      return <Card className={this.props.classes.card}>
        <CardContent>
          <Typography className={this.props.classes.title} color="textPrimary" gutterBottom>
            Temperature
          </Typography>
          <hr/>
          <Typography variant="h3" component="h2">
              {this.props.temperature}
          </Typography>
        </CardContent>
      </Card>
    }
}

TemperatureWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    temperature: PropTypes.number.isRequired
};
  
export default withStyles(styles)(TemperatureWidget)
