---
title: "Live PDF Previewing with Vim and Pandoc"
date: 2025-03-26
tags: ["devops", "nix"]
description: "Writing documents in Vim with a live reloading PDF."
---
There are many tools to write PDFs from markup - a tool agnostic workflow can be built around writing the markup and previewing the document incredibly simply.

## Setting Up Vim for Auto-Compilation

This approach works with Vim, but almost all text editors support something similar as part of their compiler or build system integration.

For reference, you can find example configurations in my [letter-loader repository](https://github.com/khoroo/letter-loader).

### The Magic Command

The key is setting up a command that automatically runs when you save your file:

```vim
autocmd BufWritePost *.md !pandoc %:t -o %:t:r.pdf --template="pandoc-letter-din5008/letter"
```

This command works as follows:
- `autocmd BufWritePost *.md` - Triggers on saving any Markdown file
- `!pandoc %:t -o %:t:r.pdf` - Converts the current file to PDF
- `--template="pandoc-letter-din5008/letter"` - Uses a specific template

You can adapt this pattern for your needs: 

```vim
autocmd BufWritePost <file-pattern> !<your command>
```

## PDF Viewing with Live Reload

For the best experience, pair this with a PDF reader that supports live reloading. Depending on your operating system, you might want to use [Skim](https://skim-app.sourceforge.io/) on macOS, [SumatraPDF](https://www.sumatrapdfreader.org/) on Windows, or [Zathura](https://pwmt.org/projects/zathura/) on Linux. These viewers will automatically refresh when the PDF file changes, giving you a seamless preview experience.