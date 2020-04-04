export const myProfile = {
    name: 'My name is Tom',
    greeting: "Hi there !, im using chatme right now. Let's talk more ... #cheers",
    ava: null,
    photos: [],
    id: 1,
    distance: 0
}

export const userData = [
    {
        id: 2,
        name: 'Wahyu',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '1m'
    },
    {
        id: 3,
        name: 'Bayu',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '1m'
    },
    {
        id: 4,
        name: 'Anna',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '45m'
    },
    {
        id: 5,
        name: 'Yolla',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '2km'
    },
    {
        id: 6,
        name: 'Bagas',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '2.4km'
    },
    {
        id: 7,
        name: 'Bejo',
        greeting: "Hi there !",
        ava: null,
        photos: [],
        distance: '3.2km'
    }
]

export const chatData = [
    {
        id: 2,
        name: 'Wahyu',
        online: true,
        chat: [
            {
              "id": 8,
              "message": "Nohh",
              "time": "now",
              "me": true,
              "reply": {
                "id": 4,
                "message": "Kuy, mandi dulu",
                "time": "30s",
                "me": true,
                "reply": false
              }
            },
            {
              "id": 7,
              "message": "Nohh",
              "time": "now",
              "me": false,
              "reply": {
                "id": 3,
                "message": "Acara ultah",
                "time": "1m",
                "me": false,
                "reply": false
              }
            },
            {
              "id": 6,
              "message": "Mau kmn ?",
              "time": "now",
              "me": true,
              "reply": false
            },
            {
              "id": 5,
              "message": "Cepetan !!",
              "time": "now",
              "me": false,
              "reply": false
            },
            {
              "id": 4,
              "message": "Kuy, mandi dulu",
              "time": "30s",
              "me": true,
              "reply": false
            },
            {
              "id": 3,
              "message": "Acara ultah",
              "time": "1m",
              "me": false,
              "reply": false
            },
            {
              "id": 2,
              "message": "Jadi kemana ?",
              "time": "1m",
              "me": true,
              "reply": false
            },
            {
              "id": 1,
              "message": "Hey, jadi engga",
              "time": "2m",
              "me": false,
              "reply": false
            }
          ]
    },
    {
        id: 5,
        name: 'Yolla',
        online: false,
        chat: [{
            id: 1,
            message: 'Hallo',
            time: '2m',
            me: false
        }]
    }
]
