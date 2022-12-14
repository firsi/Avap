// import { initializeApp, applicationDefault } from 'firebase-admin/app';

var admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": process.env.PROJECT_ID,
      "private_key_id": process.env.PRIVATE_KEY_ID,
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDuP/w1SIyq9OHT\n+Q7JfZujIQXqpG2b39qr61/saTb7SLcRRj17xy1Y+Ag3tJauDOx4UfPad68WobvL\nE8o4PJvrb1yOnoyofQ7AP5+/Y0JonxMwYjfpQDSx4TftGqQpeM54J81RZrNkbbyQ\nMOOzbYBE8R36P6AeCjjSU4vfa2w9iL1VnFcZFIRrah3XzqPq1YMk8JjnBNLdVrMg\nJWjcRta9ZeGdpuuESj1CIbBdYQlzn3vbbL4EGHdCSqUwBcvffK3oqE0fff1vUMK/\np7Y7f6uuXB6dv9S+7yWqOVwJiqcgp5/1EA3nkcrSOoekxqgkXsHHjMS/yoVFGp2f\nY5fIxpmNAgMBAAECggEAEvN5/08HCW4zLGZKO9LG94Hf85sisNxsi3JMjgSMgA53\nqWMZ7ueX/tSz6qJtveh/Qs7aA82zWqyAwJWRZ0nC6UZRaXLJI3nXG4m0Dkg59xJ4\nN0gIxH/78Q5GIZEV78qROdOIrGnr6RglgJ6y7gnOwy0ewlIfTWRowqosnRfxYy9+\n/eoYgNewawhfuL+qrb/Ditr/+A6ZWFMJljGY2bdUFB7Q+ukjGxsd6XGcUOWEqY4Y\n9cK5AY78W/iRYKeXBNZkLSNWkIdHiaZ3ybkN4EvO/5n3bzQCvG0+tfV/g/o4sNLV\nNcTTrfgsabrngOqafHzOrfSQ7w5EAbegQxE6dsgILQKBgQD3GFyjiiXrucagh9Ci\nxGvVmS6/JXxXw8wnZ0Fk7WBYLiGBkWe5Qf2wOknnAd+5NtuDyt1Oh92OItu8gOpW\nrqiGU+jj2vYLdNe6CZZzTbjlEx+W0i2bCcJNmkkc9Sky54dCHs/R7zfdwhQnn89T\nNvv9+ku6ghO5kyl4l3HM0DwQPwKBgQD21gT/MAvA+eL/inX0T/xM0mWiaJIWFqAC\npoPoqbLLMfeQui5/sLtjBAkzdHXLchvMRG8Vs7j5k3qg7SHbm+nC7slYerRvD1fp\n6T7nB9G2YXAkJZB15IQmuSeEyiRt1j8OscMJM9QJ8X2teLVcJEYtALUJ3eUA1K3q\ntK6va7ljMwKBgQCtDMjEWBoaru7mundppvqGi1Nr1wrwRFYUOoJX9s8EsroQjg8A\ndbD/3LKpMGzIwByYfljjiM+nnc4ahIaZ0pSADwAJo+2xNFFpHxHZCtO0yuHStLvv\n2rPTuXv+5cvGtNPLgNy3ADw1+Jg47/k5JEbzJnom0raRvvjKVfYDJMsL7QKBgQDn\nbYZF1MBQcHo6aZFqPUwqouGTwkOl3hSsJ39ptyHhjbm1wjoykns+vNv7mGeRFi2l\n+UvFpzn5FiNVmr+x7Z7gm43AHVvq/RHKSFwntJcVToob+fRV9KlKvTKmN/ir2sJI\nfraEfEmEAR16dcBk4cXCD/WtiJRbkQx3EGzwICozLQKBgQDofhw+rnM9OBaMYo8V\n/Wspb/uZYZ7MYZNECQ7Sc0WTvltN4ilHvo5t1/TKFKuxcafERxy9UMa4MAv1lBMJ\nvtMnaNwmamWTBoaLZFB+HYYuZdBv6LCGm2xQAA3HDyio/QeXl27XiHZrtpBQQhQV\nIoAC89s0/JIiVkyWPmBgWSYpGQ==\n-----END PRIVATE KEY-----\n",
      "client_email": process.env.CLIENT_EMAIL,
      "client_id": process.env.CLIENT_ID,
      "auth_uri": process.env.AUTH_URI,
      "token_uri": process.env.TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_URL,
      "client_x509_cert_url": process.env.CLIENT_CERT_URL
    })
  });
}

export default admin
