# Healthcare-app

## About

This is a medical app healtcare done as part of our projet on COVID 19. You can register as a patient or a doctor.

## Patient

Can fill a daily form where he is asked about his health.

Can see his planned meeting with his doctor.

## Doctor 

Can check his planning and his consultations.

Can have a look on the daily form filled by the patient and ask him more questions if necessary.

## Software stack

- JavaScript
- Node.js
- Express
- MongoDB
- HTML / CSS
- Bootstrap

## How to run

1. Install [`node.js`](https://nodejs.org/en/download/) and [`yarn`](https://classic.yarnpkg.com/en/docs/install/) package manager on your computer.

2. Clone the repository and change directory to it :

```bash
git clone https://github.com/malikDaCoda/projet-1cs-backend
cd projet-1cs-backend
```

3. Copy the environment and configuration files and enter the secret information :

```bash
cp example.env .env
```

4. Install the node dependencies :

```bash
yarn install
```

5. Run the server :

- **development mode** : `yarn dev` (automatic restart on file change)
- **production mode** : `yarn start`
