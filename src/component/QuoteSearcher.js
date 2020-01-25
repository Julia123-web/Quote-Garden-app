import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    totalLikes: 0,
    totalDislikes: 0,
    searchText: ""
  };

  componentDidMount = async () => {
    const response = await fetch(
      "https://quote-garden.herokuapp.com/quotes/search/tree"
    );
    const parsedData = await response.json();
    const quoteData = parsedData.results;
    console.log(parsedData);
    console.log(quoteData);
    this.setState({
      loading: false,
      quotes: quoteData
    });
  };
  incrementLikes = () => {
    this.setState({
      totalLikes: this.state.totalLikes + 1
    });
  };
  incrementDislikes = () => {
    this.setState({
      totalDislikes: this.state.totalDislikes + 1
    });
  };

  setSearchText = () => {
    this.setState({
      searchText: document.getElementById("inputSearch").value
    });
  };

  render() {
    const searchTxt = this.state.searchText;
    const authorList = this.state.quotes;
    const searchQuotes = authorList.filter(function(search) {
      return search.quoteText.includes(searchTxt);
    });

    const quotesList = searchQuotes.map((quotes, index) => (
      <Quote
        key={index}
        author={quotes.quoteAuthor}
        text={quotes.quoteText}
        incrementLike={this.incrementLikes}
        incrementDislike={this.incrementDislikes}
      />
    ));

    console.log(authorList);
    console.log(quotesList);
    return (
      <div>
        <input id="inputSearch" type="Text"></input>
        <button onClick={this.setSearchText}> Search! </button>
        <div>
          <h2>
            Likes {this.state.totalLikes} / Dislikes {this.state.totalDislikes}
          </h2>
        </div>
        <div>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ul>{quotesList}</ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
