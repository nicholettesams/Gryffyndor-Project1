# Gryffyndor-Project1

# Contributors

- Erin Clancy
- Sarah Lopriore
- Nicholette Sams
- Eric Tolliver

# Intro

With the 2018 Midterm elections quickly approaching, our team decided to do an election themed website containing important information about the upcoming Ohio Gubernatorial election along with information on our current representatives. Our motivation was to make a non-partisan site that was informational to the average voter.

# Design Process

Our team worked together on the overall design and then split into two teams, a front-end team (Erin and Eric) and a back-end team (Sarah and Nicholette). The front-end team was dedicated to the HTML, CSS and content of the pages, utilizing the Bootstrap framework for most of the styling. The back-end team worked on javascript and connection to the APIs using AJAX requests and imported javascript libraries. After each person finished their task, we reviewed and made tweaks as a group to ensure cohesion.

# Technologies

HTML
CSS
Javascript
JQuery
Bootstrap Framework
New York Times Articles Search API
Google Civic Information API
Chart js library
Date-fns Library
Firebase

# Candidate Information

The home page displays the four major party candidates for Ohio Governor with a short bio. You can also navigate to each candidate's individual page with more details about their background.

# New York Times Article Search

The home page and candidate pages also contain a listing of New York Times articles (utilizing the _NYT API_) pertaining to the election. These articles are displayed as a _repeating element_ on the page. Each candidate page shows filtered results for the specific candidate. On the home page there are also date filters and sorting options. The Date-fns library was used to format the begin and end dates for searching and also to display the aritcle date on the page.

# Current Representative Information

The "Who are my representatives?" page diplays the current elected representatives for a given address (utilizing the _Google Civic Information API_).

# Poll

A non-scientific poll can also be found on the home page asking visitors, "Do you plan to vote in the 2018 Midterm elections?". This poll uses a _Firebase_ database to store responses. The results are displaying using the _Chart.js_ library.

# Future development

- Use the Google Civic API to display:
  1.  polling locations
  2.  election results
  3.  voter registration status
- Use a different API (FACE Ohio, ProPolitica) to display:
  1.  finance information
  2.  number of donors
  3.  money raised
- Display candidate information for states other than just Ohio.