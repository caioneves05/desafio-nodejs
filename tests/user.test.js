import axios from 'axios'

describe('POST/ user', () => {

    it('shold create a new user', async () => {
        const userData = {
            name: 'string',
            email: 'ncaio03@33',
            password: '28485612',
            telephones: [
                {
                    number: '999629173',
                    area_code: '11'
                }
            ]
        }

        const response = await axios.post('https://desafio-nodejs.herokuapp.com/user', userData)

        expect(response.status).toEqual(201)
        expect(response.data).toEqual(expect.objectContaining({
            id: expect.any(String),
            creat_at: expect.any(String),
            modified_at: expect.any(String)
        }))

    })

    it('should login in user account and return token jwt.', async () => {
        const userData = {
            email: 'ncaio03@33',
            password: '28485612'
        }

        const response = await axios.post('https://desafio-nodejs.herokuapp.com/user', userData)

        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('token')
    })
})