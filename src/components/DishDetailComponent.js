import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

function RenderDish({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card>
        <CardImg width='100%' src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4>Comments</h4>
        <ul className='list-unstyled'>
          {comments.map(comment => {
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
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else return <div></div>;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-lg'></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Label htmlFor='rating' md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model='.rating'
                    name='rating'
                    className='form-control'
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='author' md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    className='form-control'
                    placeholder='Your Name'
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment' md={12}>
                  Your Feedback
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Button type='submit' value='submit' color='primary'>
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const DishDetail = props => {
  console.log('DishDetail Component render invoked');

  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMsg) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMsg}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Menu</h3> <hr />
          </div>
        </div>
        <div className='row'>
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
