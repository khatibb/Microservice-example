# Building a Microservice with Node(es5), Docker and Nginx

# Missing features(To-do) :
1. some extra input validation & sanitization (use joi)
2. remove repeated code blocks -> refactor into Mediator design pattern

# How to Run
1. cd into each microservice directory -> npm install
2. in the root directioy -> docker-compose up (sudo it if needed)

# Notes
1.The project is coded strictly using callbacks

# API Routes & their params 
  # all of the requests are ->POST
  # send as the body of the req as 'application/x-www-form-urlencoded'
1.localhost:8080/api/v1/createcompany
   .displayName:unique
 
2.localhost:8080/api/v1/updatecompany
    .displayName
    .toUpdateName


3.localhost:8080/api/v1/company/createworkspace
    .companyName
    .workSpaceName

4.localhost:8080/api/v1/company/updateworkspace
    .companyName
    .workSpaceName
    .toUpdateName

5.localhost:8080/api/v1/company/workspace/addUser
   .companyName
   .workSpaceName
   .email
   .role  : has to be {admin OR basic}
   
6.localhost:8080/api/v1/company/workspace/removeUser
    .companyName:
    .workSpaceName:
    .email:

