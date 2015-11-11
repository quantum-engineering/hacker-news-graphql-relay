/**
 * hacker-news.js
 *
 * A GraphQL schema needs a store and field definition
 * and a schema allows query of a store
 * and wraps the store and wil return the store
 */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import request from "superagent"

const baseURL = "https://hacker-news.firebaseio.com/v0"

function fetchStoryIds(endpoint) {
  endpoint = endpoint || "/newstories"
  return new Promise((resolve, reject) => {
    request
      .get(baseURL + endpoint + ".json")
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          // console.log(res.body)
          resolve(res.body)
        }
      })
  })
}

function fetchSingleItem(id) {
  return new Promise((resolve, reject) => {
    request
      .get(`${baseURL}/item/${id}.json`)
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.body)
        }
      })
  })
}

function fetchAllStories(endpoint) {
  endpoint = endpoint || null;
  return new Promise((resolve, reject) => {
    fetchStoryIds(endpoint)
      .then((ids) => {
        var promises = [];
        ids.forEach((id) => {
          promises.push(fetchSingleItem(id))
        })

        Promise.all(promises).then((results) => {
          resolve(results)
        })
      })
  })
}

const STORE = {
  recent: fetchAllStories().then(results => results),
  top: fetchAllStories("/topstories").then(results => results)
}

var News = new GraphQLObjectType({
  name: "News",
  fields: () => ({
    id:    {type: GraphQLString},
    by:    {type: GraphQLString},
    title: {type: GraphQLString},
    url:   {type: GraphQLString}
  })
})

var NewsStore = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    // news: {type: new GraphQLList(News)},
    // topStories: {type: new GraphQLList(News)}
    news: {
      type: new GraphQLList(News),
      args: {
        newsType: { type: GraphQLString }
      },
      resolve: (_, args) => {
        if (!args.newsType) {
          return STORE.recent
        } else {
          return STORE[args.newsType]
        }
      }
    }
  })
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: NewsStore,
        resolve: () => STORE
      }
    })
  })
})
