---
title: "Live PDF Previewing"
date: 2025-03-26
tags: ["tools"]
description: "Autocommands and PDF viewers with live-reloading"
---
If your writing a document in some kind of intermediate representation (`.tex`, `.md`, `.typst`) that gets turned into a PDF, you might use your editor to run a command upon writing a file matching a pattern, in neovim for example:
```lua
vim.api.nvim_create_autocmd("BufWritePost", {
  pattern = "*.md",
  callback = function()
    local file = vim.fn.expand('%:t')
    local output = vim.fn.expand('%:t:r') .. '.pdf'
    vim.loop.spawn('pandoc', {
      args = {file, '-o', output},
    }, function() print("PDF generated!") end)
  end
})
```

## PDF Viewing with Live Reload

For the best experience, pair this with a PDF reader that supports live reloading. Depending on your operating system, you might want to use [Skim](https://skim-app.sourceforge.io/) on macOS, [SumatraPDF](https://www.sumatrapdfreader.org/) on Windows, or [Zathura](https://pwmt.org/projects/zathura/) on Linux. These viewers will automatically refresh when the PDF file changes, giving you a seamless preview experience.
