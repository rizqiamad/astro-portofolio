---
title: 'Introduction'
date: 2026-03-11
description: "After years of being confused, finally i started to build my own website"
tags: ['intruduction', 'astro', 'web', 'Hanif']
---

![Dummy Image](/avatar.png)

I built personal portofolio website on my own several times, which is using react and vue js for the tech stack. The reason i used both, because i got used to the technology. I'd used react and the other framework run on it for my based tech when i build something and that's awesome. It's the first framework i learnt and for some reasons i still don't master it. Even though i still use it for something i know. Special for this moment i decide to rebuild my portofolio from scratch using astro.

So I started over.

## Why Astro

I evaluated a few options: SvelteKit, react, and vue js. I saw that this framework is well-designed for blogging, and that's all what i need. The syntax is like jsx and i fell more familiar with it since i'd used nextjs and react. Even though i still ask A.I for making me more understand about the framework.

I want to make a simple website that efficient for showing off my write and my projects. Hence everyone who visit here will more know about me and what i did, you can input some advice for me and keep in touch with me if that's the need. Astro make it simple for my showcase and blog, it's easy to read and understand.

You can use zod here where you can use it for keep your file tidy and keep the error away when your app is run.

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
  }),
});
```

The schema validates at build time, so if you forget a required field in a post, you get a compile error rather than a runtime `undefined` showing up in your HTML. I appreciate that kind of early feedback.

## What I Kept Simple

No CMS. No databases. No boilerplate-code needed. No auth. Posts are `.md` files in `src/content/blog/`. To add a new one, I `touch` a file, write some words, and push to main. Deploys in under 30 seconds on my own server. That's simple. Also inserting image it's something i'm happy with this. Using md file you can just insert image very easly with short command

```
![Alt text](image_url "Optional Title")
```

Then the dark mode toggle stores a preference in `localStorage` and reads it before first paint using a tiny inline script to avoid the flash. That's the **most** complicated piece of JavaScript on this site.

I don't have analytics or comments for these pages. I think everyone who build something with code know that we just build what we need and avoid anything which make it more complex for our job. I remember the abbreviation of KISS which Keep It Simple and Stupid.

## Next

I'll here when i have something to say or release from my head. I have bad habbit of thinking that i can and always think several things at the same time, and it bothers me already. Where i can focus and do something more productive, i still stuck in the situtation that bring me to unproductive thing.

Thanks for everyone here who spend his leasure time for reading this page. Maybe we can do something together in the other destiny.
