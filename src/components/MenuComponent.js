import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
    console.log("Menu Component's constructor is invoked");
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  //   renderDish(dish) {
  //     if (dish != null) {
  //       return (
  //         <Card>
  //           <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
  //           <CardBody>
  //             <CardTitle>{dish.name}</CardTitle>
  //             <CardText>{dish.description}</CardText>
  //           </CardBody>
  //         </Card>
  //       );
  //     } else {
  //       return <div></div>;
  //     }
  //   }

  componentDidMount() {
    console.log("Menu Component's componentDidMount is invoked");
  }

  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardImgOverlay>
              <CardText>{dish.name}</CardText>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    console.log("Menu Component's render is invoked");

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <DishDetail selectedDish={this.state.selectedDish} />
        {/* <div className="row">{this.renderDish(this.state.selectedDish)}</div> */}
      </div>
    );
  }
}

export default Menu;
