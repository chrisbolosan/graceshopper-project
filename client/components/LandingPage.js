import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import AboutCompany from './AboutCompany';
import Ratings from './Ratings';

import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
              Ray's Kitchen
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const carousel = [
  {
    label: 'Prepped by Professionals',
    imgPath:
      'https://img.freepik.com/free-photo/portrait-asian-woman-mixing-salad-kitchen_23-2148076172.jpg?size=626&ext=jpg',
  },
  {
    label: '',
    imgPath:
      'https://limetray.com/blog/wp-content/uploads/2019/07/group-of-chefs-holding-plate-of-prepared-food-in-62MPWNQ-e1563435447331-1200x800.jpg',
  },
  {
    label: '',
    imgPath:
      'https://cdn.hellofresh.com/us/user-guides/meal-prepping/HelloFresh-Instagram-feed.jpg',
  },
  {
    label: 'Easily order from your mobile device',
    imgPath:
      'https://cdn.shopify.com/s/files/1/1835/6931/files/Check_if_we_deliver_to_you_photo_2048x.jpg?v=1580318142',
  },
  {
    label: '',
    imgPath:
      'https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/Safe%20food.jpg',
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    display: 'block',
    maxWidth: 800,
    overflow: 'hidden',
    width: '100%',
  },
  productRoot: {
    maxWidth: 345,
    width: 300,
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
}));
function LandingPage(props) {
  const { getCart, userId, isLoggedIn } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = carousel.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  useEffect(() => {
    if (isLoggedIn) {
      getCart(userId);
    }
  }, []);
  return (
    <div>
      <AboutCompany id="raysbanner" />
      <Typography gutterBottom variant="h6" component="h6" id="reviewbanner">
        Reviews from our customers
      </Typography>
      <Ratings />

      <section id="stepper">
        <div className={classes.root}>
          <Paper square elevation={0} className={classes.header}>
            <Typography>{carousel[activeStep].label}</Typography>
          </Paper>
          <Link to="/products">
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {carousel.map((step, index) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img
                      className={classes.img}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>{' '}
          </Link>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
      </section>
      <Copyright />
    </div>
  );
}
//export default LandingPage;
const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(LandingPage);
