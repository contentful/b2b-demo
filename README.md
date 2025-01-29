# PS Experiences Demo Code

This has been created with the intent to help Professional Services team demo to customer the basics of setting up their code for Experiences and how to register components.

It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) setup with App/Page Router and TailwindCSS.

It leverages [Material Tailwind](https://www.material-tailwind.com/) to showcase how easy it can be to connect to Experiences to react components, including react components imported from an outside system.

## Getting Started
Create a new, empty Contentful space and ensure Experiences is enabled.

Set the version of node using [NVM](https://github.com/nvm-sh/nvm) and install all the packages. 

IMPORTANT: The package `@contentful/experiences-sdk-react` is often updated. If you are experiencing issues, be sure the latest version is being used.

```bash
npm install
```

Use `example.env` to create a `.env` file and populate with your Contentful SpaceID, Environment, Delivery API Token and Preview API Token.

```bash
contentful space import --space-id={{SPACE_ID}} --environment-id=master --content-file=seed-content.json
```
This creates one Experience 'Landing page' and one Content Type 'Promotion' with an entry 'Visually assemble intelligent experiences at scale.' Double check that preview is configured for the Landing page at the URL `http://localhost:3000/{entry.fields.slug}`

## App Router vs Page Router
This has both app router and page router setup. Out of the box, this code is setup to use app router, if you wish to use page router, use the path `http://localhost:3000/page-router/{entry.fields.slug}` and update the preview URL in Contentful accordingly. See [wiki](https://github.com/contentful/experience-builder/wiki/Using-with-NextJS) for more information on how these two different approaches work.

## Demo

Run the development server:

```bash
npm run dev
```

Open the `Example` experience entry. You should see the default, basic components in the left sidebar and on the canvas you should see some of these basic components in use bound to the promotion entry. 

All of what we see is default Experiences and any CSS styles we've provided (i.e. font, text size etc).

### Initial Code Walkthrough
This project was bootstrapped with `create-next-app` using NextJS 14, App Router and Tailwind. We then added the ContentfulJS client library, `@contentful/rich-text-react-renderer`, `@contentful/experiences-sdk-react` and `@material-tailwind/react`. Material Tailwind is a basic design system library we are going to use to create our "custom" components from.

- `utils/client.ts` creates delivery/preview clients using env vars
- `app/layout.tsx` pretty standard layout where the CSS in imported (page router: `pages/_app.tsx`)
- `app/[[...slug]]/page.tsx` dynamic catch all route, here we get the page slug and pass it to our experience component (page router: `pages/page-router/[[...slug.tsx]]`)

### Our Experience Component
App Router – We created `components/experiences.tsx` to house the logic for render the `Experience Root`. With the current state of NextJS App Router/Server vs Client components, this must be a client component so we can use the `useFetchBySlug` hook from the Experiences SDK. We now pass the client (based on preview), slug, Experience Type ID (the content type ID) and locale code to `useFetchBySlug`. This returns us the experience, isLoading and error. At this point, we now how Experience up and running!

Page Router – This houses the logic for rendering the `Experience Root`. We use `getServerSideProps` and  pass the client (based on preview), slug, Experience Type ID (the content type ID) and locale code to `fetchBySlug`. This returns us the experience which will will serialize and pass to our page as a prop.

See Experience [Wiki](https://github.com/contentful/experience-builder/wiki) for more detail.

### Registering Custom Components
Out of the box, Experience provides Button, Heading, Image, Rich Text and Text. You can use these components as is if you wish!

To add more components, they must be registered. In `components/experiences.tsx`, we have some examples of using `defineComponents` on line 37. You can uncomment each item one by one to walk through how they are setup. Each components has comments to outline the details.

- `components/designSystem/heading.tsx` This is the most basic component and shows how we can "override" basic components by using the same ID. It leverages Material Tailwind's Typography component and has the definition of the allowed input values.

- `components/designSystem/button.tsx` Similar to Heading but this shows how we created a "wrapper" component to have some extra logic to make the Material Tailwind component work.

- `components/designSystem/hero.tsx` This is an example of a more "prescriptive" component and an editor was only given a few choices.

More [info](https://github.com/contentful/experience-builder/wiki#register-your-component) about registering components.

### Registering Design Tokens
Design tokens can be used to ensure consistent designs values are used. Uncomment lines 45 - 59 to show examples of these and where they appear.

More [info](https://github.com/contentful/experience-builder/wiki#registering-design-tokens) about registering components.

## Known Gotchas

Please document any "gotchas" that come up with customer. The PS team can use this list to help our customers troubleshoot common issue encountered and provide feedback to the product team to help address these issues.

- Using the Basic Rich Text component has a bug where display: flex is used on it's parent making `<p>` display side by side.
