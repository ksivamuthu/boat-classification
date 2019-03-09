import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      textAlign: 'center',
      width: 200,
    },
    title: {
      fontSize: 14,
    }
};  
class WindWidget extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }

    render() {
      return <Card className={this.props.classes.card}>
        <CardContent>
          <Typography className={this.props.classes.title} color="textPrimary" gutterBottom>
            Wind
          </Typography>
          <hr/>
          <Grid container justify="center" alignItems="center">
            <Grid>              
              <h2>{this.props.wind.speed}</h2>                  
            </Grid>
            <Grid>
              <span>&nbsp;mph</span>
            </Grid>
          </Grid>
          <span>{this.props.wind.direction}</span>        
        </CardContent>
      </Card>
    }
}

WindWidget.propTypes = {
    classes: PropTypes.object.isRequired,
    wind: PropTypes.object.isRequired
};
  
export default withStyles(styles)(WindWidget)
