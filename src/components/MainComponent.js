import React, { Component } from 'react';
import Menu from './MenuComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'))
  },
  fetchComments: () => {
      dispatch(fetchComments());
    },
  fetchPromos: () => {
      dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => 
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMsg}
          promotion={
            this.props.promotions.promotions.filter(promotion => promotion.featured)[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errMsg}
          leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMsg={this.props.leaders.errMsg}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === +match.params.id
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMsg}
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === +match.params.id
          )}
          commentErrMsg={this.props.comments.errMsg}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route
                exact
                path='/menu'
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path='/menu/:id' component={DishWithId} />} />
              <Route
                exact
                path='/contactus'
                component={() => (
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>
                )}
              />
              <Route
                exact
                path='/aboutus'
                component={() => <About leaders={this.props.leaders} />}
              />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
