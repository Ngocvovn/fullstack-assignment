# Instructions

Hi!

The assignment is an overengined full-stack todo list services, composed by three services, the back-end, the front-end and middle. We need you to do...

For full-stack developers with front-end focus, please do task 1 and 3. (estimated 9-14 hours)
For full-stack developers with back-end focus, please do task 1, 2, and 4. (estimated 6-11 hours)
For "super" full-stack developer who can do everyting, please do all tasks (estimated 12+ hours)

# Tasks

1. Implement createEmitter according to the spec defined in ./middle/createEmitter.test.js typescript or javascript, Please add more tests if you think the tests are not enough. (~3-6 hours)
2. Writing tests to test GET/POST/DELETE endpoints in "backend" service, they can be unit tests of functions in ./backend/constrollers or integrity (or e2e) tests against the end-points, please try to write the tests that are "useful" = can help developer to find out the issues, and can prevent mistakes (~2 hours)
3. Implement front-end ui, which interacts with the GET/POST/DELETE endpoints of "backend" service, the requirements of this ui are 0) it shows all current todo in a list view 1) you can add new todo 2) you can mark todo as done (delete todo). You can use React / Angular 2+, typescript or javascript (~6-8 hours)
4. Implement a docker-compose.yml or a skaffold.yml (+ k8s manifests) for orchestrating backend/middle/front-end services for development environment. 2) implement production-ready Dockerfile for middle and backend services. (~1-3 hours)

# Solution

1. Have completed and also add some tests for throwing error cases
2. I was not able to find the set up and mocking that I think is suitable for the testing purpose, but I manually tested it.
3. Have completed but using React, Typescript, Redux, Redux-observable, Enzyme and Jest for testing
4. I only done the docker compose file for local development, also added the production Dockerfile for backend and middler services

## Command for local development

```
docker-compose -f docker-compose.dev.yml up --build
```
