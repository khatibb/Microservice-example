# Building a Microservice with Node(es5), Docker and Nginx

# Missing features(To-do) :
1. some extra input validation & sanitization (use joi)
2. remove repeated code blocks -> refactor into Mediator design pattern

# How to Run

1. in the root directioy -> docker-compose up (sudo it if needed)

# Notes
1.The project is coded strictly using callbacks

# API Routes & their params 
   all of the requests are ->POST <br />
  send  the body as of the req as 'application/x-www-form-urlencoded'<br />
  
1.localhost:8080/api/v1/createcompany<br />
  .displayName<br />
  
2.localhost:8080/api/v1/updatecompany<br />
    .displayName<br />
    .toUpdateName<br />


3.localhost:8080/api/v1/company/createworkspace<br />
    .companyName<br />
    .workSpaceName<br />

4.localhost:8080/api/v1/company/updateworkspace<br />
    .companyName<br />
    .workSpaceName<br />
    .toUpdateName<br />

5.localhost:8080/api/v1/company/workspace/addUser<br />
   .companyName<br />
   .workSpaceName<br />
   .email<br />
   .role  : has to be {admin OR basic}<br />
   
6.localhost:8080/api/v1/company/workspace/removeUser<br />
    .companyName<br />
    .workSpaceName<br />
    .email:

