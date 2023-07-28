## Reproducing steps

1. Run `npm install` to install dependencies
2. Run `npm run build` to build project
3. Run `npx serve -s build` to serve built project
4. Open `http://localhost:3000` or any output URL from previous command
5. Open console you should see `beforeSend` log before `beforeCapture` log, it is expected to be the opposite
6. Check the logged event in Sentry it is missing expected tag `ErrorBoundaryTag`

## How to fix it by removing console integration

_Now remove Console integration and related dependency and redo the steps from 1, it should log in right order and expected tag is well added._
