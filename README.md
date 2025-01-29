# B2B Demo Code

This has been created to demonstrate the integration with SAP Commerce to deliver a modern B2B customer self-service portal.

It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) setup with App Router and TailwindCSS.

It leverages [Material Tailwind](https://www.material-tailwind.com/) to showcase how easy it can be to connect to Experiences to react components, including react components imported from an outside system.

## Getting Started

Create a new, empty Contentful space and ensure Experiences is enabled.

Set the version of node using [NVM](https://github.com/nvm-sh/nvm) and install all the packages.

IMPORTANT: The package `@contentful/experiences-sdk-react` is often updated. If you are experiencing issues, be sure the latest version is being used.

```bash
npm install
```

Use `example.env` to create a `.env` file and populate with your Contentful SpaceID, Environment, Delivery API Token, Preview API Token, and Site Config content ID, and your SAP API Endpoint and Base Site ID.

```bash
contentful space import --space-id={{SPACE_ID}} --environment-id=master --content-file=seed-content.json
```

This creates one Experience 'Landing page' and one Content Type 'Promotion' with an entry 'Visually assemble intelligent experiences at scale.' Double check that preview is configured for the Landing page at the URL `http://localhost:3000/{entry.fields.slug}`

## Demo

Run the development server:

```bash
npm run dev
```

Open the `root` experience entry. You should see the default, basic components in the left sidebar and on the canvas you should see the welcome page for the B2B portal.

### Initial Code Walkthrough

This project was bootstrapped with `create-next-app` using NextJS 14, App Router and Tailwind. We then added the ContentfulJS client library, `@contentful/rich-text-react-renderer`, `@contentful/experiences-sdk-react` and `@material-tailwind/react`. Material Tailwind is a basic design system library we are going to use to create our "custom" components from.

- `src/services/contentful/client.ts` creates delivery/preview clients using env vars
- `app/layout.tsx` layout where the CSS is imported (page router: `pages/_app.tsx`) and containing header, footer and main sections wrapped with context providers for the application.
- `app/[[...slug]]/page.tsx` dynamic catch all route, here we get the page slug and pass it to our experience component (page router: `pages/page-router/[[...slug.tsx]]`)

### Our Experience Component

App Router – We created `components/experiences.tsx` to house the logic for render the `Experience Root`. With the current state of NextJS App Router/Server vs Client components, this must be a client component so we can use the `useFetchBySlug` hook from the Experiences SDK. We now pass the client (based on preview), slug, Experience Type ID (the content type ID) and locale code to `useFetchBySlug`. This returns us the experience, isLoading and error. This is also where we fetch the site config content and site labels used across the application. At this point, we now how Experience up and running!

See Experience [Wiki](https://github.com/contentful/experience-builder/wiki) for more detail.

### Registering Custom Components

Out of the box, the demo provides a combination of content and data driven components. These components are used across the different experiences (pages) in the application and should not be removed. You can extend these components to deliver a more customized demo if you wish!

To add more components, they must be registered. In `components/experiences.tsx`, we have some examples of using `defineComponents` on line 37. You can uncomment each item one by one to walk through how they are setup. Each components has comments to outline the details.

- `components/designSystem/heading.tsx` This is the most basic component and shows how we can "override" basic components by using the same ID. It leverages Material Tailwind's Typography component and has the definition of the allowed input values.

- `components/designSystem/button.tsx` Similar to Heading but this shows how we created a "wrapper" component to have some extra logic to make the Material Tailwind component work.

- `components/designSystem/hero.tsx` This is an example of a more "prescriptive" component and an editor was only given a few choices.

More [info](https://github.com/contentful/experience-builder/wiki#register-your-component) about registering components.

### Registering Design Tokens

Design tokens are included to ensure consistent designs values are used across components. The preconfigured design tokens can be found starting at line 150 in the `experiences.tsx` file.

More [info](https://github.com/contentful/experience-builder/wiki#registering-design-tokens) about registering components.

## Known Gotchas

Please document any "gotchas" that come up with customer. The PS team can use this list to help our customers troubleshoot common issue encountered and provide feedback to the product team to help address these issues.

- Using the Basic Rich Text component has a bug where display: flex is used on it's parent making `<p>` display side by side.
