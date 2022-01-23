import signup from '../pages/SignupPage'
describe('Pagina de Cadastro', function () {

    beforeEach(function () {
        cy.fixture('deliver').then((item) => {
            this.deliver = item
        })
    });

    it('Cadastro', function () {
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    });

    it('CPF Incorreto', function () {
        signup.go()
        signup.fillForm(this.deliver.cpf_inv)
        signup.submit()

        signup.alertMessageShouldBe('Oops! CPF inválido')
    });

    it('Email Incorreto', function () {
        signup.go()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()

        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    });

    context('Campos obrigatórios', function ()  {
        const messages = [
            { campo:  'nome', output: 'É necessário informar o nome'},
            { campo:  'cpf', output: 'É necessário informar o CPF'},
            { campo:  'email', output: 'É necessário informar o email'},
            { campo:  'cep', output: 'É necessário informar o CEP'},
            { campo:  'numero', output: 'É necessário informar o número do endereço'},
            { campo:  'metodo_entrega', output: 'Selecione o método de entrega'},
            { campo:  'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.campo} é obrigatório`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })

});