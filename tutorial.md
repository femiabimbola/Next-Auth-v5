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
