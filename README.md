# Gryffyndor-Project1

# Contributors
Erin Clancy
Sarah Lopriore
Nicholette Sams
Eric Tolliver

# Intro
With the 2018 Midterm elections quickly approaching, our team decided to do an election themed website containing important information about the upcoming Ohio Gubernatorial election along with information on our current representatives.  The entire site utilzies the *Bootstrap Framework*.

# Candidate Information
The home page displays the four major party candidates for Ohio Governor with a short bio.  You can also navigate to each candidate's individual page with more details about their background.

# New York Times Article Search
The home page and candidate pages also contain a listing of New York Times articles (utilizing the *NYT API*) pertaining to the election.  These articles are displayed as a *repeating element* on the page.  Each candidate page shows filtered results for the specific candidate.  On the home page there are also date filters and sorting options.

# Current Representative Information
The "Who are my representatives?" page diplays the current elected representatives for a given address (utilizing the *Google Civic Information API*).

# Poll
A non-scientific poll can also be found on the home page asking visitors "Do you plan to vote in the 2018 Midterm elections?".  This poll uses a *Firebase* database to store responses.  The results are displaying using the *Chart.js* library.