import React from 'react';
import { Component } from 'react';
import Home from './homecomponent';
import Contact from './contactcomponent';
import About from './aboutcomponent';
import Header from './headercomponent';
import Footer from './footercomponent';
import Menu from './menucomponent';
import  Dishdetail  from './dishdetailcomponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';





const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
  const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

  });


class Main extends Component{
  constructor(props) {
    super(props);
  }
   
  render() {
    const HomePage=() => {
      return(
        <Home 
           dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
        );
    }
    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
             addComment={this.props.addComment} />
      );
    };

      
    return (
      <div className="App">
          <Header/>
            <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
             <Switch>
              <Route path='/home' component={ HomePage }/>
              <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />              <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders}/>} />
              <Redirect to='/home'/>
            </Switch>
            </CSSTransition>
            </TransitionGroup>
         <Footer/>
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

