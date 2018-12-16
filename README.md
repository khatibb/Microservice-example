# Building a Microservice with Node(es5), Docker and Nginx 
# Tested with Mocha & Chai

# Missing features(To-do) :
1. some extra input validation & sanitization (use joi)
2. remove repeated code blocks -> refactor into Mediator design pattern

# How to Run
 X-In the Root Directory(first time only): <br/>
 sudo docker-compose build<br/>
 
 1-To run the api -> sudo docker-compose up<br/>
 2-To run mocha tests -> sudo docker-compose -f docker-compose-test.yml up<br/>

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

