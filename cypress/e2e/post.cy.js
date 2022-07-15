/// <reference types ="cypress"/>

describe("POST /characters", () => {
  describe("Dado que quero cadastrar um novo personagem", () => {
    describe("Quando eu cadastro um novo personagem", () => {
      before(() => {
        cy.request({
          method: "POST",
          url: "/sessions",
          body: {
            email: "emerson@qacademy.io",
            password: "qa-cademy",
          },
        }).then((response) => {
          expect(response.status).to.eql(200)
          cy.log(response.body.token)
          cy.log(response.body.user._id)
          Cypress.env("token", response.body.token)
          Cypress.env("userId", response.body.user._id)
        })
        cy.request({
          method: "DELETE",
          url: "/back2thepast/62cef2c728997c0016f05dc3",
        }).then((response) => {
          expect(response.status).to.eql(200)
        })
      })
      it("Então o personagem deve ser cadastrado", () => {
        const character = {
          name: 'Charles Xavier',
          alias: 'Professor X',
          team: ['x-mean', 'illuminatis'],
          active: true
        }
        cy.request({
          method: "POST",
          url: "/characters",
          body: character,
          headers: {
            Authorization: Cypress.env("token"),
          },
        }).then((response) => {
          expect(response.status).to.eql(201);
        })
      })
    })
    
  })
})
