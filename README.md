[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=blueviolet)](https://lbesson.mit-license.org/) 
![GitHub top language](https://img.shields.io/github/languages/top/ryqndev/boba-watch?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/ryqndev/boba-watch?style=for-the-badge&color=success)



## Inspiration
**Subtle Asian Traits** is one of the largest existing Facebook groups, comprised of 1.2 million members (late-March 2019 figures) who share relatable posts, subtle or not, about the first or second-generation Asian experience across the globe—ranging from posts about cultural clashes to widely shared joys such as boba milk tea. We were inspired by recent posts of members sharing logs of their boba purchases, most of which have taken the form of a Google spreadsheet or iPhone note. These posts garnered a lot of attention, as a love for boba and the resulting negative consequences on our wallets is not an uncommon experience amongst members of the group. We wanted to create an all-encompassing, minimally designed app that would be both relevant to and loved by this community.

## What it does
Boba Watch is a mobile website that tracks a user's monthly spendings on drinks. The dashboard feature shows a graphical depiction of how close a user is to approaching their personally set monthly spending limit as well as the number of drinks a user has purchased that month. Both of these levels can be adjusted in the user settings. The spendings tracker is a feature that lists out all of a user's purchases, detailing the name, date, location, and price of purchase. These details are all added to the app using the add function, which allows a user to fill out these details along with an option to attach an image and/or description of the drink or experience.

## How we built it
We used [Figma](https://www.figma.com/file/IuWnH6jb2nxdyiDd8kP0YjEr/boba-watch?node-id=60%3A8) to design the layout and graphics for the app. The [frontend](https://github.com/Ryabn/boba-watch) is built using React.js and is compiled to static files then hosted on GitHub Pages. The backend is built completely using Firestore.

## What's next for Boba Watch
We'd love to add a community aspect to the app, providing a way for friends to view each other's drink purchase histories and implement a type of leaderboard feature (or rather, a loserboard in regards to money). We would also add geotagging as a feature so that orders would be able to be pinned to a specific location on a map in addition to a map that would display all boba locations surrounding a user.


# Colors

- #FC8A8A
- #FFAFA4
- #FFDCDC
- #F68080
- #FFC9C2
- #FF5050

# Regrets
I'm adding this section to talk about some of the design/implementation regrets that I have while developing this application. Some of these 'problems' were implemented in the early stages of development and have evolved into some structural issues within the app.

### CSS
- Not using css variables for default theme styles to be able to easily implement a dark/light mode. (Using this would also allow us to implement seasonal touches such as christmas/halloween themed styling on holidays)
    * I do believe that MUITheme does this well but I would rather use my own theme framework since I don't want to delve too deep into Material-UI. I'm currently trying to stray away from using out-of-the-box ready css libraries. It's good to use when you want to develop an app quick/bad at design but I think I'm experienced enough that neither of those things are really important to me as I can set up my own css framework pretty quick and I work with actual designers instead now.
- Not using SASS
- Using material theme somewhat inappropriately
- Using px instead of emn/rem on font sizing

### HTML
- Not using semantic html - Although the app does rely heavily on Material-UI (and thus, has some semantic html I assume), there should not have been such an overreliance on divs
- ARIA and other accessibility problems. 
    * I never considered developing with visually-impaired/blind users in mind and it was due to my own ignorance in considering how other people use applications. There are several places where I use a font size of 11px and other places where I don't have ARIA labels/etc.
    * Luckily, the majority of our users are within the 16-24 y.o. age range which statistically makes visual-impairment users a much smaller portion of our audience but I could have done more.

> Note: Boba Watch is still one of the first production apps I've built and thus far, have learned a lot and hope to apply the lessons I've learned into my future projects - as well as correct the ones I have made already

### React
- Not using hooks. There's a lot of weird work arounds due to the higher component architectural structure of pre-hook react and using hooks would have largely resolved these issues. Furthermore, hooks would have reduced code size by ~30% and was a mistake not to use it. 
    * This is extremely prevalent in the extensive use of localStorage to handle much of the state management since using Redux was already overkill for a small application and although localStorage isn't reliable, it was a decision to pick the lesser of two evils (BUT HOOKS EXISTED AND I DID NOT KNOW).
- Hooks. I wish I knew about hooks before I developed this. HOOKS HOOKS HOOKS PLEASE USE HOOKS OH MY LORD IT MAKES EVERYTHING SO MUCH BETTER
- HOOKS!
