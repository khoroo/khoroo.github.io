---
title: "SSH session persistence without tmux or screen"
date: 2025-04-12
tags: ["tools"]
description: "SSH persistence without screen or tmux"
---

When you need persistent SSH sessions, the most common tools are `tmux` or `screen`. However, using `tmux` with the `kitty` terminal can lead to incompatibilities and overlapping features, particularly regarding window and pane management.

An alternative solution is [shpool](https://github.com/shell-pool/shpool).

> shpool is a service that enables session persistence by allowing the creation of named shell sessions owned by shpool so that the session is not lost if the connection drops. shpool can be thought of as a lighter weight alternative to tmux or GNU screen. While tmux and screen take over the whole terminal and provide window splitting and tiling features, shpool only provides persistent sessions. The biggest advantage of this approach is that shpool does not break native scrollback or copy-paste.

By using `shpool` with `kitty`'s `kitten ssh` command, you can leverage `kitty` for managing terminal tabs and panes while connecting to persistent remote shells managed by `shpool`. If your connection drops, you can simply reconnect and attach to your existing session using a command like `shpool attach main`.