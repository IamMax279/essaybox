<img width="1920" height="856" alt="image" src="https://github.com/user-attachments/assets/854d9dfb-001d-41a9-a05b-eef4ec754cf7" />

<img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/b4a31b66-ed19-4c73-b850-252a822e12e9" />

<img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/73b22372-65b7-44a6-839a-1fc475251de9" />

<img width="1911" height="912" alt="image" src="https://github.com/user-attachments/assets/d15798a7-eb83-4ce3-9958-d91d3d3240d0" />

# EssayBox - AI essay generator
> [!NOTE]
> This project's purpose is to utilize the OpenAI API using a parametrized prompt that will generate efficient, middle-school-level essays.

# 1. Running the project
> [!IMPORTANT]
> Before proceeding, make sure you've set up client-side/server-side environment variables needed. I'd also like to mention that while you absolutely can run this project, the main project purpose is to display my fullstack coding skills.
Run the whole project using docker-compose:
```bash
docker-compose up --build
```
If you want to use stripe subscriptions, make sure to also run the following command on your machine:
```bash
stripe listen --forward-to http://localhost:<server-port>/stripe/webhook
```

# 2. Some features
- AI-generated essays based on user prompts
- Stripe-powered subscription system
- OAuth2 + Passportjs auth system
- User verification via Resend email API
- Freemium payments model (first essay free, then buy subscription)

# 3. Tech-stack
My project makes use of a variety of technologies, including:
## Frontend:
- Nextjs
- Tailwindcss
- React Query
- HeroUI
- Formik and Yup

## Backend:
- Expressjs
- Prisma
- Postgresql
- Authentication with Passportjs, Oauth2 and Express-session
- OpenAI API
- Stripe API
- Resend API
- Bash

## DevOps elements:
- Docker
- Docker-compose
- Github Actions
