# Neeky Fun Facts

A free, static, GitHub Pages-ready notebook of curious facts. It starts with no published facts.

## Publish it for free

1. Create a new **public** GitHub repository named `neeky-fun-facts`.
2. Upload these files to that repository.
3. In the repository, open **Settings → Pages** and select **Deploy from a branch**, then choose `main` and `/ (root)`.
4. GitHub will give you a free shareable address in the form `https://YOUR-USERNAME.github.io/neeky-fun-facts/`.

Do not buy a domain unless you want a custom address; the GitHub address is free.

## Add an approved fact

Edit `data/facts.js` in GitHub. Replace the empty array with entries like this. Separate entries with commas.

```js
window.NEEKY_FACTS = [
  {
    id: "the-fact-slug",
    title: "A short, intriguing title",
    category: "maths", // maths, physics, psychology, or a new lowercase category
    summary: "The short version shown on the homepage.",
    body: "The full explanation shown on the shareable fact page.",
    credit: "Name to display", // use "" for no credit
    source: "https://example.com/source",
    sourceLabel: "Readable source name"
  }
];
```

Every fact automatically appears on the homepage and gets its own link: `fact.html?id=the-fact-slug`.

## Publication checklist

Before you publish a fact, check:

- The wording is accurate and clear.
- The category is correct.
- Contributor credit is spelled as requested.
- **A credible source link has been added.**

The source is deliberately not requested from anonymous submitters, but it should be added during your review before publication.

## Connect anonymous submissions

1. Create a Google Form with: fact text, suggested category, optional name for credit, optional contact detail, and consent to publish.
2. In the Form’s responses tab, link a private Google Sheet so you can review submissions.
3. Copy the published form URL into `data/site-config.js` after `submissionFormUrl`.

No one can publish directly: you review every response and add approved facts yourself.
