# Working with Next Auth V5

Start by installing the next app

```bash
npx create-next-app@latest ./
```

Then Install the shadcn

```bash
npx shadcn@latest init
```

## Files conventions

<b> Any time you created a layout file, They has to be children o</b>

Always add this css

```global.css
html, body, :root { height: 100%}
```

## Using custom fonts

```page.tsx
import {cn} from "@/lib/utils";
import {Poppins} from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const page = () => {
  return (
    <h1
    className={cn(
    "text-6xl font-semibold text-white drop-shadow-md", font.className)}> Auth </h1>
    )
}
```

## Steps

1. Designed the homepage first
2. Working on the `components/login-button.tsx`
3. Created the `auth/login`, then created the login form
4. I'm using card for the creation of the form
5. Design the button

## Working with Prisma

```bash
npm i -D prisma
```

Then

```bash
npm i  @prisma/client
```

After the prisma client, create a file in the lib folder `lib/db.ts`

```bash
// Prisma Learning, do this before doing Prisma init, after add this, do Prisma init

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

/**
 * In production, Prisma only uses  --> export const db = new PrismaClient()
 * In development,  instead of create primsaclient everytime, we save (hotreload)
 * It uses globalThis.prisma  for prismaClient, hotreload is not affected
 */

if (process.env.NODE_ENV !== "production") globalThis.prisma = db; // Nextjs hotreload will use the globalThis.prisma

// export const db = new PrismaClient(); it is for production
```

Create the `.env` file before you RUN. Prisma does not support `.env.local`

```bash
npx prisma init
```

In the schema.prisma, connect the database, create the first model

After creating the first model, then run to create locally

```bash
npx prisma generate
```

Then you push the database to your database provider

```bash
npx prisma db push
```

<b> Every time you change the schema, run this</b>

```bash
npx prisma generate

npx prisma db push
```

<b> To read the data</b>

```bash
npx prisma studio
```

## Working with Error url

```login.tsx
import { useSearchParams } from 'next/navigation'


export const LoginForm = () => {
  // Setting the state
  const SearchParams = useSearchParams()
  const urlError = SearchParams.get('error')
}
```
