import React, { Component } from "react";
import { Container, ListGroup, Button, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getArticles,
  deleteArticles,
  scrapeArticles,
  saveArticle
} from "../actions/articleActions";
import PropTypes from "prop-types";
import axios from "axios";

class ResultArticle extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  onClick() {
    this.props.scrapeArticles();
  }

  onDeleteClick = id => {
    this.props.deleteArticles(id);
  };

  onSaveClick = id => {
    this.props.saveArticle(id);
  };

  render() {
    const { articles } = this.props.article;
    return (
      <Container>
        <br />
        <br />
        <Button
          className="btn-sm"
          id="scrape"
          color="primary"
          onClick={scrapeArticles()}
        >
          Get some drama!
        </Button>

        <Button
          className="remove-btn float-right btn-sm"
          color="danger"
          onClick={this.onDeleteClick.bind(this)}
        >
          DELETE ALL DRAMA
        </Button>
        <br />
        <br />
        <ListGroup>
          <TransitionGroup className="article-list">
            {articles.map(({ id, title, link, note }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {title} <br />
                  <a href={link} target="_blank">
                    Read the drama!!
                  </a>
                  {note}
                  <Button
                    className="remove-btn float-right btn-sm"
                    color="danger"
                    onClick={this.onSaveClick.bind(this)}
                  >
                    Save
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ResultArticle.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticles, deleteArticles, saveArticle }
)(ResultArticle);
