describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Invalid username or password");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-button").click();

      cy.get(".blogs").should("contain", "test title test author");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "test author",
          url: "test url",
          likes: 0
        });
      });

      it("A blog can be liked", function () {
        cy.get("#viewButton").click();
        cy.get("#likeButton").click();

        cy.contains("likes 1");
      });

      it('A blog can be deleted', function() {
        cy.get('#viewButton').click()
        cy.get('#deleteButton').click()

        cy.contains('test title test author').should('not.exist')
      })

      it('blogs are sorted correctly', function() {
        cy.createBlog({
          title: "test title2",
          author: "test author2",
          url: "test url2",
          likes: 5
        });
        cy.createBlog({
          title: "test title3",
          author: "test author3",
          url: "test url3",
          likes: 10
        });
        cy.get('.blogs').children().eq(0).as('first')
        cy.get('.blogs').children().eq(1).as('second')
        cy.get('.blogs').children().eq(2).as('third')

        cy.get('@first').contains('view').click()
        cy.get('@second').contains('view').click()
        cy.get('@third').contains('view').click()

        cy.get('@first').contains('likes 10')
        cy.get('@second').contains('likes 5')
        cy.get('@third').contains('likes 0')
      })
    });
  });
});
