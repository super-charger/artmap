import {HttpResponse} from "msw";
const User = [
    {id: 'kimpuro', nickname: 'dongeun', image: '/icons/kimpuro.jpg'},
]
export const POST = async () => {
    return HttpResponse.json(User[0], {
        headers: {
            'Set-Cookie': 'connect.sid=api-route;HttpOnly;Path=/'
        }
    })
}