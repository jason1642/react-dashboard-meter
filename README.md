 # How to create a React Library with Rollup in 2023
Written by Jason Cruz

What this tutorial will cover - 
- Create a new react project with typescript and discuss folder structure
- Designing exports to change how the package is imported and used by the user. 
- Using storybook to test out our new components since we can't use 'npm run start' to see how it looks in localhost. 
- Using rollup and understanding package optimization and configurations.
  
## Initialization
Using npm to create our new React library is very important, but for the most part we just need the barebones create react app template with Typescript. Since this is just a library, great frameworks such as Nextjs is not needed whatsoever.  

Lets install our new React Library starter code 
	
    npx create-react-app my-app --template typescript	
 
After installation is complete, there are many files that we would normally using in a react website app that we have no use for in our library. Lets remove all the files that simply act as clutter. 

After several files have been removed, lets add or change the index.ts file in the /src level. This file acts as the directory for all the exports of the components we have created. We can have both default and named exports here depending on our library design. 
In this tutorial I will be creating two different components to demonstrate having multiple components available for the user to use, and how scaling a library would look like when there may be (for instance) 100 different components.



