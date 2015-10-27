# OnlyGoOnce
Application that provides unique restaurant suggestions. Created at CalHacks 2.0

1. Make sure you have nodejs, npm, mongodb, ruby
2. Make sure to install gulp, grunt and bower globally
3. Make sure to install compass from ruby gem (gem install compass)

Inside client folder:
----------------
- ```bower install```
- ```npm install```
- ```gulp config --env development``` (Generate config file) (If running mobile/prod, use ```production``` instead of ```development```)
- ```ionic serve``` (To test)

Set up ionic:
---------------
- ```ionic platform [platform]```
- ```ionic build [platform]```
- ```ionic run [platform]``` (To deploy onto device)

[platform] could be android, ios, etc... (Check ionic documentation)

Inside server folder:
---------------
- ```npm install```
- ```node server/app``` (To run the server, and make sure you have mongodb on)

