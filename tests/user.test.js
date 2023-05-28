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

    it('should return an error when creating the user', async () => {
        const userData = {
            name: 'string',
            telephones: [
                {
                    number: '999629173',
                    area_code: '11'
                }
            ]
        }
        try{
            const response = await axios.post('https://desafio-nodejs.herokuapp.com/user', userData)

            expect(response).toBeFalsy()
        }
        catch(error){
            expect(error.response.status).toBe(400)
            expect(error.response.data).toHaveProperty('error')
        }

    })

    it('should login in user account and return token jwt.', async () => {
        const userData = {
            email: 'ncaio03@33',
            password: '28485612'
        }

        const response = await axios.post('https://desafio-nodejs.herokuapp.com/user/login', userData)

        expect(response.status).toEqual(200)
        expect(response.data).toHaveProperty('token')
    })

    it('should return an error when trying to login and create a jwt token', async () => {
        const userData = {
            email: 'ncaio03@33',
            password: '2'
        }

        try{
            const response = await axios.post('https://desafio-nodejs.herokuapp.com/user/login', userData)

            expect(response).toBeFalsy()
        }
        catch(error){
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty('error')
        }
        
    })

    it('should return a 401 error response when token is not provided', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5jYWlvMDNAMzMiLCJpZCI6IjJlNDRkNGJjLTgzN2EtNGNjYS1iNmExLTMxMDMxMDM4OTlkZCIsImlhdCI6MTY4NTI5NTg4Nn0.Rg8BBxpTEOpCwF1RYWw6omIS4C6HcabotI9qISos1fo'
        const userData =  {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get('https://desafio-nodejs.herokuapp.com/user/search', userData)

        expect(response.status).toBe(200)
        expect(response.data).toEqual(expect.objectContaining({
            message: 'authorized',
            email: expect.any(String),
            id: expect.any(String)
        }))
    })

    it('should return a 401 error response when token is not provided', async () => {
        try {
          const response = await axios.get('https://desafio-nodejs.herokuapp.com/user/search', {
            headers: {
              Authorization: 'e',
            }
          })

          expect(response).toBeFalsy()
        } 
        catch (error) {

          expect(error.response.status).toBe(401)
          expect(error.response.data).toHaveProperty('message')
        }
    })
})