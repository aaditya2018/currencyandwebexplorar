Using External API  to fetch data for currency like Crypto,USD etc.
External API: https://api.coinbase.com/v2/exchange-rates?currency=${currency}

To fetch data on basis of currency we have this API: http://localhost:3000/exchange-rates/rates?base=crypto
base*: crypto,fiat

Response: [
    {
        "_id": "64cc923aeff959a9c742a939",
        "currency": "crypto",
        "rates": {
            "USD": {
                "BTC": "0.00000015028910909672495550824082",
                "DOGE": "0.05913206838021553172979051262629",
                "ETH": "0.0000023916688984446432625762022"
            },
            "SGD": {
                "BTC": "0.00000015028910909672495550824082",
                "DOGE": "0.05913206838021553172979051262629",
                "ETH": "0.0000023916688984446432625762022"
            },
            "EUR": {
                "BTC": "0.00000015028910909672495550824082",
                "DOGE": "0.05913206838021553172979051262629",
                "ETH": "0.0000023916688984446432625762022"
            }
        },
        "timestamp": 1691128379009
    },
]



To fetch historical data we have this API: http://localhost:3000/historical-rates?c=USD&target_currency=ETH&start=1691128379255&end=1691128406668

base_currency*: USD,SGD,EUR
target_currency*: BTC,DOGE,ETH
start*: Time in millisceonds
end: Time in millisceonds and after start. if  givenn not it will pick current date

Response: {
    "historicalRates": [
        {
            "timestamp": 1691128379255,
            "rate": "0.0000023916688984446432625762022"
        },
        {
            "timestamp": 1691128379348,
            "rate": "0.0000023916688984446432625762022"
        },
    ]
}

