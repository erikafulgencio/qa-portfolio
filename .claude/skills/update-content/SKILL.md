---
name: update-content
description: Change portfolio copy or data — projects, case studies, skills, certifications, awards, experience/jobs, about story, hobbies, contact links, availability line, résumé PDF, images — by editing the typed files in src/app/content/ without touching components. Use for any "update my …", "add a project/job/cert", "change the text" request.
---

# Update portfolio content

All visible copy and data lives in `src/app/content/`. Components only render it.

| What                                                                                      | File · export                                                                                  |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Name, title, availability line, email, GitHub/CodePen, résumé PDF                         | `profile.ts` · `PROFILE`                                                                       |
| Contact cards (email, LinkedIn, phone, Viber…)                                            | `profile.ts` · `CONTACT_LINKS` (`href` must be a real `mailto:`/`tel:`/`https:`/`viber:` link) |
| Projects (the Alter "quests"; Side quests show as Professional automation projects)       | `projects.ts` · `QUESTS`                                                                       |
| Development projects (Professional only)                                                  | `projects.ts` · `DEV_PROJECTS`                                                                 |
| "The Work Behind Quality" tiles                                                           | `projects.ts` · `WORK_ARTIFACTS`                                                               |
| Case studies                                                                              | `cases.ts` · `CASES` (a Boss fight quest needs a case with the same `id`)                      |
| Skill tree, training, certifications, awards                                              | `skills.ts`                                                                                    |
| Experience chart, jobs, competencies                                                      | `experience.ts`                                                                                |
| About story chapters, hobbies, Alter interests, Spot-the-defect rows                      | `about.ts`                                                                                     |
| Home lists (mindset chips, principles, loop, signals, HUD stats, character sheet, ticker) | `home.ts`                                                                                      |

## Rules

- Keep each object's shape. The types in `content/models.ts` enforce it, and the compiler catches mistakes.
- **IDs are routes.** A project `id` becomes `/projects/<id>` and a case `id` becomes `/cases/<id>`. Renaming an ID breaks old links, so only do it on purpose.
- **Icons** are Phosphor names (`'ph-…'`). Check the name exists in `node_modules/@phosphor-icons/web/src/regular/style.css`. `npm run icons` fails on unknown names.
- **Images** go in `public/assets/img/` and are referenced as `assets/img/<file>`. These fields are optional: certificate `image`, hobby shot `src`, job `logo`. A styled placeholder renders while a field is unset.
- **Résumé PDF:** put the file in `public/assets/`, then set `PROFILE.resumePdfUrl = 'assets/<file>.pdf'`. The Download button appears automatically.
- Short headings that appear once may live in a component template. Search with Grep before assuming the text is in `content/`.
- Use typographic punctuation, the way the existing copy does: `—`, `’`, `·`, `₱`.

## Verify

```bash
npm run icons && npx ngc -p tsconfig.app.json --noEmit && npm test
```

If a route or ID changed, also run `npx playwright test e2e/navigation.spec.ts`. Then check the page in both modes with the `run-and-verify` skill.
