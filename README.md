# Markdown and Node.js backend (another one ... 😒)

## Description 

This repository contains a backend developed in a short time for the realization of my personal website. 
It is a node.js server with express that will read a tree of markdown files and convert them in real time to html that will be returned to the client. 

I admit I was inspired by what is done for the Replit doc https://github.com/replit/replit.github.io

The main idea is to have a clear separation between my backend and the content of the site. And to be able to easily add content to my site using markdown file format. 

To see an example of final rendering you can go to my [personal website](http://bmarchand.fr), sorry but it's in French 🇫🇷. 

## Configuration 

To use this backend you must create a content folder in the root of the repository and in this folder create :   

1. a `config.json` file of the following form: 
```json 
{
    "port": 3000,
    "site": "My site Name",
    "footer": "<div class=\"container\" style=\"font-size: xx-small;\"> A custom footer </div>",
    "link": {
        "github": "http://github.com/basileMarchand",
        "linkedin": "http://linkedin.com/in/basilemarchand",
        "twitter": "https://twitter.com/BasileMarchand?ref_src=twsrc%5Etfw"
    }
}
```
2. a `tree.json` file of the following form that describes the tree structure of your site:
```json
[
    {
        "name": "🏡 Acceuil",
        "category": "home",
        "contents": [
            {
                "name": "Tour d'horizon",
                "article": "tour-horizon"
            },
            {
                "name": "Ma vie mon oeuvre",
                "article": "cv"
            }
        ]
    },
    {
        "name": "🧑‍🔬 Research",
        "category": "research",
        "contents": [
            {
                "name": "Activités",
                "article": "activities"
            },
            {
                "name": "Publications 📰",
                "article": "publications"
            }
        ]
    },
    {
        "name": "🧑‍🏫 Enseignement",
        "category": "teaching",
        "contents": [
            {
                "name": "Informatique",
                "article": "informatique"
            },
            {
                "name": "Réseaux et Web",
                "article": "network"
            },
            {
                "name": "Méthodes numériques",
                "article": "method_num"
            } 
        ]
    },
    {
        "name": "👨‍🔧 Développements",
        "category": "devel",
        "contents": [
            {
                "name": "Au boulot",
                "article": "inwork"
            },
            {
                "name": "Les soirs et week-end 🤯",
                "article": "private"
            }
        ]
    }
]
```
Each article entry corrispond to a markdown file for exemple in the contents directory of my personal website the file `contents/research/activities.md` exists and contains the page content for the activities entry in the research category. 

3. And finally all the folders and files you have described in your `tree.json`. 

There is a specific category "blog" which is not in the `tree.json` you just have to create the folder `contents/blog` and make an index.md file. 

## Usage 

Once the content of your site ready you just have to do the classics:

```
npm install 
npm run start 
```