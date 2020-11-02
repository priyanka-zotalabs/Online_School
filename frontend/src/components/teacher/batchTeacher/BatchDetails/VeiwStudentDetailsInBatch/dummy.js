const dummyData =
[
    {
        "_id": "5f34f736c1e9e715bc2e1c8b",
        "courseId": {
            "_id": "5f33dd6fdcac0a77ee393337",
            "name": "BC"
        },
        "installments": [
            {
                "isPaid": false,
                "date": "Sun Aug 09 2020 21:30:00 GMT+0300 (Moscow Standard Time)",
                "amount": "300",
                "status": "late"
            },
            {
                "isPaid": false,
                "date": "Sun Aug 09 2020 21:30:00 GMT+0300 (Moscow Standard Time)",
                "amount": "300",
                "status": "late"
            },
            {
                "isPaid": true,
                "date": "Sun Aug 09 2020 21:30:00 GMT+0300 (Moscow Standard Time)",
                "amount": "300",
                "status": "paid"
            },
            {
                "isPaid": true,
                "date": "Sun Aug 09 2020 21:30:00 GMT+0300 (Moscow Standard Time)",
                "amount": "300",
                "status": "paid"
            }
        ]
    },
    {
        "_id": "5f34f85269357416f519cdff",
        "courseId": {
            "_id": "5f33dd6fdcac0a77ee393337",
            "name": "BC"
        },
        "installments": [
            {
                "isPaid": false,
                "date": "Fri Oct 09 2020 21:30:00 GMT+0300 (Moscow Standard Time)",
                "amount": "300",
                "status": "pending"
            }
        ]
    }
]
export default dummyData;