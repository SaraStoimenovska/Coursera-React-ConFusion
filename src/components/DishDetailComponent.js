import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  const c = comments.map(comment => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          --{comment.author},{' '}
          {new Intl.DateTimeFormat('en-us', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          }).format(new Date(comment.date))}
        </p>
      </li>
    );
  });
  return (
    <div>
      <h1>Comments</h1>
      <ul className="list-unstyled">{c}</ul>
    </div>
  );
}

const DishDetail = props => {
  console.log('DishDetail Component render invoked');

  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
