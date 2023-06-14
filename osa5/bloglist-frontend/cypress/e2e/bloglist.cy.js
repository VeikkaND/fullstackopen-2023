describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        username: "test",
        name: "test name",
        password: "password"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    const user2 = {
      username:"user2",
      name: "user2 name",
      password: "password"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("login")
  })

  describe("login", function() {
    it("works with correct inputs", function() {
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.contains("test name logged in")
    }) 
    it("fails with wrong inputs", function() {
      cy.get("#username").type("sahdaidgasd")
      cy.get("#password").type("iasgdsaudgaud")
      cy.get("#login-button").click()
      cy.contains("wrong username or password")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      //login
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      // create new test blog
      cy.get("#create-new-button").click()
      cy.get("#title").type("title")
      cy.get("#author").type("author")
      cy.get("#url").type("url")
      cy.get("#submit-button").click()
    })
    it("A blog can be created", function() {
      // created blog exists
      cy.contains("title author")
    })
    it("An existing blog can be liked", function() {

      cy.get("#view-button").click()
      cy.get("#like-button").click()
      cy.contains("likes 1")
    })
    it("an existing blog can be removed", function() {
      cy.get("#view-button").click()
      cy.get("#remove-button").click()
      cy.get("html").should("not.contain", "title author")
    })
    it("user doesn't see the remove button for blogs made by others", function() {
      // post a blog made by someone else
      cy.get("#logout-button").click()
      cy.get("#username").type("user2")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.get("#create-new-button").click()
      cy.get("#title").type("title2")
      cy.get("#author").type("author2")
      cy.get("#url").type("url2")
      cy.get("#submit-button").click()

      cy.get("#logout-button").click()
      //sign in
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.get("#view-button").click()
      cy.get("html").should("not.contain", "#remove-button")
    })
    it("blogs are ordered by likes", function() {
      // post a blog made by someone else
      cy.get("#logout-button").click()
      cy.get("#username").type("user2")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.get("#create-new-button").click()
      cy.get("#title").type("title2")
      cy.get("#author").type("author2")
      cy.get("#url").type("url2")
      cy.get("#submit-button").click()

      cy.get("#view-button").click()
      cy.get("#like-button").click()

      cy.get("#logout-button").click()
      //sign in
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.get("#login-button").click()

      cy.get('.blogShort').eq(0).should('contain', 'title')
      cy.get('.blogShort').eq(1).should('contain', 'title2')
    }) 
  })
})