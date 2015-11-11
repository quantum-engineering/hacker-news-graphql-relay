/**
 * @flow
 */

import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"
import Relay from "react-relay"

class NewsItem extends Component {
  render() {

    var {id, title, by, url} = this.props.news;

    return (
      <li key={id}>
        <p>
          <strong>{title}</strong>
        </p>
        <small>{by}</small>
        <a style={{"display": "block"}} href={url}>read more</a>
      </li>
    )
  }
}

NewsItem = Relay.createContainer(NewsItem, {
  fragments: {
    news: () => Relay.QL`
      fragment on News {
        id,
        title,
        by,
        url
      }
    `
  }
})

class NewsStore extends Component {
  render() {
    return (
      <main>
        <div className="button-container">
        </div>
        <ul>
          {this.props.store.news.map((item, index) => {
            return <NewsItem key={index} news={item} />
          })}
        </ul>
      </main>
    )
  }
}

NewsStore = Relay.createContainer(NewsStore, {
  initialVariables: {
    newsType: "top"
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        news(newsType: $newsType) {
          ${NewsItem.getFragment("news")}
        }
      }
    `
  }
})

class NewsRoute extends Relay.Route {
  static routeName = 'News';
  static queries = {
    store: (Component) => Relay.QL`
      query NewsStoreQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

export {
  NewsStore as NewsStore,
  NewsRoute as NewsRoute
}
