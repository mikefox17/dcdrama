import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ResultArticle from "./components/ResultArticle";
import { Provider } from "react-redux";
import store from "./store";
import NoteModal from "./components/NoteModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ResultArticle />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
