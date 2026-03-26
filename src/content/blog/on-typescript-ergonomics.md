---
title: "On TypeScript Ergonomics in 2026"
date: 2026-02-15
description: "TypeScript's type system is more powerful than most people use it for. Here are the patterns I reach for constantly — and the ones I wish I'd found earlier."
tags: ["typescript", "programming"]
---

TypeScript is old enough now that it has opinions, and its opinions have evolved in ways that aren't always obvious from a quick scan of the docs. Here are the patterns I use constantly.

## Discriminated Unions Over Class Hierarchies

The classic OOP instinct when you need "one of several shapes" is to reach for an abstract class with subclasses. TypeScript's discriminated unions are almost always cleaner:

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value); // TypeScript knows value exists here
} else {
  console.error(result.error); // And error exists here
}
```

The discriminant (`ok`) lets the type checker narrow the type in each branch. No instanceof, no `as` casts, no runtime surprises.

## `satisfies` for Config Objects

Before `satisfies` (added in TS 4.9), you had two bad options for typed config objects:

1. Type annotation: `const config: Config = { ... }` — loses the literal types.
2. `as const`: `const config = { ... } as const` — doesn't validate against a schema.

```typescript
type Theme = {
  colors: Record<string, string>;
  fonts: { body: string; heading: string };
};

// ✓ Validates structure AND keeps literal types
const theme = {
  colors: {
    primary: '#2563eb',
    muted: '#78716c',
  },
  fonts: {
    body: 'Inter',
    heading: 'Lora',
  },
} satisfies Theme;

// theme.colors.primary is typed as '#2563eb', not string
```

This is genuinely useful for any config object where you want schema validation without losing autocomplete precision.

## Template Literal Types for Exhaustive APIs

When building an internal API that maps over a fixed set of values, template literal types can enforce correctness at compile time:

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type RouteHandler = `handle${Capitalize<Lowercase<HTTPMethod>>}`;

// 'handleGet' | 'handlePost' | 'handlePut' | 'handleDelete' | 'handlePatch'
```

Combine this with `Record` to build exhaustive router maps that fail to compile if you miss a method.

## infer Is Your Friend

`infer` unlocks conditional type extraction that you'd otherwise have to duplicate manually:

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

// Compose them
type DeepUnwrap<T> = T extends Promise<infer U>
  ? DeepUnwrap<U>
  : T extends Array<infer U>
    ? DeepUnwrap<U>
    : T;

type A = DeepUnwrap<Promise<string[]>>; // string
```

## The Patterns I Avoid

**`any`** — obviously. But also `as unknown as T`, which is just `any` wearing a hat.

**Overly generic generics** — if you're writing `function transform<T, U, V>(...)` and you can't explain what each parameter does without looking at the body, the abstraction isn't earning its complexity.

**Heavy decorator usage** — decorators are still experimental-adjacent and have a runtime cost. I prefer explicit composition to implicit magic.

The TypeScript team has done a remarkable job making complex types expressible. The skill is knowing when the complexity is justified.
