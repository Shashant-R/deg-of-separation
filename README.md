# Degree of Separation
deployed at  https://shashant-r.github.io/deg-of-separation/
## Instructions 

### 1. clone the github repository in your system
### 2. run
	        npm install
       to download all necesarry npm modules
### 3. run
	        npm install @mui/material @mui/icons-material
       to download all necessary Material UI modules
### 4. npm start to see the web application on your browser
### 5. Now, create the relationships by typing in the names of the first person (Person A) and second person (Person B).
   Make sure to Click on the button "Add Relationship" after each pair of input names. 
   Now, you can Click on "Save Relations" to save the relations (the created graph) in local storage.
### 6. In the Query field type in the names of the first person (Query Person A) and second person (Query Person B) respectively.
   Afterwards, Click on "Find Path" to see the degree of separation between the two persons. 
   You should see the output as mentioned in the problem statement. 
   In some exceptional cases, such as:
	i. 	query person name not found in database
	ii. 	both the query peron names is same
	iii.	no relationship between the two persons
   Proper outputs are generated to inform the user of these conditions.
### 7. You can Click on "Delete Relations" button to remove the relationships (the graph) from local storage so that, the next time you 
   run the application, old relationships are removed from the memory. 

### 8. Note : the added relations generate a directed graph. That is, A is a friend of B does not imply that B is a friend of A.

	This assumption was based on the sample output given in the problem statement. Otherwise if the relations would have been un-directed, 
	for Kamalnath Sharma and Bhaskar, the application should have shown the degree of separation as 
		1. Kamalnath Sharma > Shanti Kumar Saha > Bhaskar
		2. Kamalnath Sharma > Sameer > Aayushi > Bhaskar

	(only a couple of lines have to be added to the code to generate a undirected grap)

### 9. Note : All the Name inputs should be unique. All names are case sensitive. 
