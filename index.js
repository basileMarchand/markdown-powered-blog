const express = require("express");
const _ = require("ejs");
const marked = require('marked');
const fs = require('fs').promises;
const path = require('path');

const cfg = require("./contents/config.json")

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    },
    gfm: true
});

let tree = undefined;

async function buildTree(){
    return JSON.parse((await fs.readFile('./contents/tree.json', 'utf8')));
}

async function renderMarkdown(path) {
    const raw = await fs.readFile(path, 'utf8');
    return marked.marked(raw);
}

async function render(res, category, article) {
    console.log(`render: ${category} ${article}`);
    res.set('Cache-Control', 'public, max-age=600, stale-if-error=60, stale-while-revalidate=60');
    res.locals.footer = cfg.footer;
    res.locals.link = cfg.link;
    res.locals.rendered = await renderMarkdown(
        path.join(__dirname, "contents", category, article) + '.md'
    );

    res.locals.sidebar = tree;
    if( article == "index" || category == "blog"){
        res.locals.active = category;
    }
    else {
        res.locals.active = category + '/' + article;
    }
    const cobj = tree.find(c => c.category === category);
    const dobj = cobj ? cobj.contents.find(d => d.article === article) : { "name": article };

    res.locals.title = `${cfg.site} - ${dobj ? dobj.name : article }`;
    res.render('index.ejs');
}


const app = express();

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     return next()
// })

app.use(express.static('static'));
app.use(express.static("contents"));

app.get('/', (req, res) => {
    render(res, 'home', 'tour-horizon');
});

app.get('/:category/:slug', async (req, res) => {
    const { category, slug } = req.params;
    render(res, category, slug)
        .catch(err => {
            console.log(err)
            res.status(404).send(`
              <h1> ⚠️ Oups ! La page n'existe visiblement pas 🕳️</h1 >
            `);
        });
});

app.get('/blog', async (req, res)=>{
    const category = "blog";
    console.log(category);
    render(res, category, "index").catch( err => {
        console.log(err);
        res.status(404).send(`
        <h1> ⚠️ Oups ! La page n'existe visiblement pas 🕳️</h1 >
      `);
    });
});

app.listen(cfg.port, async () => {
    console.log(`docs are running on http://localhost:${cfg.port}`);
    tree = await buildTree()
});