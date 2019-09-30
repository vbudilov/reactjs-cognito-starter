## ReactJS + Cognito + AntD QuickStart
Use this project to quickly get started with ReactJS + Cognito.

## Update the Cognito configuration
First and foremost, create a Cognito User Pool. Then open 'src/configs/aws-configs.js' and update the `aws_user_pools_id` and the `aws_user_pools_web_client_id` properties.
 
```json
const awsConfig = {
    aws_app_analytics: 'enable',

    aws_user_pools: 'enable',
    aws_user_pools_id: 'us-east-1_x',
    aws_user_pools_mfa_type: 'OFF',
    aws_user_pools_web_client_id: 'x',
    aws_user_settings: 'enable',
};

export default awsConfig
```

## How to test locally and build for PRD deployment

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

