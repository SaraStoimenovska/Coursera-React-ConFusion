import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish)
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(dish) {
    if (dish) {
      const comments = dish.comments.map(comment => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              --{comment.author},{' '}
              {new Intl.DateTimeFormat('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(comment.date))}
            </p>
          </li>
        );
      });
      return (
        <div>
          <h1>Comments</h1>
          <ul className="list-unstyled">{comments}</ul>
        </div>
      );
    } else return <div></div>;
  }

  render() {
    const dish = this.props.selectedDish;
    if (dish) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">{this.renderDish(dish)}</div>
          <div className="col-12 col-md-5 m-1">{this.renderComments(dish)}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
