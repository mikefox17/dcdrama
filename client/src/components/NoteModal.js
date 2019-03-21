import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addArticles } from "../actions/articleActions";
import uuid from "uuid";

class NoteModal extends Component {
  state = {
    modal: false,
    note: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.note]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newNote = {
      id: uuid(),
      note: this.state.note
    };

    //add niote via add action
    this.props.addArticles(newNote);

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="primary" className="btn" onClick={this.toggle}>
          Add note
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Leave your note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input
                  type="text"
                  note="note"
                  id="note"
                  placeholder="add a note"
                  onChange={this.onChange}
                />
                <br />
                <Button className="btn-block" color="primary">
                  Add{" "}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { addArticles }
)(NoteModal);
