/**
 * @vitest-enviroment jsdom
 */
import {describe, it, expect, vi} from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Login from '../pages/Login.vue'
import { mount } from '@vue/test-utils'
import axios from 'axios'
vi.mock('axios')

describe('Login Test', () => {

    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)
    const pinia = { global: { plugins: [ createTestingPinia({ createSpy: vi.fn }) ] }}

    it('should render', async ()=>{
        const wrapper = mount(Login, { 
            pinia, 
            props: {},
            attachTo: '#root'
        })
        expect(wrapper.find("h1").text()).contains("Bienvenid@ a Parrot")
    })

    it('should loggin',async ()=>{
        const wrapper = mount(Login, { 
            pinia, 
            props: {},
            attachTo: '#root'
        })
        await wrapper.find("[name='email']").setValue('email@email.com')
        await wrapper.find("[name='password']").setValue('password')
        await wrapper.find("[type='submit']").trigger('click')

        expect(wrapper.find(".help.is-danger").exists()).toBe(true)
    })

    it('should obtain tokens', async () => {
        const url= `http://api-staging.parrot.rest/api/auth/token`

        const res = {"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjk3MjUwNCwianRpIjoiMjBhMzRkNjA5OTE1NDk5NWIzNDRkZWM2MjZkNGVmYTgiLCJ1c2VyX2lkIjoxM30.FvLX7KvKW00rclvJjGR06wsjjFMKZW-sBCcJdzyJYXs","access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNTIyOTA0LCJqdGkiOiI2MjMyNDhjMzgwZWM0MjU2YmU5NWZmYTA1NDM4MWRhMSIsInVzZXJfaWQiOjEzfQ.9MdZlxYiBEU3Qp7NBjPJjXJEHPK6_Vgb3yEeeNA8ElM"}
        await (axios.post as any).mockResolvedValueOnce(res)
        const result = await axios.post(url) 
        expect(axios.post).toHaveBeenCalledWith(url)
        expect(axios.post).toBeCalledTimes(1)
        expect(result['refresh'] && result['access'] ).toBeTruthy()
        expect(result).toStrictEqual(res)
    })

})