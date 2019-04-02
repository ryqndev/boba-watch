## Inspiration
**Subtle Asian Traits** is one of the largest existing Facebook groups, comprised of 1.2 million members who share relatable posts, subtle or not, about the first or second-generation Asian experience across the globe—ranging from posts about cultural clashes to widely shared joys such as boba milk tea. We were inspired by recent posts of members sharing logs of their boba purchases, most of which have taken the form of a Google spreadsheet or iPhone note. These posts garnered a lot of attention, as a love for boba and the resulting negative consequences on our wallets is not an uncommon experience amongst members of the group. We wanted to create an all-encompassing, minimally designed app that would be both relevant to and loved by this community.

## What it does
Boba Watch is a mobile website that tracks a user's monthly spendings on drinks. The dashboard feature shows a graphical depiction of how close a user is to approaching their personally set monthly spending limit as well as the number of drinks a user has purchased that month. Both of these levels can be adjusted in the user settings. The spendings tracker is a feature that lists out all of a user's purchases, detailing the name, date, location, and price of purchase. These details are all added to the app using the add function, which allows a user to fill out these details along with an option to attach an image and/or description of the drink or experience.

## How I built it
We used [Figma] (https://www.figma.com/file/IuWnH6jb2nxdyiDd8kP0YjEr/boba-watch?node-id=60%3A8) to design the layout and graphics for the app. The [frontend] (https://github.com/Ryabn/boba-watch) is built using React.js and is compiled to static files then hosted on GitHub Pages. The [backend] (https://github.com/alexanderqchen/boba-watch-backend) is built using Express.js/Node.js and MySQL. We used the Sequelize ORM to simplify SQL queries. The SQL Server is running on GCP Compute SQL and the backend is running on a GCP Compute VM Instance.

## Challenges I ran into
One of the most time-consuming obstacles we faced was managing https and obtaining our SSL certificate for our backend server. Reliable internet access was also a bit of an issue for most of the duration of this hackathon. :-(

## Accomplishments that I'm proud of
Team synergy! We had three team members who all worked on different aspects of the project—frontend, backend, and design—which made the process easy and fluid.

_"I'm so used to making shit where I just put eight buttons in a box and called it a day."_ –Ryan Yang

## What I learned
I learned some math.

## What's next for Boba Watch
We'd love to add a community aspect to the app, providing a way for friends to view each other's drink purchase histories and implement a type of leaderboard feature (or rather, a loserboard in regards to money). We would also add geotagging as a feature so that orders would be able to be pinned to a specific location on a map in addition to a map that would display all boba locations surrounding a user.
