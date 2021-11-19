const mercadopago = require ('mercadopago');
mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
});

const isSandbox = false;
const LOCALHOST  = 'http://localhost:3000';
const PRODUCTION = 'https://juanmanuelpl-mp-commer-nodejs.herokuapp.com';

const createPreference = item => {
    return new Promise((resolve, reject) => {

        let preference = {
            items: [
                {
                    id: '1234',
                    title: item.title,
                    description: "Dispositivo móvil de Tienda e-commerce",
                    quantity: 1,
                    picture_url: item.img,
                    unit_price: Number(item.price)
                }
            ],
            payer: {
                name: 'Lalo',
                surname: 'Landa',
                email: !isSandbox ? 'test_user_74638846@testuser.com' : 'test_user_81131286@testuser.com',
                phone: {
                    area_code: '11',
                    number: 22223333
                },
                address: {
                    street_name: 'Falsa',
                    street_number: 123,
                    zip_code: '1111'
                }
            },
            back_urls: {
                success: isSandbox ? LOCALHOST+'/success' : PRODUCTION+'/success',
                failure: isSandbox ? LOCALHOST+'/failure' : PRODUCTION+'/failure',
                pending: isSandbox ? LOCALHOST+'/pending' : PRODUCTION+'/pending'
            },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: 'Amex'
                    }
                ],
                excluded_payment_types: [
                    {
                        id: 'atm'
                    }
                ],
                installments: 12
            },
            notification_url: isSandbox ? LOCALHOST+'/statusCallback' : PRODUCTION+'/statusCallback',
            external_reference: 'jmpl0507@gmail.com',
        };

        mercadopago.preferences.create(preference)
        .then(function(response){
            
            resolve(response.body);

        }).catch(function(error){
            reject(error);
            console.log(error);
        });

    })
};


module.exports = {
    createPreference: createPreference
};





