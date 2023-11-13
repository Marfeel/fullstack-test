import { ComponentMeta } from "@storybook/react";

import { Article as ArticleComponent, ArticleProps } from "./Article";

export default {
  title: "Article",
  component: ArticleComponent,
  argTypes: {
    author: {
      control: {
        type: "text",
      },
      defaultValue: "Title",
    },
    url: {
      control: {
        type: "text",
      },
      defaultValue: "https://url.com",
    },
    image: {
      control: {
        type: "text",
      },
      defaultValue: "https://picsum.photos/600/400",
    },
    traffic: {
      control: {
        type: "number",
      },
      defaultValue: 12345,
    },
  },
} as ComponentMeta<typeof ArticleComponent>;

export const article = (args: ArticleProps) => <ArticleComponent {...args} />;
