import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
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
      <div>
        <Button
          outline
          color="secondary"
          type="button"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  className="form-control"
                  name="rating"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  className="form-control"
                  model=".author"
                  id="name"
                  name="name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="rating">Comment</Label>
                <Control.textarea
                  className="form-control"
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                />
              </Row>
              <Button type="submit" value="submit" className="bg-primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDishDetails({
  dish,
  comments,
  addComment,
  dishId,
  commentsErrMess,
}) {
  var _comments = "";

  if (commentsErrMess == null) {
    _comments = comments.map((comment) => {
      return (
        <div key={comment.id}>
          <CardText>{comment.comment}</CardText>
          <CardText>
            -- {comment.author} ,{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}{" "}
            <br />
            <br />{" "}
          </CardText>
        </div>
      );
    });
  } else {
    _comments = commentsErrMess;
  }

  return (
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardBody>
            <CardTitle>Comments</CardTitle>
            {_comments}
            <CommentForm addComment={addComment} dishId={dishId} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

const DishDetail = (props) => {
  console.log(props);
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <RenderDishDetails
          dish={props.dish}
          comments={props.comments}
          addComment={props.addComment}
          dishId={props.dish.id}
          commentsErrMess={props.commentsErrMess}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
