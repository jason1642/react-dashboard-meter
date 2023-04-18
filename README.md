 # How to create a React Library with Rollup in 2023
Written by Jason Cruz

What this tutorial will cover - 
- Create a new react project with typescript and discuss folder structure
- Designing exports to change how the package is imported and used by the user. 
- Using storybook to test out our new components since we can't use 'npm run start' to see how it looks in localhost. 
- Using rollup and understanding package optimization and configurations.
  

### Things to discuss/include
- Babel.config.cjs, jest.config.mjs, ts.config.json, package.json, rollup.config.mjs
- 
## Initialization
Using npm to create our new React library is very important, but for the most part we just need the barebones create react app template with Typescript. Since this is just a library, great frameworks such as Nextjs will not be useful whatsoever.  

Lets install our new React Library starter code 
	
    npx create-react-app my-app --template typescript	
 
After installation is complete, there are many files that we would normally using in a react website app that we have no use for in our library. Lets remove all the files that simply act as clutter. 

After several files have been removed, lets add or change the index.ts file in the /src level. This file acts as the directory for all the exports of the components we have created. We can have both default and named exports here depending on our library design. 
In this tutorial I will be creating two different components to demonstrate having multiple components available for the user to use, and how scaling a library would look like when there may be (for instance) 100 different components.

Next I'll create a components folder to store all available components we wan't users to have access to. Each folder in our components folder will represent a components which can be imported by its name. Here in the dashboard-meter folder, we have Dashboard.tsx which will act as the default export for this components, as well as types.ts, to organize our typescript types so we can stay consistent throughout development and catch errors as soon as we make them. DashboardMeter.stories.tsx is where we will declare our component and design a container for storybook to include when you run storybook locally. 



