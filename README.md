# Washing Machines Catalog

A responsive and accessible Next.js application for browsing and filtering washing machines. Built with TypeScript and Tailwind CSS, this project offers a seamless user experience with dynamic search and filter functionalities.

## Features

- **Search Functionality**: Search washing machines by name and model.
- **Filter Options**: Filter devices based on functions, energy class, and capacity.
- **Dynamic Display**: Conditionally display the "Show More" button when there are more than six results.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Accessibility**: Improved accessibility with proper ARIA attributes and keyboard navigation support.
- **Optimized Images**: Lazy loading and error handling for images using `next/image`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO

- **Extract Strings to Dictionaries**: Refactor string literals into separate dictionary files to support localization and easier management.
- **Implement React Context**: Utilize React Context API for managing global state, such as user preferences and filter selections.
- **Add Unit Tests**: Write unit tests for components using testing libraries like Jest and React Testing Library.
- **Enhance Documentation**: Expand the README.md with more detailed instructions, contributing guidelines, and project structure overview.
- **Add Dark Mode**: Implement a dark mode theme to enhance user experience
