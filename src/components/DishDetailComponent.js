import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDishDetails({ dish, comments}) {
        
        const _comments = comments.map((comment) => {
            return (
                <div key={ comment.id }>
                    <CardText>{ comment.comment }</CardText>
                    <CardText>-- { comment.author } , { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format( new Date( Date.parse(comment.date) )) } <br/><br/> </CardText>                        
                </div>
            )
        });

        return (
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{ dish.name }</CardTitle>
                  <CardText>{ dish.description }</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardBody>
                  <CardTitle>Comments</CardTitle>
                  { _comments }
                </CardBody>
              </Card>
            </div>
          </div>
        );
    }                

    const DishDetail = (props) => {
        console.log(props);
        if (props.dish != null) {
            return(
                <div>
                  <div className="row">
                    <Breadcrumb>                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{ props.dish.name }</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{ props.dish.name }</h3>
                        <hr />
                    </div>
                </div>
                  <RenderDishDetails 
                    dish={ props.dish }
                    comments={ props.comments }
                  />
                </div>
            );
        } else {
           return(
               <div></div>
           ) 
        }        
    }

export default DishDetail;