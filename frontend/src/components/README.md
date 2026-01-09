# Components

This folder follows a light atomic structure for UI reuse across pages.
Keep components small and composable, with Tailwind utilities applied inside.

## Atoms (ui)

- `Button`: reusable action button with variants, tone, and size.
- `Badge`: compact status/count pill.
- `Card`: surface container with consistent border and radius.
- `Textarea`: standard text input with shared focus styles.

## Molecules (chat)

- `ConversationListItem`: sidebar item for conversations.
- `MessageBubble`: chat bubble for user/assistant messages.

## Sections (page-level)

- `ChatSidebar`: sidebar layout for conversation list.
- `ChatHeader`: top bar for active conversation context.
- `ChatThread`: scrollable chat area with revisions.
- `ChatComposer`: prompt input + send action.

## Usage

```tsx
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { ConversationListItem } from "@/components/chat/ConversationListItem";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ChatSidebar, ChatHeader, ChatThread, ChatComposer } from "@/components/sections/chat";
```

### Guidelines

- Prefer atoms for common UI patterns.
- Compose atoms into molecules for page-specific structures.
- Use `className` for small visual tweaks, not structural changes.
- Keep props explicit and avoid tight coupling to page data flow.
