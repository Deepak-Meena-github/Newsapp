import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 5,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    console.log("Hello, I am the constructor from the News component");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

  }

  async componentDidMount() {
    console.log("componentDidMount");
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.pageSize !== this.props.pageSize ||
      prevProps.category !== this.props.category
    ) {
      this.fetchNews();
    }
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=368b124a0c9f4432aacad46104c5c6ed&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
  };
  updateNews = async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=368b124a0c9f4432aacad46104c5c6ed&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
}

  handleNextClick = async () => {
    console.log('next');
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    if (!(this.state.page + 1 > totalPages)) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=368b124a0c9f4432aacad46104c5c6ed&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();

      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        loading: false
      });
    }
  };
 

  handlePreviousClick = async () => {
   
    

    this.setState({
      
      page: this.state.page - 1,
      
    });
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">NewsMonkey - Top {capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 30) : ""}
                description={element.description ? element.description.slice(0, 70) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
