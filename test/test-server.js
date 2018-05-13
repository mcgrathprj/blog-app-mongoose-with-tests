'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { BlogPost } = require('./models.js');

const {app, runServer, closeServer} = require('../server.js');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

function seedBlogPostsData() {
  console.log("Seeding data"); 
  const seedData = [];

  for (let i=1, i<=10, i++) {
    seedData.push(generateBlogPostsData());
  } 
  return BlogPost.insertMany(seedData);
} 

function generateTitles() {
  const titles = [
    'Blog Post #1', 'Blog Post #2', 'Blog Post #3', 'Blog Post #4', 'Blog Post #5']
    return titles[Math.floor(Math.random() * titles.length)];
}

function generateContents() {
  const contents = [
    'This is a blog post abuot topic A', 'This is a post about topic B', 'Ten things you need to know about topic C', 'What you never knew about topic D', 'Sentence about topic E']
    return contents[Math.floor(Math.random() * contents.length)];
}

function generateAuthors() {
  const firstNames = ['Jane', 'Michael', 'Rafael', 'Fabian', 'Luisa']
  const lastNames = ['Villanueva', 'Cordero', 'Solano', 'Regalo del Cielo', 'Alver']
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]; 
  return {
    firstName: firstName,
    lastName: lastName
  };
}

function generateBlogPostsData {
  return {
    title: generateTitles(),
    content: generateContents(),
    author: generateAuthors()
  };
}

function tearDownDB() {
  console.warn('Tearing down database!');
  return mongoose.connection.dropDatabase();
}

describe('Blog Posts Api', function(){
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedRestaurantData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
});

describe('GET endpoint',function(){
  it('should return all posts',function(){
    let res;
    return chai.request(app)
      .get('/posts')
      .then(function(_res) {
      res = _res;
      expect(res).to.have.status(200);
      expect(res.body.posts).to.have.lengthOf.at.least(1);
      return Post.count();
        })
      .then(function(count) {
      expect(res.body.posts).to.have.lengthOf(count);
    });
  });
  it('should return posts with the correct fields',function(){
    let resPost;
    return chai.request(app)
    .get('/posts')
    .then(function(res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.posts).to.be.a('array');
      expect(res.body.posts).to.have.lengthOf.at.least(1);

      res.body.posts.forEach(function(restaurant) {
        expect(post).to.be.a('object');
        expect(post).to.include.keys(
          'id', 'title', 'content', 'author', 'created');
          });
          resPost = res.body.posts[0];
          return Post.findById(resPost.id);
        })
      .then(function(post) {
        expect(resPost.id).to.equal(post.id);
        expect(resPost.title).to.equal(post.title);
        expect(resPost.content).to.equal(post.content);
        expect(resPost.author).to.equal(post.author);
        expect(resPost.created).to.equal(post.created);
    });
  })
})

